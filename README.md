# Image File to Base64

This is a utility function to get a base64 encoded image from a DOM File.

The returned image is **always** a image/jpeg. This means that if you try to read an image/png with transparency, the transparency will become black.

*Obvioulsy, it is just for browser usage and the File must be of an image type.*

## Installation

```npm install --save image-file-to-base64-exif```

## Usage

```javascript
import imageFileToBase64 from 'image-file-to-base64-exif'

// then, with some file object

imageFileToBase64(file)
    .then(function (base64) {
        // ...
    })
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
