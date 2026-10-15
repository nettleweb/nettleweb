import { Object, Reflect } from "./ctxfn";

let __j: ((...args: any[]) => boolean) | undefined;
let __w: string | undefined;

const Logger: globalThis.Logger = Object.freeze(Object.setPrototypeOf({
	"_": ({ console: s }: any, _: string) => {
		if (s == null || typeof s !== "object")
			throw new Error();

		const f = Reflect.get(s, "log", void 0);
		if (typeof f !== "function")
			throw new Error();
		for (const e of Object.keys(s))
			delete s[e];

		__j = (...args: any[]) => {
			Reflect.apply(f, null, args);
			return true;
		};
		__w = _;
	},
	get "$"() {
		const k = __j;
		__j = void 0;
		return k;
	},
	get "l"() {
		const k = __w;
		__w = void 0;
		return k;
	},
}, null));

export default Logger;