/* Run SCSS-Lint against your SCSS files. */

'use strict';

var config = require('../config/scss-lint.json');
var gulp = require('gulp');
var scsslint = require('gulp-scss-lint');

module.exports = function () {
  return gulp.src(config.source)
    .pipe(scsslint(config.options));
};
