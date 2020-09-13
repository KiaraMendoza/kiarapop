var express = require('express');
const fetch = require("node-fetch");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'KiaraPop' });
});

/* GET ads page. */
router.get('/ads', async (req, res, next) => {
  await fetch('http://localhost:3000/api/ads')
    .then(res => res.json())
    .then(ads => {
      console.log(req.query);
      res.render('ads', { title: 'KiaraPop', ads: ads });
    })
    .catch(function (err) {
      console.error(err);
    })
  // res.render('ads', { title: 'KiaraPop', ads: ads });
});

/* GET help page. */
router.get('/help', function (req, res, next) {
  res.render('help', { title: 'KiaraPop' });
});

module.exports = router;
