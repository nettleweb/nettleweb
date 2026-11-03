import DosBundle from "./dos/bundle/dos-bundle";
import { AsyncifyStats, TransportLayer, FsNode, Net } from "./protocol/protocol";
export interface DosConfig {
    dosboxConf: string;
    jsdosConf: {
        version: string;
    };
}
export declare enum NetworkType {
    NETWORK_DOSBOX_IPX = 0
}
export interface BackendOptions {
    token?: string | undefined;
    onExtractProgress?: (bundleIndex: number, file: string, extracted: number, total: number) => void;
    canvas?: OffscreenCanvas;
    audioWorklet?: boolean;
    sockdrivePreload?: "all" | "default" | "none";
    sockdriveOpfsRoot?: string;
    mcpServerPort?: number;
    net?: Net;
}
export type InitBundleEntry = Uint8Array;
export interface InitFileEntry {
    path: string;
    contents: Uint8Array;
}
export type InitFsEntry = InitBundleEntry | InitFileEntry | DosConfig | string;
export type InitFs = InitFsEntry | InitFsEntry[];
export interface Emulators {
    pathPrefix: string;
    pathSuffix: string;
    version: string;
    wdosboxJs: string;
    bundle: () => Promise<DosBundle>;
    bundleConfig: (bundle: InitBundleEntry) => Promise<DosConfig | null>;
    bundleUpdateConfig: (bundle: InitBundleEntry, config: DosConfig) => Promise<Uint8Array>;
    dosboxNode: (init: InitFs, options?: BackendOptions) => Promise<CommandInterface>;
    dosboxDirect: (init: InitFs, options?: BackendOptions) => Promise<CommandInterface>;
    dosboxWorker: (init: InitFs, options?: BackendOptions) => Promise<CommandInterface>;
    dosboxXNode: (init: InitFs, options?: BackendOptions) => Promise<CommandInterface>;
    dosboxXDirect: (init: InitFs, options?: BackendOptions) => Promise<CommandInterface>;
    dosboxXJspiDirect: (init: InitFs, options?: BackendOptions) => Promise<CommandInterface>;
    dosboxXWorker: (init: InitFs, options?: BackendOptions) => Promise<CommandInterface>;
    dosboxXJspiWorker: (init: InitFs, options?: BackendOptions) => Promise<CommandInterface>;
    dosboxXDebugWorker: (init: InitFs, options?: BackendOptions) => Promise<CommandInterface>;
    backend: (init: InitFs, transportLayer: TransportLayer, options?: BackendOptions) => Promise<CommandInterface>;
}
export interface CommandInterface {
    config: () => Promise<DosConfig>;
    height: () => number;
    width: () => number;
    soundFrequency: () => number;
    screenshot: () => Promise<ImageData>;
    pause: () => void;
    resume: () => void;
    mute: () => void;
    unmute: () => void;
    exit: () => Promise<void>;
    simulateKeyPress: (...keyCodes: number[]) => void;
    sendKeyEvent: (keyCode: number, pressed: boolean) => void;
    sendMouseMotion: (x: number, y: number) => void;
    sendMouseRelativeMotion: (x: number, y: number) => void;
    sendMouseButton: (button: number, pressed: boolean) => void;
    sendMouseSync: () => void;
    sendBackendEvent: (event: any) => void;
    persist(onlyChanges?: boolean): Promise<Uint8Array | null>;
    events(): CommandInterfaceEvents;
    net(): Net | null;
    networkConnect(networkType: NetworkType, address: string): Promise<void>;
    networkDisconnect(networkType: NetworkType): Promise<void>;
    asyncifyStats(): Promise<AsyncifyStats>;
    fsTree(): Promise<FsNode>;
    fsReadFile(file: string): Promise<Uint8Array>;
    fsWriteFile(file: string, contents: ReadableStream<Uint8Array> | Uint8Array): Promise<void>;
    fsDeleteFile(file: string): Promise<boolean>;
    getRunningProgram(): Promise<string>;
}
export type MessageType = "log" | "warn" | "error" | string;
export interface CommandInterfaceEvents {
    onStdout: (consumer: (message: string) => void) => void;
    onFrameSize: (consumer: (width: number, height: number) => void) => void;
    onFrame: (consumer: (rgb: Uint8Array | null, rgba: Uint8Array | null) => void) => void;
    onSoundPush: (consumer: (samples: Float32Array) => void) => void;
    onExit: (consumer: () => void) => void;
    onMessage: (consumer: (msgType: MessageType, ...args: any[]) => void) => void;
    onNetworkConnected: (consumer: (networkType: NetworkType, address: string) => void) => void;
    onNetworkDisconnected: (consumer: (networkType: NetworkType) => void) => void;
    onUnload: (consumer: () => Promise<void>) => void;
}
