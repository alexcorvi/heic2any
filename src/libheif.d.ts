declare namespace libheif {
	class HeifDecoder {
		decode(
			buffer: ArrayBuffer
		): {
			get_width: () => number;
			get_height: () => number;
			is_primary: () => boolean;
			display: (
				base: ImageData,
				callback: (result: ImageData) => void
			) => void;
		}[];
	}
}
