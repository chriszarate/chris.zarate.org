/**
 * Update DOM in response to user agent capabilities.
 */

'use strict';

var dom = require('./dom.js');

// Remove no-js class.
dom.removeClass('html', 'no-js');

// Detect a touch event implementation and remove 'no-touch' class.
// http://www.stucox.com/blog/you-cant-detect-a-touchscreen/
var hasTouchEvent = function () {
  dom.removeClass('body', 'no-touch');
  window.removeEventListener('touchstart', hasTouchEvent);
};

window.addEventListener('touchstart', hasTouchEvent, false);
