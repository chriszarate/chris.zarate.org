/* grunt-contrib-cssmin */

'use strict';

module.exports = {
  dist: {
    files: {
      'public/build/app.min.css': [
        'public/build/app.css'
      ]
    }
  }
};
