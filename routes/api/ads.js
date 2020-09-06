var express = require('express');
var router = express.Router();
const Ads = require('../../models/Ads');

/* GET /api/ads. To get the ads list using filters or extras if necessary. */
router.get('/', async function (req, res, next) {
    try {
        // http://localhost:3000/api/ads?name=Samsung
        const name = req.query.name;
        // http://localhost:3000/api/ads?price=360
        const price = req.query.price;
        // http://localhost:3000/api/ads?sale=true
        const sale = req.query.sale

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
            filter.name = name;
        }

        if (price) {
            filter.price = price;
        }

        if (sale) {
            filter.sale = sale;
        }

        const ads = await Ads.list(filter, limit, skip, sort, fields);
        res.json(ads);
    } catch (err) {
        next(err);
    }
});

/* GET /api/ads/<_id>. To get single ads by id */
router.get('/:_id', async (req, res, next) => {
    try {

        const _id = req.params._id;

        const ads = await Ads.findOne({ _id: _id });

        res.json({ result: ads });

    } catch (err) {
        next(err);
    }
});

/* POST /api/ads. To post new ads */
router.post('/', async (req, res, next) => {
    try {
        // get the data from the request body
        const adData = req.body;

        // create the ad with that data
        const ad = new Ads(adData);

        // finally save it on database
        const adSaved = await ad.save();

        // respond with the created ad
        res.json({ result: adSaved });

    } catch (err) {
        next(err);
    }
});

/* PUT /api/ads/:_id. To update an ad by id */
router.put('/:_id', async (req, res, next) => {
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
router.delete('/:_id', async (req, res, next) => {
    try {
        const _id = req.params._id;

        await Ads.deleteOne({ _id: _id });

        res.json();
    } catch (err) {
        next(err);
    }
});

// router.post('/upload', upload.single('image'), (req, res, next) => {
//     console.log(req.file);
//     res.send('ok');
// });

module.exports = router;