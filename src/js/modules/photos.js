/**
 * Retrieve photos from cache.
 */

'use strict';

var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function () {
  if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
    document.getElementById('photos').innerHTML = xmlhttp.responseText;
  }
}

xmlhttp.open('GET', '/cache/blog.html', true);
xmlhttp.send();
