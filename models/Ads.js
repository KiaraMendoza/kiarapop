'use strict';

const mongoose = require('mongoose');
const connectionPromise = require('../lib/connectAMQP');
const queueName = 'thumbnails'; // For the thumbnails queue

const doResize = require('../helpers/doResize');

// Ads schema declaration
const adsSchema = mongoose.Schema({
    name: { type: String, required: true, index: true },
    sale: { type: Boolean, index: true },
    price: { type: Number, required: true, index: true },
    image: { type: String },
    thumbnail: { type: String },
    tags: [{ type: String }]
});

// method to list the ads using filters and extras
adsSchema.statics.list = async function (filter, limit, skip, sort, fields, cb) {
    const query = Ads.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    query.select(fields);

    const result = {};
    
    result.ads = await query.exec();

    if (cb) return cb(null, result); // return with cb if given
    return result.ads; 
}

// add a method for the creation of thumbnails
adsSchema.methods.enqueueThumbnailsCreation = async function (imageToResize, imageFileName, thumbnailDirectory = "./public/thumbnails/", adId) {
    // first connect to the AMQP service
    const conn = await connectionPromise;

    // create a channel
    const channel = await conn.createChannel();

    // get sure we have a queue
    await channel.assertQueue(queueName, {
        durable: true // queue durable to the broker (ex: rabbitMP)
    });

    let { thumbnailName } = await doResize(imageToResize, imageFileName, thumbnailDirectory);

    // send the imagePath to the queue and do the resize using jimp
    channel.sendToQueue(queueName, Buffer.from(thumbnailName), {
        persistent: true // queue persistent to broker reset (ex: rabbitMP)
    });

    return Ads.findByIdAndUpdate(adId, { thumbnail: thumbnailName });
}

// create the model
const Ads = mongoose.model('Ads', adsSchema);

// export the model
module.exports = Ads;
