/* grunt-contrib-concat */

'use strict';

module.exports = {
  options: {
    banner: '<%= pkg.banner %>',
    process: function (src) {
      // Turn relative URLs into absolute URLs.
      var absolutePath = '/assets/img/css/';
      return src.replace(/url\(['"]([^/][^:]+)['"]\)/g, function (match, url) {
        return 'url("' + absolutePath + url + '")';
      });
    }
  },
  dist: {
    files: {
      'public/build/app.css': [
        'bower_components/normalize.css/normalize.css',
        'src/css/**/*.css'
      ]
    }
  }
};
