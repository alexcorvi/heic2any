function loadHEIC(url) {
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(function (x) {
				return x.blob();
			})
			.then(function (x) {
				console.log("working on", x);
				return heic2any({ blob: x, toType: "image/gif" });
			})
			.then(function (x) {
				var url = URL.createObjectURL(x);
				document.getElementById("demo-sample-files").innerHTML =
					document.getElementById("demo-sample-files").innerHTML +
					'<a target="_blank" href="' +
					url +
					'"><img src="' +
					url +
					'"></a>';
				resolve();
			})
			.catch(function (e) {
				reject(e);
			});
	});
}

const files = [];

for (let i = 1; i < 16; i++) {
	files.push("./demo/" + i + ".heic");
}

/*
 * serial executes Promises sequentially.
 * @param {funcs} An array of funcs that return promises.
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * serial(urls.map(url => () => $.ajax(url)))
 *     .then(console.log.bind(console))
 */
const serial = (funcs) =>
	funcs.reduce(
		(promise, func) =>
			promise.then((result) =>
				func().then(Array.prototype.concat.bind(result))
			),
		Promise.resolve([])
	);

// next convert each item to a function that returns a promise
const funcs = files.map((file) => () => loadHEIC(file));

serial(funcs)
	.then(() => {
		document.getElementById("loading").innerHTML = "";
	})
	.catch((e) => console.log(e));
