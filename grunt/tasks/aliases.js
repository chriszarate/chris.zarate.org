/* Grunt task aliases */

module.exports = function (grunt) {

  'use strict';

  grunt.registerTask(
    'default',
    [
      'jshint',
      'browserify',
      'uglify',
      'sass'
    ]
  );

  grunt.registerTask(
    'dev',
    [
      'default',
      'connect',
      'watch'
    ]
  );

};
