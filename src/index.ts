import "./libheif";

const supportedMIMETypes = ["image/png", "image/jpeg", "image/gif"];

type ResultType = "Blob" | "ImageData"

function heic2any({
	blob,
	toType,
	quality,
	resolveTo = "Blob",
}: {
	blob: Blob;
	toType?: string;
	quality?: number;
	resolveTo?: ResultType;
}): Promise<Blob | ImageData> {
	// normalize quality
	if (quality !== undefined) {
		if (quality > 1 || quality < 0) {
			quality = undefined;
		}
	}

	// normalize MIME type
	if (toType !== undefined) {
		if (supportedMIMETypes.indexOf(toType) === -1) {
			toType = undefined;
		}
	}

	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = e => {
			const buffer = (e.target as any).result;
			const decoder = new libheif.HeifDecoder();
			const imagesArr = decoder.decode(buffer);
			if (!imagesArr || !imagesArr.length) {
				return reject("format not supported");
			}

			const primaryImage =
				imagesArr.find(x => x.is_primary()) || imagesArr[0];

			const w = primaryImage.get_width();
			const h = primaryImage.get_height();

			if (resolveTo === "ImageData") {
				const whiteImage = new ImageData(w, h)
				for (let i = 0; i < w * h; i++) {
					whiteImage.data[i * 4 + 3] = 255;
				}

				primaryImage.display(whiteImage, display_image_data => {
					resolve(display_image_data);
				})
			} else {
				const canvas = document.createElement("canvas");
				canvas.width = w;
				canvas.height = h;
				const ctx = canvas.getContext("2d");

				if (!ctx) {
					return reject("Error in canvas context");
				}

				const whiteImage = ctx.createImageData(w, h);
				for (let i = 0; i < w * h; i++) {
					whiteImage.data[i * 4 + 3] = 255;
				}

				primaryImage.display(whiteImage, display_image_data => {
					ctx.putImageData(display_image_data, 0, 0);
					canvas.toBlob(
						resultingBlob => {
							if (resultingBlob) {
								resolve(resultingBlob);
							}
						},
						toType,
						quality
					);
				});
			}
		};
		reader.readAsArrayBuffer(blob);
	});
}

export default heic2any;
