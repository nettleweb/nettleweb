"use strict";

(() => {
let coder={encode(e){if(!e)return e;e=e.toString();const r=Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=");let t,o,n,c,d="",i=e.length%3;for(let i=0;i<e.length;){if((o=e.charCodeAt(i++))>255||(n=e.charCodeAt(i++))>255||(c=e.charCodeAt(i++))>255)throw new TypeError("invalid character found");t=o<<16|n<<8|c,d+=r[t>>18&63]+r[t>>12&63]+r[t>>6&63]+r[63&t]}return encodeURIComponent(i?d.slice(0,i-3)+"===".substr(i):d)},decode(e){if(!e)return e;const r={0:52,1:53,2:54,3:55,4:56,5:57,6:58,7:59,8:60,9:61,A:0,B:1,C:2,D:3,E:4,F:5,G:6,H:7,I:8,J:9,K:10,L:11,M:12,N:13,O:14,P:15,Q:16,R:17,S:18,T:19,U:20,V:21,W:22,X:23,Y:24,Z:25,a:26,b:27,c:28,d:29,e:30,f:31,g:32,h:33,i:34,j:35,k:36,l:37,m:38,n:39,o:40,p:41,q:42,r:43,s:44,t:45,u:46,v:47,w:48,x:49,y:50,z:51,"+":62,"/":63,"=":64};let t;e=(e=decodeURIComponent(e.toString())).replace(/\s+/g,""),e+="==".slice(2-(3&e.length));let o,n,c="";for(let d=0;d<e.length;)t=r[e.charAt(d++)]<<18|r[e.charAt(d++)]<<12|(o=r[e.charAt(d++)])<<6|(n=r[e.charAt(d++)]),c+=64===o?String.fromCharCode(t>>16&255):64===n?String.fromCharCode(t>>16&255,t>>8&255):String.fromCharCode(t>>16&255,t>>8&255,255&t);return c}},coder1={encode:e=>e?encodeURIComponent(e.toString().split("").map(((e,r)=>r%2?String.fromCharCode(2^e.charCodeAt()):e)).join("")):e,decode(e){if(!e)return e;let[r,...t]=e.split("?");return decodeURIComponent(r).split("").map(((e,r)=>r%2?String.fromCharCode(2^e.charCodeAt(0)):e)).join("")+(t.length?"?"+t.join("?"):"")}}

self.__uv$config = {
	prefix: "/O00O0O/",
	bare: "https://giigle.cf/",
	encodeUrl: coder1.encode,
	decodeUrl: coder1.decode,
	bundle: "/uv/uv.bundle.js",
	config: "/uv/uv.config.js",
	handler: "/uv/uv.handler.js",
	sw: "/uv/uv.sw.js"
};

})();
