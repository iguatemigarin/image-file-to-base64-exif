export default function (base64src) {
  return new Promise(function (resolve) {
    const image = new Image
    image.onload = function () {
      resolve(image)
    }
    image.src = base64src
  })
}
