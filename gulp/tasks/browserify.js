/* Browserify and uglify JavaScript with sourcemaps. */

'use strict';

var browserify = require('browserify');
var config = require('../config/browserify.json');
var buffer = require('vinyl-buffer');
var gulp = require('gulp');
var path = require('path');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

module.exports = function () {
  return browserify(config.source, {debug: true})
    .transform('jstify')
    .bundle()
    .pipe(source(path.basename(config.source)))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.target));
};
