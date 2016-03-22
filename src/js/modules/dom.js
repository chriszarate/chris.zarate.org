/**
 * DOM utilities
 */

'use strict';

// Element cache
var elCache = {};

// Get a element(s) from selector and cache result. If index is provided,
// return a single element.
var select = function (selector, i) {
  if (!elCache[selector]) {
    elCache[selector] = document.querySelectorAll(selector);
  }
  return (i !== undefined && elCache[selector].length) ? elCache[selector][i] : elCache[selector];
};

// Add a class to an element.
var addClass = function (selector, className) {
  Array.prototype.forEach.call(select(selector), function (el) {
    if (el.className.indexOf(className) === -1) {
      el.className = el.className + ' ' + className;
    }
  });
};

// Remove a class from an element.
var removeClass = function (selector, className) {
  Array.prototype.forEach.call(select(selector), function (el) {
    if (el.className.indexOf(className) !== -1) {
      el.className = el.className.split(/\s+/).filter(function (item) {
        return item !== className;
      }).join(' ');
    }
  });
};

module.exports = {
  addClass: addClass,
  removeClass: removeClass,
  select: select
};
