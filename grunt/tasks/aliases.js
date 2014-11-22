/* Grunt task aliases */

'use strict';

module.exports = function (grunt) {

  grunt.registerTask(
    'default',
    [
      'jshint',
      'concat',
      'cssmin',
      'browserify',
      'uglify'
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
