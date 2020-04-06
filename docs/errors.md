# Error handling

Error handling can be done via promises like this:

```javascript
// fetching the heic image
fetch("./my-image.heic")
	.then((res) => res.blob())
	.then((blob) => heic2any({ blob }))
	.then((conversionResult) => {
		var url = URL.createObjectURL(conversionResult);
		document.getElementById("my-image").innerHTML = `<img src="${url}">`;
	})
	.catch((errorObject) => {
		console.log(errorObject);
	});
```

When an error occurs the `console.log` of the above example would output for example:

```json
{
	"code": 1,
	"message": "ERR_USER library only accepts BLOBs as input"
}
```

The `code` property represents a class of error, while the `message` property explains deeper details of why the error occurred.

### Error codes

| Code | Explanation                                                                                                                                    |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `1`  | A user error, user should revise the parameters given to the library function                                                                  |
| `2`  | LIBHEIF error, the error occurred when trying to decode the `heic` file                                                                        |
| `3`  | GIF error, the error occurred when trying to encode an animated `gif`.                                                                         |
| `4`  | DOM error, error occurred when trying to utilize the DOM API like the file reader, the Blob class and base64 encoders                          |
| `5`  | Canvas error, error occurred when trying to setup the final conversion canvas, as the canvas api is used to convert pixel data to a real image |
| `0`  | Unknown error, error doesn't belong to any of the above classes.                                                                               |
