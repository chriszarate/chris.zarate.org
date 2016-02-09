/**
 * Retrieve and parse a Flickr public feed
 */

'use strict';

var https = require('https');

// Parse first ten items of feed and write to standard output.
var parseFeed = function (feed) {
  feed.items.slice(0, 10).forEach(function (item) {
    process.stdout.write(
      '<div class="photo"><p><a href="' + item.link + '">' +
      '<img src="' + item.media.m.replace(/_m\.jpg/, '_b.jpg') + '" alt="' + item.title + '">' +
      '</a></p></div>\n'
    );
  });
};

var callback = function (response) {
  var str = '';
  response.on('data', function (chunk) {
    str += chunk;
  });
  response.on('end', function () {
    try {
      parseFeed(JSON.parse(str));
    } catch (e) {}
  });
};

var options = {
  host: 'www.flickr.com',
  path: '/services/feeds/photos_public.gne?id=85822877@N00&tags=blog&lang=en-us&format=json&nojsoncallback=true',
  port: 443
};

https.request(options, callback).end();
