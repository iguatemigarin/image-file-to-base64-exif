import fileToBase64 from './file-to-base64'
import makeImage from './make-image'
import getFixedImage from './get-fixed-image'
import resizeImage from './resize-image'

export default function (file, maxWidth, maxHeight, quality) {
  return fileToBase64(file)
    .then(makeImage)
    .then(getFixedImage(file))
    .then(resizeImage(maxWidth, maxHeight, quality))
}
