'use strict';

const i18n = require('i18n');
const path = require('path');

i18n.configure({
  locales: ['en', 'es'],
  directory: path.join(__dirname, '..', 'locales'),
  defaultLocale: 'en',
  autoReload: true, // reload translation files if changed
  syncFiles: true,
  cookie: 'kiarapop-locale',
});

// por si usamos i18n en script
i18n.setLocale('en');

module.exports = i18n;