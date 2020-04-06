declare namespace libheif {
	interface DecodeResult {
		img: {
			is_primary: boolean;
			thumbnails: number;
			width: number;
			height: number;
		} | null;
		get_width: () => number;
		get_height: () => number;
		is_primary: () => boolean;
		display: (
			base: ImageData,
			callback: (result: ImageData | null) => void
		) => void;
	}

	type DecodeResultType = DecodeResult[];
	class HeifDecoder {
		decode(buffer: ArrayBuffer): DecodeResultType;
	}
}
