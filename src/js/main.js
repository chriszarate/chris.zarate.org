/* global window,document,Image */
/* eslint no-use-before-define: [1, 'nofunc'] */

import glitchCanvas from 'glitch-canvas';

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
const aspectRatio = 2000 / 820;

let image = document.querySelector('.glitch-image');
let currentImage = 0;

const images = {
  bagan: '#fedcc3',
  zabriskie: '#ffffee',
  fundy: '#efe6e9',
  mandalay: '#e4dadb',
  pointreyes: '#ebeaef',
  unionsq: '#f0f0f0',
};

function random(floor, ceiling) {
  return Math.floor(Math.random() * (ceiling - floor)) + floor;
}

function clear() {
  context.rect(0, 0, canvas.width, canvas.height);
  context.fill();
  context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
}

// glitmage by Miguel Mota
// https://github.com/miguelmota/glitmage
// MIT License
function glitch() {
  let i = 0;

  for (i = 0; i < random(1, 4); i += 1) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const spliceW = canvas.width - x;
    const spliceH = canvas.height / random(2, 10);

    context.save();
    context.scale(-1, 1);
    context.drawImage(canvas, 0, y, canvas.width, spliceH, 0, y, canvas.width * -1, spliceH);
    context.restore();
    context.drawImage(canvas, 0, y, spliceW, spliceH, x, spliceH, spliceW, spliceH);
  }
}

// glitch another way with glitch-canvas
function glatch() {
  const glitchParams = {
    seed: random(0, 50),
    quality: random(0, 50),
    amount: random(0, 50),
    iterations: random(0, 20),
  };
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

  glitchCanvas(glitchParams)
    .fromImageData(imageData)
    .toDataURL()
    .then((dataURL) => {
      const newImage = new Image();

      newImage.onload = () => {
        context.drawImage(newImage, 0, 0);
      };
      newImage.src = dataURL;
    });
}

// Pseudo-randomize a series of glitches.
function twitch() {
  setTimeout(glitch, random(0, 500));
  setTimeout(glitch, random(501, 700));
  setTimeout(glitch, random(701, 1100));
  setTimeout(clear, random(1101, 1200));

  setTimeout(glatch, random(1201, 1300));
  setTimeout(glatch, random(1301, 1800));
  setTimeout(glatch, random(1801, 2800));
  setTimeout(clear, random(2801, 3000));

  setTimeout(glitch, random(3001, 3500));
  setTimeout(glitch, random(3501, 3700));
  setTimeout(glitch, random(3701, 4200));

  setTimeout(clear, random(4201, 6000));

  // Switch out image.
  setTimeout(twatch, random(6001, 6200));
}

function twatch() {
  currentImage += 1;

  const newImage = new Image();
  const newImageName = Object.keys(images)[currentImage % Object.keys(images).length];

  newImage.src = `/assets/images/${newImageName}.jpg`;
  newImage.onload = () => {
    image = newImage;
    document.body.style.backgroundColor = images[newImageName];

    clear();
    setTimeout(twitch, random(0, 1000));
  };
}

function setDimensions() {
  canvas.height = document.body.offsetWidth / aspectRatio;
  canvas.width = document.body.offsetWidth;
}

image.onload = () => {
  setDimensions();

  // Replace image with canvas.
  image.parentNode.replaceChild(canvas, image);
  clear();

  // Start twitching after a delay.
  setTimeout(twitch, random(1000, 3000));
};

window.addEventListener('resize', setDimensions);
