'use strict';

const mongoose = require('mongoose');

// Ads schema declaration
const adsSchema = mongoose.Schema({
    name: { type: String, required: true, index: true },
    sale: { type: Boolean, index: true },
    price: { type: Number, required: true, index: true },
    photo: { type: String },
    tags: [{ type: String }]
});

// method to list the ads using filters and extras
adsSchema.statics.list = function (filter, limit, skip, sort, fields) {
    const query = Ads.find(filter);
    query.limit(limit);
    query.skip(skip);
    query.sort(sort);
    query.select(fields);
    return query.exec();
}

// create the model
const Ads = mongoose.model('Ads', adsSchema);

// export the model
module.exports = Ads;
