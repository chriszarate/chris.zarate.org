/* Watch for changes and run tasks. */

'use strict';

var config = require('../config/watch.json');
var gulp = require('gulp');
var reload = require('browser-sync').reload;
var run = require('run-sequence');

module.exports = function () {
  config.jobs.forEach(function (job) {
    gulp.watch(job.files).on('change', function () {
      if (job.tasks && job.tasks.length) {
        run(job.tasks, reload);
      } else {
        reload();
      }
    });
  });
};
