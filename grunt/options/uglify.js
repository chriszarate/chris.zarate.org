/* grunt-contrib-uglify */

module.exports = {
  dist: {
    files: {
      'public/build/app.min.js': [
        'public/build/app.js'
      ]
    }
  }
};
