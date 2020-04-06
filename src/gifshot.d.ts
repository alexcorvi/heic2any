declare namespace gifshot {
	function createGIF(
		options: {
			images: string[];
			interval: number;
			gifWidth: number;
			gifHeight: number;
		},
		Callback: (obj: {
			error: boolean;
			errorCode: string;
			errorMessage: string;
			image: string;
		}) => void
	): void;
}
