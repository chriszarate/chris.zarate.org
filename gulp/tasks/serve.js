/* Use BrowserSync to serve our site locally with autoreload. */

'use strict';

var config = require('../config/serve.json');
var browserSync = require('browser-sync');

module.exports = function () {
  browserSync(config.browserSync);
};
