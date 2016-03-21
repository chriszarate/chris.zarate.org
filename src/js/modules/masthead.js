/**
 * Add listeners to enhance masthead.
 */

'use strict';

var dom = require('./dom.js');

// Add class to masthead when user scrolls.
var scrollTimeout = 0;
var showScrollingIndicator = function () {

  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  } else {
    dom.addClass('.masthead', 'scrolling');
  }

  scrollTimeout = setTimeout(function () {
    scrollTimeout = 0;
    dom.addClass('.masthead', 'stopped');
    dom.removeClass('.masthead', 'scrolling');
    setTimeout(function () {
      dom.removeClass('.masthead', 'stopped');
    }, 500);
  }, 50);

};
document.querySelector('.content').addEventListener('scroll', showScrollingIndicator, false);

// Add class to masthead when user clicks.
var showClickIndicator = function () {
  dom.addClass('.masthead', 'clicking');
};
var hideClickIndicator = function () {
  dom.removeClass('.masthead', 'clicking');
};
document.body.addEventListener('mousedown', showClickIndicator, false);
document.body.addEventListener('mouseup', hideClickIndicator, false);

// Change "tabs" / pages.
window.onhashchange = function () {
  // We only support two pages, so hold off on doing anything fancy.
  switch (window.location.hash) {
    case '#photos':
      dom.removeClass('body', 'page-home');
      dom.removeClass('.tab-home', 'tab-active');
      dom.addClass('.tab-photos', 'tab-active');
      dom.addClass('body', 'page-photos');
      break;
    default:
      dom.removeClass('body', 'page-photos');
      dom.removeClass('.tab-photos', 'tab-active');
      dom.addClass('.tab-home', 'tab-active');
      dom.addClass('body', 'page-home');
  }
};

// Always trigger hashchange.
window.dispatchEvent(new Event('hashchange'));
