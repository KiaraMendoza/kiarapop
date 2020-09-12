var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'KiaraPop' });
});

/* GET help page. */
router.get('/help', function (req, res, next) {
  res.render('help', { title: 'KiaraPop' });
});

module.exports = router;
