import makeImage from './make-image'

export default function (maxWidth, maxHeight, quality) {
  return function (base64) {
    return makeImage(base64)
      .then(resize)

    function resize (image) {
      maxWidth = maxWidth || image.width
      maxHeight = maxHeight || image.height
      quality = quality || 1

      const scale = getNewScale(image, maxWidth, maxHeight)
      const scaledWidth = image.width / scale
      const scaledHeight = image.height / scale

      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d')
      canvas.width = scaledWidth
      canvas.height = scaledHeight
      context.drawImage(image, 0, 0, scaledWidth, scaledHeight)
      return canvas.toDataURL('image/jpeg', quality)
    }
  }
}

function getNewScale (image, maxWidth, maxHeight) {
  if (image.width <= maxWidth && image.height <= maxHeight) {
    return 1
  }

  const isLandscape = image.width > image.height
  const dimension = isLandscape ? image.width : image.height
  return dimension / (isLandscape ? maxWidth : maxHeight)
}
