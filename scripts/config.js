#!/bin/env node
import fs from "fs";
import Path from "path";
import zlib from "zlib";
import crypto from "crypto";
import NettleWeb from "@nettleweb/core";

const baseDir = Path.resolve(Path.dirname(import.meta.dirname));
const config = JSON.parse(fs.readFileSync(Path.join(baseDir, "/config/config.json"), "utf-8"));

const aes = new NettleWeb.AES([43, 239, 4, 91, 199, 217, 243, 249, 243, 22, 75, 84, 98, 96, 73, 168, 246, 75, 228, 2, 209, 172, 163, 151, 172, 238, 88, 68, 254, 198, 7, 236]);
for (const k of Object.keys(config))
	config[k] = NettleWeb.Base64.encode(aes.encryptCTR(NettleWeb.UTF_8.encode(config[k]), NettleWeb.Hex.decode(NettleWeb.md5(k))));

const key = crypto.getRandomValues(new Uint8Array(16));
config["_Zetta"] = key.slice(0, 16);

for (let i = 0; i < 16; i++)
	key[i] += ((i % 3) + 1) * 2 - 2022;

config["_Yotta"] = aes.encryptCTR(NettleWeb.UTF_8.encode(fs.readFileSync(Path.join(baseDir, "/config/pages.html"), "utf-8").replace(/[\t\n]/g, "")), key);

fs.writeFileSync(Path.join(baseDir, "/src/misc/config.ts"), "import { inflateSync } from \"fflate\";\nimport { NTON, Base64 } from \"./ctxfn\";\n\nexport default NTON.decode(inflateSync(Base64.decode(\n\"" + zlib.deflateRawSync(NettleWeb.NTON.encode(config), {
	level: 9,
	memLevel: 9,
	chunkSize: 65536,
}).toString("base64") + "\"\n)));\n", {
	mode: 0o600,
	flush: true,
	encoding: "utf-8"
});
