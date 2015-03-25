'use strict';

// Smart underlining
var smartUnderline = require('smart-underline');
smartUnderline.init({});

// Remove no-js class
document.getElementsByTagName('html')[0].className = '';

// Detect a touch event implementation and remove 'no-touch' class.
// http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
var hasTouchEvent = function () {
  document.body.className = '';
  window.removeEventListener('touchstart', hasTouchEvent);
};

if (window.addEventListener) {
  window.addEventListener('touchstart', hasTouchEvent, false);
}
