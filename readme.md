# HEIC2ANY

converting [HEIC/HEIF](http://www.hackerfactor.com/blog/index.php?/archives/833-HEIC-Yeah.html) image files to JPEG/PNG/GIF in the browser. This tool is specifically for the browser environment, it _WILL NOT_ work in node environment.

[Click here for demo](https://alexcorvi.github.io/heic2any/#try)

---

-   Installation: yarn

```bash
yarn add heic2any
```

-   Installation: npm

```bash
npm install heic2any
```

-   Installation: no module bundler

```html
<!-- just include the file in a script tag -->
<script src="./dist/index.js">
```

-   Usage: Typescript & Javascript

```typescript
import heic2any from "heic2any";
// or
const heic2any = require("heic2any");
// skip the lines above if you're not using a module bundler
// and would prefer to include a <script> tag in your HTML file

// this is our heif image file
const HEICBlobFile = new Blob();

heic2any({
	// required: the HEIF blob file
	blob: HEICBlobFile,
	// (optional) MIME type of the target file
	// it can be "image/jpeg", "image/png" or "image/gif"
	// defaults to "image/png"
	toType: "image/jpeg",
	// conversion quality
	// a number ranging from 0 to 1
	quality: 0.8
});
```

> This project is heavily based on the excellent [libheif](https://github.com/strukturag/libheif/) by [struktur](https://www.struktur.de/).
