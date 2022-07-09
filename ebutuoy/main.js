"use strict";

(() => {
// default error handler
window.onerror = (msg, src, lineno, colno, err) => {
	alert(msg, "Error", "images/error.png");
};


// load api key
gapi.load("client", () => {
	gapi.client.setApiKey("AIzaSyBqQGSeJZUdI0itB4t-UW21-DOv3Ae1cAk");
	gapi.client.load("https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest")
		.then(() => console.log("GAPI client loaded for API"), (err) => {
			console.log(err);
			alert("Failed to load GAPI client for API. Use the developer console to get error details.", "Error", "images/error.png");
		});
});

let cWidth = document.body.clientWidth;
let pageToken = null;
let resultContainer = document.getElementById("result-container");
let resultElement = document.getElementsByClassName("result")[0];
let textInput = document.getElementById("text-input");
let searchButton = document.getElementById("search-button");
let optionMaxResults = document.getElementById("option-max-results");
let optionOrder = document.getElementById("option-order");
let loadmoreButton = document.getElementById("loadmore-button");

// correct display
if (cWidth < 800) {
	resultContainer.style.width = "100%";
	if (cWidth < 500) {
		document.getElementById("container").style.width = "100%";
		if (cWidth < 400) {
			let logo = document.getElementById("logo");
			logo.style.width = "100%";
			logo.style.height = Math.round(logo.clientWidth / 4 * 3) + "px";
		}
	}
}

searchButton.onclick = () => {
	resultContainer.innerHTML = "";
	pageToken = null;
	run();
};
textInput.onkeydown = (e) => {
	if (e.keyCode == 13) { // enter
		resultContainer.innerHTML = "";
		pageToken = null;
		run();
	}
};

function correctNumberRange(element, def, min, max) {
	let val = element.value;
	if (val == null || val == "")
		return element.value = def.toString();

	let nVal = parseInt(val);
	if (nVal < min)
		return element.value = min.toString();
	else if (nVal > max)
		return element.value = max.toString();
	else return element.value;
}

function run() {
	let input = textInput.value;
	let maxResults = correctNumberRange(optionMaxResults, 10, 1, 50);
	let order = optionOrder.value;
	search(input, maxResults, order);
}

function vid(parent, id) {
	// create video frame
	let it = document.createElement("iframe");
	it.style.position = "absolute";
	it.style.display = "block";
	it.style.width = "100%";
	it.style.height = "100%";
	it.style.border = "none";
	it.setAttribute("type", "text/plain");
	it.setAttribute("allowfullscreen", "true");
	it.setAttribute("sandbox", "allow-scripts allow-same-origin");
	it.setAttribute("loading", "lazy");
	it.onload = () => {
		let url = new URL("https://www.youtube.com/embed/" + id);
		Object.freeze(url);
		it.contentWindow.location = url;
		it.onload = null;
	};
	parent.appendChild(it);
}

function search(query, limit, order, pageId) {
	let params = {
		"part": "snippet",
		"type": "video",
		"order": order,
		"maxResults": limit,
		"q": query
	};

	if (pageToken != null)
		params.pageToken = pageToken;

	try {
		gapi.client.youtube.search.list(params).then((result) => {
			let r = [];
			try {
				r = result.result.items;
			} catch(err) {
				console.log(err);
				alert("Failed to fetch search results. Use the developer console to get error details.", "Error");
			}
			for (let i = 0; i < r.length; i++) {
				let e = r[i];
				let id = e.id.videoId;
				let title = e.snippet.title;
				let description = e.snippet.description;
				let publishTime = e.snippet.publishTime;
				let thumbnail = e.snippet.thumbnails.medium;
				let node = resultElement.cloneNode(true);
				node.getElementsByClassName("result-preview")[0].src = thumbnail.url;
				node.getElementsByClassName("result-title")[0].innerHTML = title;
				node.getElementsByClassName("result-description")[0].innerHTML = description;
				node.getElementsByClassName("result-publish-time")[0].innerHTML = publishTime;

				let videoContainer = node.getElementsByClassName("video-container")[0];
				// correct display for video container
				if (resultContainer.clientWidth < 400)
					videoContainer.style.width = "100%";

				node.getElementsByClassName("result-item")[0].onclick = () => {
					if (videoContainer.style.display == "none") {
						videoContainer.style.display = "block";
						vid(videoContainer, id);
					} else {
						videoContainer.innerHTML = "";
						videoContainer.style.display = "none";
					}
				};

				node.style.display = "block";
				resultContainer.appendChild(node);
			}

			loadmoreButton.remove();
			loadmoreButton.style.display = "block"; // always reset display style to fix some issues

			let nextPageToken = result.result.nextPageToken;
			if (nextPageToken != null) { // only show when there are more videos available
				loadmoreButton.onclick = () => {
					pageToken = nextPageToken;
					run();
				};
				resultContainer.appendChild(loadmoreButton);
			}
		});
	} catch(err) {
		console.log(err);
		alert("Failed to fetch search results. Use the developer console to get error details.", "Error", "images/error.png");
	}
}

})();
