/**
 * Glitch
 */

'use strict';

var dom = require('./dom.js');
var glitch = require('glitch-canvas');

var image = dom.select('.glitch-image', 0);
var imageURL = null;

if (image) {
  image.onload = function () {
    glitch(glitchParams())
      .fromImageData(imageData())
      .toDataURL()
      .then(function (dataURL) {
        setTimeout(function () {
          imageURL = dataURL;
        }, 500);
      });
  };
}

window.addEventListener('mousemove', updateImage);
window.addEventListener('touchstart', updateImage);

function updateImage () {
  if (imageURL && imageURL !== image.src) {
    image.src = imageURL;
  }
}

function random (ceiling) {
  return Math.floor(Math.random() * ceiling) + 1;
}

function glitchParams () {
  var test = {
    seed: random(50),
    quality: random(50),
    amount: random(50),
    iterations: 20
  };
  return test;
}

function imageData () {
  if (imageData.data) {
    return imageData.data;
  }

  var canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;

  var ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  imageData.data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  return imageData.data;
}
