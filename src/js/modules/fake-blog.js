/**
 * Fake blog order randomizer
 *
 * This adds fake blog entries from a template that is already in the DOM,
 * giving each a numbered class name in random order. CSS does the rest.
 */

'use strict';

var template = document.getElementById('fake-blog-entry-template');
var indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

while (indexes.length) {
  // Get a random index from 1 to 10 without repeating;
  var classIndex = indexes.splice(Math.floor(Math.random() * indexes.length), 1);

  // Add template to DOM with iterated class name.
  var div = document.createElement('div');
  div.className = 'fake-blog-entry fake-blog-entry-' + classIndex;
  div.innerHTML = template.innerHTML;
  template.parentElement.appendChild(div);
}
