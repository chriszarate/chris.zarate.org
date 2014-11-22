/* Load package.json */

'use strict';

var bannerLine = function (line) {
  return ' * ' + line;
};

module.exports = function (grunt) {

  var pkg = grunt.file.readJSON('package.json');
  var banner = [];

  if (pkg.name && pkg.version) {
    banner.push(pkg.name + ' v' + pkg.version);
  }

  if (pkg.author && pkg.author.name) {
    banner.push(pkg.author.name);
  }

  if (pkg.repository && pkg.repository.url) {
    banner.push(pkg.repository.url);
  }

  if (pkg.license) {
    banner.push('License: ' + pkg.license);
  }

  pkg.banner = '/*!\n' + banner.map(bannerLine).join('\n') + '\n */\n\n';

  return pkg;

};
