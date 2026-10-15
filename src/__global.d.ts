
declare global {
	export interface Window extends Record<any, any>, globalThis {
		onappinstalled: ((e: Event) => any) | null;
		onbeforeinstallprompt: ((e: BeforeInstallPromptEvent) => any) | null;
	}
	export interface WindowEventMap {
		"appinstalled": Event;
		"beforeinstallprompt": BeforeInstallPromptEvent;
	}
	export interface BeforeInstallPromptEvent extends Event {
		readonly prompt: () => Promise<any>;
	}

	export type RequestDuplex = "half" | "";
	export interface RequestInit {
		duplex?: RequestDuplex | nul;
	}

	export interface Collection<E> extends Iterable<E> {
		readonly [Symbol.iterator]: () => IterableIterator<E>;
		readonly length: number;
	}
	export interface ListLike<E> extends Collection<E>, Record<number, E> {
		readonly length: number;
	}
	export interface List<E> extends ListLike<E>, Array<E> {
		readonly [Symbol.iterator]: () => IterableIterator<E>;
		readonly length: number;
	}

	export interface AbstractStorage {
		readonly length: number;
		readonly clear: () => void;
		readonly getItem: (key: string) => string | null;
		readonly setItem: (key: string, value: string) => void;
		readonly removeItem: (key: string) => void;
	}

	export interface Logger {
		readonly l: string;
		readonly $: (...args: any[]) => void;
		readonly _: (context: { console: Console }, data: string) => void;
	}

	export interface YTService {
		readonly id: number;
		readonly url: string;
		readonly name: string;
		readonly sorts: YTFilterGroup[];
		readonly filters: YTFilterGroup[];
	}
	export interface YTUploader {
		readonly url: string;
		readonly name: string;
		readonly avatar: string;
	}
	export interface YTFilterItem {
		readonly id: number;
		readonly name: string;
	}
	export interface YTFilterGroup {
		readonly id: number;
		readonly name: string;
		readonly items: YTFilterItem[];
		readonly single: boolean;
	}

	export interface MessageFile {
		readonly name: string;
		readonly type: string;
		readonly url: string;
	}
	export interface Message {
		readonly id: string;
		readonly msg: string;
		readonly uid?: string | nul;
		readonly vip?: number | nul;
		readonly user: string;
		readonly icon: string;
		readonly files: MessageFile[];
	}

	export interface GPTMessage {
		role: "a" | "u";
		text: string;
	}
	export interface GPTChat {
		readonly title: string;
		readonly msgs: GPTMessage[];
	}

	export interface UserInfo {
		readonly id: string;
		readonly uid: string;
		readonly bio: string | null;
		readonly vip: number | null;
		readonly icon: string;
	}
	export interface FriendInfo extends UserInfo {
		state: number;
	}

	export type NotifInfo = RawTextNotif | MessageNotif | MentionNotif | MentionCNotif | AddFriendNotif;
	export type NotifList = List<NotifInfo>;

	export const enum NotifType {
		rawtext = 0,
		message = 1,
		mention = 2,
		mentionc = 3,
		addfriend = 4
	}

	export interface NotifBase {
		readonly type: NotifType;
		readonly date: number;
	}
	export interface NotifUser extends NotifBase {
		readonly user: string;
		readonly fuid: string;
	}

	export interface RawTextNotif extends NotifBase {
		readonly type: NotifType.rawtext;
		readonly text: string;
	}
	export interface MessageNotif extends NotifUser {
		readonly type: NotifType.message;
	}
	export interface MentionNotif extends NotifUser {
		readonly type: NotifType.mention;
		readonly chId: string;
	}
	export interface MentionCNotif extends NotifUser {
		readonly type: NotifType.mentionc;
		readonly game: number;
	}
	export interface AddFriendNotif extends NotifUser {
		readonly type: NotifType.addfriend;
	}

	export const enum SIOPath {
		noop = 255,

		// basic account operations
		login = 0,
		login2 = 10,
		register = 11,
		verifyemail = 17,
		verifyemail2 = 18,
		revokesecrets = 43,
		resetpassword = 21,
		resetpassword2 = 76,
		enabletwofactor = 44,
		verifytwofactor = 45,
		disabletwofactor = 46,
		userinfo = 1,
		userdata = 2,
		changeid = 3,
		changebio = 55,
		changename = 20,
		changeemail = 19,
		changeavatar = 4,
		changePassword = 9,

		// chat operations
		addfriend = 24,
		delfriend = 25,
		getfriends = 26,
		getchannels = 27,
		getcomments = 58,
		postcomment = 59,
		editcomment = 61,
		getmessages = 28,
		postmessage = 8,
		editmessage = 62,
		newdmchannel = 69,
		deldmchannel = 79,
		newgroupchat = 68,
		getgroupinfo = 73,
		getgroupusers = 72,
		kickgroupuser = 75,
		joingroupchat = 70,
		leavegroupchat = 71,
		changegroupname = 74,
		postFileMessage = 12,
		requestmessages = 7,
		requestchannels = 22,
		getnotifications = 60,
		clearnotifications = 81,

		// shop operations
		store = 48,
		addproduct = 49,
		getBOrders = 50,
		getSOrders = 51,
		cancelorder = 52,
		confirmorder = 53,
		updatepayment = 54,

		// ytproxy
		ytsearch = 40,
		ytstream = 63,
		ytchannel = 67,
		ytplaylist = 66,
		yttrending = 65,
		ytservices = 78,

		// misc operations
		like = 57,
		likes = 77,
		tunnel = 41,
		articles = 47,
		gamelist = 80,
		gameinfo = 56,
		uploadgame = 13,
		uploadgame2 = 64,
		editgameinfo = 23
	}

	export const enum Constants {
		domain = "nettleweb.com",
		origin = "https://" + domain,
		rootI = origin + "/index.svg",
		root = origin + "/"
	}

	export interface GameInfo {
		readonly name: string;
		readonly type: "html5" | "flash" | "dos";
		readonly tags: string;
		readonly desc: string;
		readonly date: number;
		readonly file: string;
		readonly user?: string | nul;

		count?: number | nul;
	}
	export interface GameList extends List<GameInfo> {
	}
}

export { };