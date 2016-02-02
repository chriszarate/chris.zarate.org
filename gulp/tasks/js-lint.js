/* Run JSHint and JSCS against your JavaScript. */

'use strict';

var config = require('../config/js-lint.json');
var gulp = require('gulp');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

module.exports = function () {
  return gulp.src(config.source)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jscs())
    .pipe(jscs.reporter());
};
