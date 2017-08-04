'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var EXIF = _interopDefault(require('exif-js'));

var fileToBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      resolve(e.target.result);
    } catch (e) {
      reject(e);
    }
  };
  reader.readAsDataURL(file);
});

var makeImage = base64src => new Promise(resolve => {
  const image = new Image;
  image.onload = () => {
    resolve(image);
  };
  image.src = base64src;
});

const extractFileData = file => new Promise((resolve, reject) => {
  EXIF.getData(file, () => {
    try {
      resolve(file);
    } catch (e) {
      reject(e);
    }
  });
});

var getFixedImage = file => rawImage => {
  return extractFileData(file)
    .then(fixByOrientation)

  function fixByOrientation (file) {
    const orientation = EXIF.getTag(file, "Orientation");

    const canvas = document.createElement('canvas');
    canvas.width = rawImage.width;
    canvas.height = rawImage.height;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    ctx.translate(rawImage.width * 0.5, rawImage.height * 0.5);

    switch(orientation) {
      case 2:
      // horizontal flip
      ctx.scale(-1, 1);
      break
      case 3:
      // 180° rotate left
      ctx.rotate(Math.PI);
      break
      case 4:
      // vertical flip
      ctx.scale(1, -1);
      break
      case 5:
      // vertical flip + 90 rotate right
      ctx.rotate(0.5 * Math.PI);
      ctx.scale(1, -1);
      break
      case 6:
      // 90° rotate right
      ctx.rotate(0.5 * Math.PI);
      break
      case 7:
      // horizontal flip + 90 rotate right
      ctx.rotate(0.5 * Math.PI);
      ctx.scale(-1, 1);
      break
      case 8:
      // 90° rotate left
      ctx.rotate(-0.5 * Math.PI);
      break
    }

    ctx.translate(-rawImage.width * 0.5, -rawImage.height * 0.5);
    ctx.drawImage(rawImage, 0, 0);
    const fixedImage = canvas.toDataURL();
    canvas.remove();
    return fixedImage
  }
};

var resizeImage = (maxWidth, maxHeight, quality) => base64 => {
  return makeImage(base64)
    .then(resize)

  function resize (image) {
    maxWidth = maxWidth || image.width;
    maxHeight = maxHeight || image.height;
    quality = quality || 1;

    const scale = getNewScale(image, maxWidth, maxHeight);
    const scaledWidth = image.width / scale;
    const scaledHeight = image.height / scale;

    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = scaledWidth;
    canvas.height = scaledHeight;
    context.drawImage(image, 0, 0, scaledWidth, scaledHeight);
    return canvas.toDataURL('image/jpeg', quality)
  }
};

function getNewScale (image, maxWidth, maxHeight) {
  if (image.width <= maxWidth && image.height <= maxHeight) {
    return 1
  }

  const isLandscape = image.width > image.height;
  const dimension = isLandscape ? image.width : image.height;
  return dimension / (isLandscape ? maxWidth : maxHeight)
}

var index = (file, maxWidth, maxHeight, quality) => {
  return fileToBase64(file)
    .then(makeImage)
    .then(getFixedImage(file))
    .then(resizeImage(maxWidth, maxHeight, quality))
};

module.exports = index;
