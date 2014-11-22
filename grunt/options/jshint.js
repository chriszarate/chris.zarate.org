/* grunt-contrib-jshint */

'use strict';

module.exports = {
  options: {
    bitwise: true,
    camelcase: true,
    curly: true,
    devel: true,
    eqeqeq: true,
    es3: true,
    forin: true,
    freeze: true,
    immed: true,
    indent: 2,
    latedef: true,
    maxdepth: 3,
    maxlen: 80,
    maxparams: 3,
    newcap: true,
    noarg: true,
    noempty: true,
    nonbsp: true,
    nonew: true,
    plusplus: true,
    quotmark: true,
    strict: true,
    trailing: true,
    undef: true,
    unused: true
  },
  dist: {
    options: {
      browser: true,
      node: true
    },
    files: {
      src: [
        'grunt/**/*.js',
        'src/js/**/*.js'
      ]
    }
  }
};
