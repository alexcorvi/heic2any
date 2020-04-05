declare namespace libheif {

	interface DecodeResult {
		get_width: () => number;
		get_height: () => number;
		is_primary: () => boolean;
		display: (
			base: ImageData,
			callback: (result: ImageData) => void
		) => void;
	}

	type DecodeResultType = DecodeResult[]
	class HeifDecoder {
    decode(buffer: ArrayBuffer): DecodeResultType;
  }
}
