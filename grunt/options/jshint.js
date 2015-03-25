/* grunt-contrib-jshint */

module.exports = {
  options: {
    jshintrc: true
  },
  dist: {
    files: {
      src: [
        'grunt/**/*.js',
        'src/**/*.js'
      ]
    }
  }
};
