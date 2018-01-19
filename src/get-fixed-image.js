import EXIF from 'exif-js'

const extractFileData = function (file) {
  return new Promise(function (resolve, reject) {
    EXIF.getData(file, function () {
      try {
        resolve(file)
      } catch (e) {
        reject(e)
      }
    })
  })
}

export default function (file) {
  return function (rawImage) {
    return extractFileData(file)
      .then(fixByOrientation)

    function fixByOrientation (file) {
      const orientation = EXIF.getTag(file, "Orientation")

      const canvas = document.createElement('canvas')
      const fixedDimensions = getFixedCanvasDimensions(rawImage, orientation)

      canvas.width = fixedDimensions.width
      canvas.height = fixedDimensions.height

      const ctx = canvas.getContext('2d')
      ctx.translate(canvas.width * 0.5, canvas.height * 0.5)
      handleRotationAndFlip(ctx, orientation)
      ctx.translate(-rawImage.width * 0.5, -rawImage.height * 0.5)
      ctx.drawImage(rawImage, 0, 0)
      return canvas.toDataURL()
    }
  }
}

function getFixedCanvasDimensions (rawImage, orientation) {
  if (orientation >= 5) {
    return {
      width: rawImage.height,
      height: rawImage.width
    }
  }

  return {
    width: rawImage.width,
    height: rawImage.height
  }
}

function handleRotationAndFlip(ctx, orientation) {
  switch(orientation) {
    case 2:
    // horizontal flip
    ctx.scale(-1, 1)
    break
    case 3:
    // 180° rotate left
    ctx.rotate(Math.PI)
    break
    case 4:
    // vertical flip
    ctx.scale(1, -1)
    break
    case 5:
    // vertical flip + 90 rotate right
    ctx.rotate(0.5 * Math.PI)
    ctx.scale(1, -1)
    break
    case 6:
    // 90° rotate right
    ctx.rotate(0.5 * Math.PI)
    break
    case 7:
    // horizontal flip + 90 rotate right
    ctx.rotate(0.5 * Math.PI)
    ctx.scale(-1, 1)
    break
    case 8:
    // 90° rotate left
    ctx.rotate(-0.5 * Math.PI)
    break
  }
}