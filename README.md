# Image File to Base64

This is a utility function to get a base64 encoded image from a DOM File.

The returned image is **always** an image/jpeg. This means that if you try to read an image/png with transparency, the transparency will become black.

*Obvioulsy, it is just for browser usage and the File must be of an image type.*

## Installation

```
$ npm install --save image-file-to-base64-exif
```

## Usage

```javascript
import imageFileToBase64 from 'image-file-to-base64-exif'

// then, with some file object

imageFileToBase64(file)
    .then(function (base64) {
        // ...
    })
```

### [Demo](https://repl.it/@iguatemi/image-file-to-base64-exif)

### Example

```javascript
import imageFileToBase64 from 'image-file-to-base64-exif'

const maxWidth = 200
const maxHeight = 200
const quality = 0.8

const fileInput = document.createElement('input')
fileInput.type = 'file'
fileInput.accept = 'image/*'
fileInput.addEventListener('change', handleChange)
document.body.appendChild(fileInput)

function handleChange () {
    imageFileToBase64(fileInput.files[0], maxWidth, maxHeight, quality)
        .then(makeThumbnail)
}

function makeThumbnail (base64) {
    const image = document.createElement('img')
    image.src = base64
    document.body.appendChild(image)
}
```

## API

The *imageFileToBase64* function returns a Promise and it has the following signature:

```javascript
imageFileToBase64(file, maxWidth/*optional*/, maxHeight/*optional*/, quality/*optional*/)
```

### file

 A File object

### maxWidth

*Default: original file width*

Integer, sets the maximum width of the returned image

### maxHeight

*Default: original file height*

Integer, sets the maximum height of the returned image

### quality

*Default: 1*

Float, between 0 and 1, sets the quality of the returned image.
