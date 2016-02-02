/*
 * Modularized Gulpfile
 * ---
 * Loads tasks and config from modular files.
 */

'use strict';

var glob = require('glob');
var gulp = require('gulp');
var path = require('path');

// Tasks
glob.sync('./tasks/**/*.js', {cwd: './gulp'}).forEach(function (file) {
  gulp.task(path.basename(file, '.js'), require(file));
});

// Aliases
var aliases = require('./aliases');
Object.keys(aliases).forEach(function (alias) {
  gulp.task(alias, aliases[alias]);
});
