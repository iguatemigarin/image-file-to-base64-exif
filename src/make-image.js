export default base64src => new Promise(resolve => {
  const image = new Image
  image.onload = () => {
    resolve(image)
  }
  image.src = base64src
})
