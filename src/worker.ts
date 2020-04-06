import "./libheif";

function processSingleImage(image: libheif.DecodeResult): Promise<ImageData> {
	return new Promise((resolve, reject) => {
		const w = image.get_width();
		const h = image.get_height();
		const whiteImage = new ImageData(w, h);
		for (let i = 0; i < w * h; i++) {
			whiteImage.data[i * 4 + 3] = 255;
		}
		image.display(whiteImage, (imageData) => {
			if (!imageData) {
				return reject(
					"ERR_LIBHEIF Error while processing single image and generating image data, could not ensure image"
				);
			}
			resolve(imageData);
		});
	});
}

onmessage = (message: MessageEvent) => {
	const id = message.data.id;
	try {
		const decoder = new libheif.HeifDecoder();
		let imagesArr = decoder.decode(message.data.buffer);
		if (!imagesArr || !imagesArr.length) {
			throw "ERR_LIBHEIF format not supported";
		}
		imagesArr = imagesArr.filter((x) => {
			let valid = true;
			try {
				/*
				sometimes the heic container is valid
				yet the images themselves are corrupt
				*/
				x.get_height();
			} catch (e) {
				valid = false;
			}
			return valid;
		});
		if (!imagesArr.length) {
			throw "ERR_LIBHEIF Heic doesn't contain valid images";
		}

		Promise.all(imagesArr.map((image) => processSingleImage(image)))
			.then((imageDataArr) => {
				postMessage({ id, imageDataArr, error: "" });
			})
			.catch((e) => {
				postMessage({
					id,
					imageDataArr: [],
					error: e && e.toString ? e.toString() : e,
				});
			});
	} catch (e) {
		postMessage({
			id,
			imageDataArr: [],
			error: e && e.toString ? e.toString() : e,
		});
	}
};
