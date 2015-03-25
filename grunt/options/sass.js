/* grunt-contrib-sass */

module.exports = {
  dist: {
    options: {
      style: 'compressed'
    },
    files: {
      'public/build/app.min.css': 'src/scss/main.scss'
    }
  }
};
