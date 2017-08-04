export default function (file) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader()
    reader.onload = function (e) {
      try {
        resolve(e.target.result)
      } catch (e) {
        reject(e)
      }
    }
    reader.readAsDataURL(file)
  })
}
