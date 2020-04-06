# Getting started

### Installation

-   yarn

```bash
yarn add heic2any
```

-   npm

```bash
npm install heic2any
```

-   no module bundler

```html
<!-- just include the file in a script tag -->
<script src="./dist/heic2any.js">
```

### Using the library

1. **Importing the library**: if you're using a module bundler (not including the file directly) then you can import the library like the example below.

```javascript
import heic2any from "heic2any";
// or
const heic2any = require("heic2any");
// skip the lines above if you're not using a module bundler
```

2. **Basic usage**: The following example will convert `heic` file to `png`. plain and simple.

```javascript
// fetching the heic image
fetch("./my-image.heic")
	.then((res) => res.blob())
	.then((blob) => heic2any({ blob }))
	.then((conversionResult) => {
		// conversionResult is a BLOB
		// of the PNG formatted image
	})
	.catch((e) => {
		// see error handling section
	});
```

**[JSFiddle Demo](https://jsfiddle.net/alexcorvi/nLbmw5fk/5/)**

3. **Compressing and lowering the quality**: The following example will convert `heic` file to `jpeg`, with low quality.

```javascript
// fetching the heic image
fetch("./my-image.heic")
	.then((res) => res.blob())
	.then((blob) =>
		heic2any({
			blob,
			toType: "image/jpeg",
			quality: 0.5, // cuts the quality and size by half
		})
	)
	.then((conversionResult) => {
		// conversionResult is a BLOB
		// of the JPEG formatted image
		// with low quality
	})
	.catch((e) => {
		// see error handling section
	});
```

**[JSFiddle Demo](https://jsfiddle.net/alexcorvi/wd139bya/1/)**

4. **Supporting multiple images**: As some `heic` files are actually multiple images, you might want to extract them into multiple `png` files like the example below.

```javascript
// fetching the heic image
fetch("./my-image.heic")
	.then((res) => res.blob())
	.then((blob) =>
		heic2any({
			blob,
			toType: "image/png",
			multiple: true,
		})
	)
	.then((conversionResult) => {
		// conversionResult is an array
		// of BLOBs that are PNG
		// formatted images
	})
	.catch((e) => {
		// see error handling section
	});
```

**[JSFiddle Demo](https://jsfiddle.net/alexcorvi/x53hncry/6/)**

5. **Supporting animated images**: Multiple `heic` images means that it is an animated image (like bursts), so you might want to convert it to a `gif` image.

```javascript
// fetching the heic image
fetch("./my-image.heic")
	.then((res) => res.blob())
	.then((blob) =>
		heic2any({
			blob,
			toType: "image/gif",
			gifInterval: 0.3, // switch frames every 0.3 second
		})
	)
	.then((conversionResult) => {
		// conversionResult is a BLOB
		// of the gif formatted image
	})
	.catch((e) => {
		// see error handling section
	});
```

**[JSFiddle Demo](https://jsfiddle.net/alexcorvi/1n7mLrc4/1/)**
