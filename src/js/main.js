/* global window,document,Image,console */

import glitchCanvas from 'glitch-canvas';
import Glitmage from 'glitmage';

let glitmage;

const random = (ceiling, floor = 0) => (Math.random() * (ceiling - floor)) + floor + 1;

const glitch = () => {
  const glitchParams = {
    seed: random(50),
    quality: random(50),
    amount: random(50),
    iterations: random(20),
  };
  const width = glitmage.canvas.width;
  const height = glitmage.canvas.height;
  const imageData = glitmage.context.getImageData(0, 0, width, height);

  glitchCanvas(glitchParams)
    .fromImageData(imageData)
    .toDataURL()
    .then((dataURL) => {
      const image = new Image();

      image.onload = () => {
        glitmage.context.drawImage(image, 0, 0);
      };
      image.src = dataURL;
    });
};

const twitch = () => {
  glitmage.pause();

  setTimeout(glitch, random(100));
  setTimeout(glitch, random(500, 100));
  setTimeout(glitch, random(1000, 500));
  setTimeout(glitmage.resume, random(1200, 1000));

  setTimeout(twitch, random(2500, 1200));
};

setTimeout(() => {
  glitmage = new Glitmage(document.querySelector('.glitch-image'));
  setTimeout(twitch, random(3000));
}, random(1500));
