var express = require('express');
var router = express.Router();

// GET /change-lang/:locale
router.get('/:locale', function(req, res, next) {
  // Get the new locale/lang they pass
  const locale = req.params.locale;

  // Save the page where the user was
  const referer = req.get('referer');

  // Save the passed locale as a new cookie
  res.cookie('kiarapop-locale', locale, { maxAge: 1000 * 60 * 60 * 24 * 20 });

  // Redirect the user to wherever he was
  res.redirect(referer);
});

module.exports = router;
