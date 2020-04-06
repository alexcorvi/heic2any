document.getElementById("user-file").addEventListener("change", function (ev) {
	document.getElementById("error-on-try").innerHTML = "";
	document.getElementById("error-on-try").style.display = "none";
	var blob = ev.target.files[0];
	heic2any({
		blob: blob,
		toType: "image/gif",
	})
		.then(function (resultBlob) {
			saveFile(resultBlob, blob.name + ".gif");
		})
		.catch(function (x) {
			document.getElementById("error-on-try").style.display = "block";
			document.getElementById("error-on-try").innerHTML =
				"Error code: <code>" + x.code + "</code> " + x.message;
		});
});
function saveFile(blob, filename) {
	if (window.navigator.msSaveOrOpenBlob) {
		window.navigator.msSaveOrOpenBlob(blob, filename);
	} else {
		var a = document.createElement("a");
		document.body.appendChild(a);
		var url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = filename;
		a.click();
		setTimeout(function () {
			window.URL.revokeObjectURL(url);
			document.body.removeChild(a);
		}, 0);
	}
}
