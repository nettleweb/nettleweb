"use strict";

(async () => {
	// default error handler
	window.onerror = (e, source, lineno, colno, err) => {
		let msg = "Unhandled error at " + (source || "unknown source ");
		if (lineno != null)
			msg += lineno;
		if (colno != null)
			msg += ":" + colno;
		if (err != null)
			msg += "\n\n" + err;

		alert(msg, "Error");
	};

	// wait document loading to fully complete
	await new Promise(resolve => {
		const timer = setInterval(() => {
			if (document.readyState === "complete") {
				clearInterval(timer);
				resolve();
			}
		}, 50);
	});

	// load youtube gapi
	await new Promise(r => gapi.load("client", r));
	await new Promise(r => gapi.client.load("youtube", "v3", r));
	await gapi.client.init({
		apiKey: "AIzaSyCSS1Sobpz5lVPYThH94x3Wh8zuR8ev0Fc",
		discoveryDocs: [
			"https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"
		]
	});

	const youtube = gapi.client.youtube;
	if (youtube == null) {
		message.textContent = "Failed to load YouTube GAPI: Internal Error. Please refresh this page.";
		return;
	}

	// html elements
	const searchBar = document.getElementById("search-input");
	const searchButton = document.getElementById("search-button");
	const maxResults = document.getElementById("max-results");
	const order = document.getElementById("order");
	const message = document.getElementById("message");
	const results = document.getElementById("results");
	const loadmore = document.getElementById("loadmore");

	let pageToken = null;

	searchButton.onclick = () => {
		results.innerHTML = "";
		pageToken = null;
		const url = optUrl(searchBar.value);
		if (url == null) {
			run();
			return;
		}

		message.innerHTML = "";
		loadmore.style.display = "none";

		const id = parseId(url);
		if (id == null) {
			message.innerHTML = "Invalid YouTube video URL";
			return;
		}

		const embed = document.createElement("embed");
		embed.type = "text/plain";
		embed.width = "800"
		embed.height = "600";
		embed.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&controls=1&rel=0&color=white"
		results.appendChild(embed);
	};
	searchBar.onkeydown = (e) => {
		if (e.key == "Enter") {
			e.preventDefault();
			searchButton.click();
		}
	};

	/**
	 * @param {string} str 
	 */
	function optUrl(str) {
		try {
			return new URL(str);
		} catch (err) {
			return null;
		}
	}

	/**
	 * @param {URL} url 
	 */
	function parseId(url) {
		switch (url.host) {
			case "youtube.com":
			case "youtube-nocookie.com":
			case "www.youtube.com":
			case "www.youtube-nocookie.com":
				const path = url.pathname;
				if (path === "/watch")
					return url.searchParams.get("v") || null;
				if (path.startsWith("/embed/"))
					return url.pathname.substring(7) || null; // return empty string as null
				return null;
			case "youtu.be":
				return url.pathname.substring(1) || null;
			default:
				return null;
		}
	}

	async function run() {
		message.innerHTML = "";
		loadmore.style.display = "none";
		searchButton.setAttribute("disabled", "true");

		try {
			await search(searchBar.value, maxResults.value, order.value);
		} catch (err) {
			message.textContent = "API Error (See dev console for details)";
			console.error(err);
		}
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
			maxResults: Math.max(Math.min(maxResults, 50), 1),
			q, order, pageToken
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
			const snippet = item.snippet;

			const elem = document.createElement("div");
			const iElem = document.createElement("div");

			{
				elem.appendChild(iElem);

				const img = document.createElement("img");
				img.width = 160;
				img.height = 90;
				img.title = "Video Preview";
				img.draggable = false;
				img.src = snippet.thumbnails.medium.url;
				iElem.appendChild(img);

				const dElem = document.createElement("div");
				iElem.appendChild(dElem);

				const title = document.createElement("div");
				title.className = "title";
				title.textContent = snippet.title;
				dElem.appendChild(title);

				const desc = document.createElement("div");
				desc.className = "desc";
				desc.textContent = snippet.description;
				dElem.appendChild(desc);

				const time = document.createElement("div");
				time.className = "time";
				time.textContent = snippet.publishTime;
				dElem.appendChild(time);
			}

			const embed = document.createElement("embed");
			embed.type = "text/plain";
			embed.width = "800";
			embed.height = "600";
			embed.style.display = "none";
			elem.appendChild(embed);

			iElem.onclick = () => {
				if (embed.style.display == "none") {
					embed.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&controls=1&rel=0&color=white";
					embed.style.display = "block";
				} else {
					embed.src = "about:blank";
					embed.style.display = "none";
				}
			};
			results.appendChild(elem);
		}

		const nextPageToken = result.nextPageToken;
		if (nextPageToken != null) {
			loadmore.style.display = "block";
			loadmore.onclick = () => {
				pageToken = nextPageToken;
				run();
			};
		}

		searchButton.removeAttribute("disabled");
	}
})();