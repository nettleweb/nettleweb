#!/bin/env node
import fs from "fs";
import dns from "dns";
import http from "http";
import Path from "path";
import process from "process";

/**
 * @param {string} path
 * @returns {string | null}
 */
function getFilePath(path) {
	if (fs.existsSync(path = Path.resolve(Path.join("./static/", path)))) {
		if (fs.statSync(path, { bigint: true, throwIfNoEntry: true }).isDirectory())
			return fs.existsSync(path = Path.join(path, "index.html")) ? path : null;
		else
			return path;
	}
	return null;
}

/**
 * @param {string} path
 * @returns {string}
 */
function getMimeType(path) {
	switch (Path.extname(path)) {
		// image
		case ".png":
			return "image/png";
		case ".apng":
			return "image/apng";
		case ".avif":
			return "image/avif";
		case ".bmp":
			return "image/bmp";
		case ".gif":
			return "image/gif";
		case ".ico":
			return "image/x-icon";
		case ".jpg":
		case ".jpeg":
			return "image/jpeg";
		case ".svg":
			return "image/svg+xml";
		case ".tif":
		case ".tiff":
			return "image/tiff";
		case ".webp":
			return "image/webp";

		// audio
		case ".aac":
			return "audio/aac";
		case ".flac":
			return "audio/flac";
		case ".mid":
		case ".midi":
			return "audio/midi";
		case ".mp3":
			return "audio/mpeg";
		case ".oga":
		case ".ogg":
		case ".opus":
			return "audio/ogg";
		case ".wav":
			return "audio/wav";
		case ".weba":
			return "audio/webm";

		// video
		case ".avi":
			return "video/x-msvideo";
		case ".mp4":
			return "video/mp4";
		case ".mpeg":
			return "video/mpeg";
		case ".ogv":
			return "video/ogg";
		case ".ts":
			return "video/mp2t";
		case ".webm":
			return "video/webm";

		// fonts
		case ".otf":
			return "font/otf";
		case ".ttf":
			return "font/ttf";
		case ".woff":
			return "font/woff";
		case ".woff2":
			return "font/woff2";

		// misc
		case ".js":
		case ".cjs":
		case ".mjs":
			return "text/javascript";
		case ".css":
			return "text/css";
		case ".csv":
			return "text/csv";
		case ".txt":
			return "text/plain";
		case ".pdf":
			return "application/pdf";
		case ".rtf":
			return "application/rtf";
		case ".xml":
			return "application/xml";
		case ".json":
			return "application/json";
		case ".htm":
		case ".html":
			return "text/html";
		case ".xht":
		case ".xhtml":
			return "application/xhtml+xml";
		default:
			return "application/octet-stream";
	}
}

dns.setDefaultResultOrder("ipv4first");
dns.setServers(["1.1.1.1", "1.0.0.1"]);
dns.promises.setDefaultResultOrder("ipv4first");
dns.promises.setServers(["1.1.1.1", "1.0.0.1"]);
process.chdir(Path.resolve(import.meta.dirname, ".."));

const defaultHeaders = Object.freeze(Object.setPrototypeOf({
	"Referrer-Policy": "no-referrer",
	"Permissions-Policy": "camera=(), gyroscope=(), microphone=(), geolocation=(), local-fonts=(), magnetometer=(), accelerometer=(), idle-detection=(), storage-access=(), browsing-topics=(), display-capture=(), encrypted-media=(), compute-pressure=(), window-management=(), xr-spatial-tracking=(), attribution-reporting=()",
	"X-Content-Type-Options": "nosniff",
	"Cross-Origin-Opener-Policy": "same-origin",
	"Cross-Origin-Embedder-Policy": "credentialless"
}, null));

const httpServer = http.createServer({
	noDelay: false,
	keepAlive: false,
	maxHeaderSize: 32768,
	requestTimeout: 15000
}, void 0);

