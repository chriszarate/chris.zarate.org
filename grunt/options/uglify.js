/* grunt-contrib-uglify */

'use strict';

module.exports = {
  dist: {
    options: {
      banner: '<%= pkg.banner %>',
      wrap: true
    },
    files: {
      'public/build/app.min.js': [
        'public/build/app.js'
      ]
    }
  }
};
