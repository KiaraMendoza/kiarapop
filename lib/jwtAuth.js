'use strict';

// Middleware to authenticate using JWT

const jwt = require('jsonwebtoken');

module.exports = function() {
  return (req, res, next) => {
    // Check for a valid JWT on the request header

    // Get the token
    const tokenJWT = req.get('Authorization') || req.query.token || req.body.token;

    // Check if there is a token, if not, show an error.
    if (!tokenJWT) {
      const error = new Error('No token provided');
      error.status = 401;
      next(error);
      return;
    }

    // Verify the token
    jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) => {
      if (err) return next(err);
      req.apiAuthUser = payload; // Save authenticated user basic data (email and password) for future uses.
      next();
    });

  };
};
