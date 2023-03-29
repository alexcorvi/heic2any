# HEIC2ANY

[Demo, Documentation & more](https://alexcorvi.github.io/heic2any/)

Client-side (browser-side, using Javascript) conversion of [HEIC/HEIF](http://www.hackerfactor.com/blog/index.php?/archives/833-HEIC-Yeah.html) image files to JPEG, PNG, or GIF.

### What is HEIC format?

> High Efficiency Image File Format (HEIC) is a new image container format from the developers of MPEG, a popular audio and video compression standard. HEIC will be used by default on new photos on iOS 11, and it’s designed to save you storage space. As it’s a new container format, there will be some incompatibilities along the way, and Apple does a good job at handling most of these. iOS 11 will automatically share HEIC files as the default JPEG format for apps, so you won’t notice anything when you share a photo on Twitter or Instagram. iOS 11 also offers to automatically transfer photos and videos in a compatible format for Mac or PC users, useful if you’re simply plugging your iPhone into your laptop or PC.
> [theverge.com](https://www.theverge.com/2017/9/19/16332192/apple-ios-11-heic-iphone-image-format)

### Why you might need it?

While developing some web-based application that should be able to handle mobile uploads, I've come across a problem where browsers can not display certain images uploaded from the iPhone, after investigating through the issue, I noticed that that my iPhone was giving a `heic` formatted image.

Currently there are [zero web browsers](https://caniuse.com/#search=heif) that support HEIC photos. Even Apple's latest-greatest version of Safari can't decode HEIC and doesn't recognize the "image/heic" mimetype. A solution that came across my mind is to utilize the benefits of high resolution and low storage of heic images when storing in the server and client-side conversion to JPEG for viewing on the browser.

### Usage and limitations

This library would typically be used for viewing purposes, as currently it's not focusing on copying any metadata from the original `heic` file to the output `jpeg`, `gif` or `png`. The development process of this library is focusing on viewing a browser-consumable version of an `heic` file, and doing it quickly, asynchronously (using web workers) and accurately. This library would even convert `heic` containers that have multiple `heic` images into an animated `gif`.

However, if you're planning on storing the files (not just viewing them), I'd suggest you look for a server-side tool, or you try to get your hands dirty and contribute to this library and make it capable of storing metadata.

Last but not least, this tool is specifically for the browser environment, it **will not** work in node environment.

### Known issues

Those are the known issues of the library, pull requests are welcome:

1. Library doesn't take any metadata from the original file, resulting file doesn't have any metadata.
2. Library can convert bursts into an animated `gif`, however when a `heic` animation is given (like the stars animation in the demo) library will only take the first shot of the animation.
3. Support for IE11 is not here yet.
4. The library requires a browser-like environment to work, i.e. it needs the existence of the DOM and window object.
