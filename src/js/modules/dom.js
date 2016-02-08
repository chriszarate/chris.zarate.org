/**
 * DOM utilities
 */

'use strict';

// Element cache
var elCache = {};

// Add a class to an element.
var addClass = function (selector, className) {
  var els = elCache[selector] || document.querySelectorAll(selector);
  [].forEach.call(els, function (el) {
    if (el.className.indexOf(className) === -1) {
      el.className = el.className + ' ' + className;
    }
  });
};

// Remove a class from an element.
var removeClass = function (selector, className) {
  var els = elCache[selector] || document.querySelectorAll(selector);
  [].forEach.call(els, function (el) {
    if (el.className.indexOf(className) !== -1) {
      el.className = el.className.split(/\s+/).filter(function (item) {
        return item !== className;
      }).join(' ');
    }
  });
};

module.exports = {
  addClass: addClass,
  removeClass: removeClass
};
