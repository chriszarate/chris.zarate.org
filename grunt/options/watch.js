/* grunt-contrib-watch */

module.exports = {
  javascript: {
    options: {
      livereload: true
    },
    tasks: [
      'jshint',
      'browserify',
      'uglify'
    ],
    files: [
      'vendor/js/**/*.js',
      'src/**/*.js'
    ]
  },
  css: {
    options: {
      livereload: true
    },
    tasks: [
      'sass'
    ],
    files: [
      'src/**/*.scss'
    ]
  }
};
