'use strict';

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const loginController = require('./routes/loginController');
const jwtAuth = require('./lib/jwtAuth');

const app = express();

// connect database
/* jshint ignore:start */
const db = require('./lib/connectMongoose');
/* jshint ignore:end */

require('./models/Ads');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup i18n, always before cookieParser!
const i18n = require('./lib/i18nConfigure');
app.use(i18n.init);

// web routes
app.use('/', require('./routes/index'));
app.use('/change-locale', require('./routes/change-locale'));
app.use('/ads', require('./routes/ads'));

// api routes
app.post(`/api${process.env.API_VERSION}/auth`, loginController.auth);
app.use(`/api${process.env.API_VERSION}/`, jwtAuth(), require(`./routes/api${process.env.API_VERSION}/ads`));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  if (req.originalUrl.startsWith('/api/')) { // API request
    res.json({ error: err.message });
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