httpServer.on("request", (req, res) => {
	const method = req.method;
	const headers = req.headers;
	const rawPath = req.url;
	const host = headers.host;

	if (method == null || rawPath == null || host == null || rawPath[0] !== "/") {
		res.writeHead(400, "", { "Content-Type": "text/plain" });
		res.end("400 Bad Request", "utf-8");
		return;
	}

	switch (method) {
		case "GET":
		case "HEAD":
			break;
		case "OPTIONS":
			res.writeHead(200, "", {
				"Allow": "GET, HEAD, OPTIONS"
			});
			res.end();
			return;
		default:
			res.writeHead(405, "", {
				"Allow": "GET, HEAD, OPTIONS",
				"Content-Type": "text/plain"
			});
			res.end("405 Method Not Allowed", "utf-8");
			return;
	}

	const url = new URL(rawPath, "https://nettleweb.com/");
	const path = url.pathname;

	if (path === "/stop") {
		res.writeHead(200, "", { "Content-Type": "text/plain" });
		res.end("Success", "utf-8");
		process.exit(0);
		return;
	}

	const file = getFilePath(decodeURIComponent(path));
	if (file != null) {
		if (path[path.length - 1] !== "/" && file.endsWith("index.html") && !path.endsWith("index.html")) {
			res.writeHead(301, "", { "Content-Type": "text/plain", "Location": path + "/" + url.search });
			res.end("301 Moved Permanently", "utf-8");
			return;
		}

		const range = headers.range || "";
		if (range.length > 0) {
			if (range.slice(0, 6) !== "bytes=" || range.indexOf(",", 1) >= 0) {
				res.writeHead(501, "", { "Content-Type": "text/plain" });
				res.end("501 Not Implemented", "utf-8");
				return;
			}

			const size = fs.statSync(file, { bigint: false, throwIfNoEntry: true }).size;
			const parts = range.slice(6).split("-", 2);
			const sindex = parseInt(parts[0], 10) || 0;
			const eindex = parseInt(parts[1], 10) || (size - 1);

			if (sindex < 0 || sindex > eindex || sindex >= size) {
				res.writeHead(416, "", { "Content-Type": "text/plain", "Content-Range": "bytes */" + size });
				res.end("416 Range Not Satisfiable", "utf-8");
				return;
			}

			res.writeHead(206, "", {
				...defaultHeaders,
				"Content-Type": getMimeType(file),
				"Content-Range": "bytes " + sindex + "-" + eindex + "/" + size,
				"Content-Length": (eindex - sindex + 1).toString(10)
			});

			if (method === "HEAD") {
				res.end();
				return;
			}

			fs.createReadStream(file, {
				end: eindex,
				start: sindex,
				autoClose: true,
				emitClose: true,
				highWaterMark: 32768
			}).pipe(res, { end: true });
		} else {
			res.writeHead(200, "", {
				...defaultHeaders,
				"Content-Type": getMimeType(file),
				"Content-Length": fs.statSync(file, { bigint: true, throwIfNoEntry: true }).size.toString(10)
			});

			if (method === "HEAD") {
				res.end();
				return;
			}

			fs.createReadStream(file, {
				start: 0,
				autoClose: true,
				emitClose: true,
				highWaterMark: 32768
			}).pipe(res, { end: true });
		}
	} else {
		res.writeHead(200, "", {
			...defaultHeaders,
			"Content-Type": "application/xhtml+xml"
		});
		res.end(fs.readFileSync("./static/index.html", "utf-8"), "utf-8");
	}
});
httpServer.on("upgrade", (req, sock, head) => {
	const path = req.url;
	const host = req.headers.host;

	if (path == null || host == null || path[0] !== "/") {
		sock.end("Bad Request", "utf-8");
		return;
	}

	sock.destroy(new Error("Function not implemented"));
});

httpServer.listen(8000, "0.0.0.0", 255, () => {
	let address = httpServer.address() || "unknown address";
	if (typeof address !== "string")
		address = address.address + ":" + address.port;
	console.log("HTTP server started on " + address);
});

