function embedJSFiddleCode(string) {
	for (
		var index = 0;
		index < string.split("**[JSFiddle Demo](https").length + 5;
		index++
	) {
		string = string.replace(
			/([\s\S]*)\*\*\[JSFiddle Demo\]\(https:\/\/jsfiddle\.net\/alexcorvi\/([\w\d]+\/\d+)\/\)\*\*([\s\S]*)/gim,
			'$1<b>JSFiddle</b><iframe width="100%" height="300" src="//jsfiddle.net/alexcorvi/$2/embedded/js,result/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>$3'
		);
	}
	return string;
}

async function fetchMD(relativePath, linesToDelete) {
	return (await (await fetch(relativePath)).text())
		.split(/\n/)
		.filter(function (x, i) {
			return i >= linesToDelete;
		})
		.join("\n");
}

async function placeMDContent(relativePath, linesToDelete, elementID) {
	var content = await fetchMD(relativePath, linesToDelete);
	content = embedJSFiddleCode(content);
	document.getElementById(elementID).innerHTML = marked(content);
}

async function loadContent() {
	await placeMDContent("./readme.md", 3, "overview-content");
	await placeMDContent(
		"./docs/getting-started.md",
		1,
		"getting-started-content"
	);
	await placeMDContent("./docs/options.md", 1, "options-content");

	await placeMDContent("./docs/credits.md", 1, "credits-content");

	await placeMDContent("./docs/errors.md", 1, "error-handling-content");
	await placeMDContent("./LICENSE.md", 0, "license-content");

	document.querySelectorAll("pre code").forEach(function (block) {
		hljs.highlightBlock(block);
	});

	var html = "";

	$(".bs-docs-section").each(function () {
		var h1 = $(this).find("h1[id]").first(),
			h23 = $(this).find("h2[id], h3[id]:not([data-no-menu])");

		if (h1.length) {
			html +=
				'<li><a href="#' +
				h1[0].id +
				'">' +
				h1.clone().children().remove().end().text() +
				"</a>";

			if (h23.length) {
				html += '<ul class="nav">';
				h23.each(function () {
					html +=
						'<li><a href="#' +
						this.id +
						'">' +
						$(this).clone().children().remove().end().text() +
						"</a></li>";
				});
				html += "</ul>";
			}

			html += "</li>";
		}
	});

	if (html == "") {
		$("[role=complementary]").hide();
		$("[role=main]").toggleClass("col-md-9 col-md-12");
	} else {
		$(".bs-docs-sidenav").html(html);
	}

	// add heading anchors
	$("h1[id], h2[id], h3[id], h4[id], h5[id]").each(function () {
		$(this).prepend('<a href="#' + this.id + '" class="anchor-link">§</i>');
	});

	// enable bootbox
	$("[data-bootbox]").on("click", function () {
		var $target = $("#" + $(this).data("bootbox"));
		bootbox.alert({
			title: $target.attr("title"),
			message: $target.html(),
			size: $(this).data("bootbox-size"),
		});
	});
}

loadContent();
