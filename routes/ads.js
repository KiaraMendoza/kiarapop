'use strict';

const router = require('express').Router();
const fs = require('fs');
const Ads = require('../models/Ads');

/* GET ads page. */
router.get('/', async function (req, res, next) {
    try {
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 1000;
        const sort = req.query.sort || '_id';
        const fields = req.query.fields;
        // const includeTotal = true;

        const filter = {};
        if (req.query.tags) {
            filter.tags = req.query.tags;
        }
        if (req.query.sale) {
            filter.sale = req.query.sale;
        }
        
        const ads = await Ads.list(filter, limit, skip, sort, fields);
        res.render('ads.ejs', { title: 'KiaraPop', ads: ads });
    } catch (err) { return res.next(err); }
});

module.exports = router;