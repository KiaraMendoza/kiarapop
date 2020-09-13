var express = require('express');
var router = express.Router();
const multer = require('multer');
const Ads = require('../../models/Ads');
const path = require('path');
const fs = require('fs');

/* To save the images on local storage */
// const upload = multer({ dest: 'uploads/'});
const storage = multer.diskStorage({
    destination: function (req, file, cb) { // The place where uploads should be stored
        cb(null, './public/images/');
    },
    filename: function (req, file, cb) { // The new filename based on the file's name and date now.
        const newFilename = `${Date.now()}_${file.originalname}`;
        cb(null, newFilename);
    }
});
const upload = multer({ storage: storage });

/* GET /api/ads. To get the ads list using filters or extras if necessary. */
router.get('/ads', async function (req, res, next) {
    try {
        // http://localhost:3000/api/ads?name=Samsung
        const name = req.query.name;
        // http://localhost:3000/api/ads?price=360
        const price = req.query.price;
        // http://localhost:3000/api/ads?sale=true
        const sale = req.query.sale;
        // http://localhost:3000/api/ads?tags=lifestyle;
        const tags = req.query.tags;

        // http://localhost:3000/api/ads?limit=8
        const limit = parseInt(req.query.limit || 10);
        // http://localhost:3000/api/ads?skip=20&limit=10
        const skip = parseInt(req.query.skip);

        // http://localhost:3000/api/ads?sort=age
        const sort = req.query.sort;

        // http://localhost:3000/api/ads?fields=age%20-_id
        const fields = req.query.fields;

        const filter = {};

        if (name) {
            console.log(new RegExp('^' + name, 'i'));
            filter.name = new RegExp('^' + name, 'i');
        }

        if (price) {
            const priceGroups = price.match(/(\d+)/gm); // This will give an array like: [210, 300] or just a number if we only send '300' for example.
            console.log("price --->" + price)
            console.log("priceGroups --->" + priceGroups[0], priceGroups[1]);
            if ((/-/gm).test(price)) { // If we detect a separator on the price, it will be filtered using the lte and/or gte
                if ((/\d+-/gm).test(price)) { // We always have number- as the first element so there isn't a problem with it.
                    let minPrice = priceGroups[0];
                    filter.price = { $gte: minPrice };
                }
                if ((/-\d+/gm).test(price) && (/(\d+)-(\d+)/gm).test(price)) { // If we see a -number it can be alone or not, so let's test it.
                    let maxPrice = priceGroups[1]; // If there is more than one group, less than should be the second.
                    filter.price = { $lte: maxPrice };
                } else if ((/-\d+/gm).test(price)) { // If it's alone, we're only filtering by less than, and less than is the first element.
                    let maxPrice = priceGroups[0];
                    filter.price = { $lte: maxPrice };
                }
            } else if ((/\d+/gm).test(price)) { // otherwise, it will be set just like given, and we will only get the exact match/es.
                filter.price = price;
            }
        }

        if (sale) {
            filter.sale = sale;
        }

        if (tags) { 
            tags.toLowerCase();
            filter.tags = tags;
         }
    

        const ads = await Ads.list(filter, limit, skip, sort, fields);
        res.json(ads);

        // res.render('ads', { title: 'KiaraPop', ads: ads });
    } catch (err) {
        next(err);
    }
});

/* GET /api/ads/<_id>. To get single ads by id */
router.get('/ads/:_id', async (req, res, next) => {
    try {

        const _id = req.params._id;

        const ads = await Ads.findOne({ _id: _id });

        res.json({ result: ads });

    } catch (err) {
        next(err);
    }
});

/* POST /api/ads. To post new ads */
router.post('/ads', async (req, res, next) => {
    try {
        // get the data from the request body
        const adData = req.body;

        // check if given tag is available
        if (Array.isArray(adData.tags) && adData.tags.length > 0) {
            adData.tags.forEach(tag => {
                if (tag !== "work" && tag !== "lifestyle" && tag !== "motor" && tag !== "mobile") {
                    // If the given tag isn't of the previous, we send an error.
                    throw(new Error('One of the Ad\'s tag isn\'t valid'));
                }
            })
        } else if (adData.tags !== "work" && adData.tags !== "lifestyle" && adData.tags !== "motor" && adData.tags !== "mobile") {
            throw(new Error('The Ad\'s tag isn\'t valid'));
        }
        // create the ad with that data
        const ad = new Ads(adData);

        // finally save it on database
        const adSaved = await ad.save();

        console.log(adData)
        // respond with the created ad
        res.json({ result: adSaved });

    } catch (err) {
        next(err);
    }
});

/* PUT /api/ads/:_id. To update an ad by id */
router.put('/ads/:_id', async (req, res, next) => {
    try {
        const _id = req.params._id;
        const newAdData = req.body;

        const adSaved = await Ads.findOneAndUpdate({ _id: _id }, newAdData, {
            new: true,
            useFindAndModify: false
        });

        res.json({ result: adSaved });

    } catch (err) {
        next(err);
    }
});

/* DELETE /api/ads/:_id. To delete an ad by id */
router.delete('/ads/:_id', async (req, res, next) => {
    try {
        const _id = req.params._id;

        const deletedAd = await Ads.findOneAndDelete({ _id: _id });

        res.json({ deletedAd: deletedAd });
    } catch (err) {
        next(err);
    }
});

// POST /api/upload. To upload new images
router.post('/upload', upload.single('image'), (req, res, next) => {
    console.log(req.file);
    res.send(req.file + '<------- file uploaded');
});

// GET /api/images. To get all images
router.get('/images', (req, res, next) => {
    const directoryPath = path.join(__dirname, '../../public/images');
    let getImages = fs.readdirSync(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            console.log(file);
        });
        return files;
    });

    res.send(getImages);
})

// DELETE /api/upload/delete. To delete an image by it's filename.
// router.delete('/upload/:name', async (req, res, next) => {
//     try {
//         const name = req.params.name;
//     } catch (err) {
//         next(err);
//     }
// })

module.exports = router;