export default file => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      resolve(e.target.result)
    } catch (e) {
      reject(e)
    }
  }
  reader.readAsDataURL(file)
})
