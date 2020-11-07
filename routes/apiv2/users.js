var express = require('express');
var router = express.Router();

/* GET /api/users. To get a users list that can be filtered */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
