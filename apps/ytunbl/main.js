"use strict";

(async () => {
// default error handler
window.onerror = (message, src, lineno, colno, error) => {
	alert(`Error at "${src}", line ${lineno}:${colno}: \n${error}`, "Error");
};

// html elements
const searchBar = document.getElementById("search");
const searchButton = document.getElementById("search-button");
const maxResults = document.getElementById("max-results");
const order = document.getElementById("order");
const message = document.getElementById("message");
const resultContainer = document.getElementById("results");
const loadmore = document.getElementById("loadmore");

// load youtube gapi
await new Promise(r => gapi.load("client", r));
await new Promise(r => gapi.client.load("youtube", "v3", r));
await gapi.client.init({
	apiKey: "AIzaSyBTULa9eVc8Y_tky8hjo7u6R1IuT2eXrdw",
	discoveryDocs: [
		"https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
	]
});

const youtube = gapi.client.youtube;
if (youtube == null) {
	message.textContent = "Failed to load YouTube GAPI: Internal Error. Please refresh this page.";
	return;
}

let pageToken = null;

searchButton.onclick = () => {
	resultContainer.innerHTML = "";
	pageToken = null;
	run();
};
searchBar.onkeydown = (e) => {
	if (e.key == "Enter") {
		e.preventDefault();
		searchButton.click();
	}
};

/**
 * @param {HTMLInputElement} element 
 * @param {number} def 
 * @param {number} min 
 * @param {number} max 
 */
function correctNumberRange(element, def, min, max) {
	const val = element.value;
	if (val == null || val.length == 0)
		return element.value = def.toString();

	const nVal = parseInt(val);
	if (nVal < min)
		return element.value = min.toString();
	else if (nVal > max)
		return element.value = max.toString();
	else return element.value;
}

function run() {
	loadmore.style.display = "none"
	message.innerHTML = "";
	search(searchBar.value, correctNumberRange(maxResults, 10, 1, 50), order.value);
}

/**
 * @param {HTMLElement} container 
 * @param {string} videoId 
 */
function createVideoFrame(container, videoId) {
	const frame = document.createElement("embed");
	frame.setAttribute("type", "text/plain");
	frame.setAttribute("width", "800");
	frame.setAttribute("height", "600");
	frame.setAttribute("loading", "lazy");
	frame.setAttribute("scrolling", "no");
	frame.setAttribute("fetchpriority", "high");
	frame.setAttribute("allowfullscreen", "true");
	frame.setAttribute("referrerpolicy", "no-referrer");
	frame.setAttribute("sandbox", "allow-scripts allow-same-origin");

	const url = new URL("https://www.youtube-nocookie.com/embed/" + videoId);
	url.searchParams.set("autoplay", "1");
	url.searchParams.set("controls", "1");
	url.searchParams.set("rel", "0");
	url.searchParams.set("color", "white");
	frame.setAttribute("src", url.href);

	container.appendChild(frame);
}

/**
 * @param {string} q 
 * @param {string | number} maxResults 
 * @param {string} order 
 */
async function search(q, maxResults, order) {
	const params = {
		part: "snippet",
		type: "video",
		order,
		maxResults,
		pageToken,
		q
	};

	const response = await youtube.search.list(params);
	if (response == null) {
		message.innerHTML = "Internal error";
		return;
	}

	const result = response.result;
	if (result == null) {
		message.innerHTML = "Failed to fetch search results.";
		return;
	}

	const items = result.items;
	if (items.length == 0) {
		message.innerHTML = "No results match your search.";
		return;
	}

	for (const item of items) {
		const id = item.id.videoId;
		const title = item.snippet.title;
		const description = item.snippet.description;
		const publishTime = item.snippet.publishTime;
		const thumbnail = item.snippet.thumbnails.medium;

		const container = document.createElement("div");
		container.className = "result";
		container.innerHTML = '<div class="result-item"><img class="result-preview" width="160" height="90" /><div class="result-details"><div class="result-title">Example</div><div class="result-description">An example video</div><div class="result-publish-time">A long time ago</div></div></div><div class="video-container"></div>';
		container.getElementsByClassName("result-preview")[0].setAttribute("src", thumbnail.url);
		container.getElementsByClassName("result-title")[0].textContent = title;
		container.getElementsByClassName("result-description")[0].textContent = description;
		container.getElementsByClassName("result-publish-time")[0].textContent = publishTime;

		const videoContainer = container.getElementsByClassName("video-container")[0];
		videoContainer.style.display = "none";

		container.getElementsByClassName("result-item")[0].onclick = () => {
			if (videoContainer.style.display == "none") {
				videoContainer.style.display = "block";
				createVideoFrame(videoContainer, id);
			} else {
				videoContainer.innerHTML = "";
				videoContainer.style.display = "none";
			}
		};

		resultContainer.appendChild(container);
	}

	const nextPageToken = result.nextPageToken;
	if (nextPageToken != null) {
		loadmore.style.display = "block";
		loadmore.onclick = () => {
			pageToken = nextPageToken;
			run();
		};
	}
}

})();
