import EXIF from 'exif-js'

const extractFileData = file => new Promise((resolve, reject) => {
  EXIF.getData(file, () => {
    try {
      resolve(file)
    } catch (e) {
      reject(e)
    }
  })
})

export default file => rawImage => {
  return extractFileData(file)
    .then(fixByOrientation)

  function fixByOrientation (file) {
    const orientation = EXIF.getTag(file, "Orientation")

    const canvas = document.createElement('canvas')
    canvas.width = rawImage.width
    canvas.height = rawImage.height
    document.body.appendChild(canvas)

    const ctx = canvas.getContext('2d')
    ctx.translate(rawImage.width * 0.5, rawImage.height * 0.5)

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

    ctx.translate(-rawImage.width * 0.5, -rawImage.height * 0.5)
    ctx.drawImage(rawImage, 0, 0)
    const fixedImage = canvas.toDataURL()
    canvas.remove()
    return fixedImage
  }
}
