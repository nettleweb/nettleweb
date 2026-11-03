import { CommandInterface, NetworkType, BackendOptions, DosConfig, InitFsEntry } from "../emulators";
import { CommandInterfaceEventsImpl } from "../impl/ci-impl";
type Peer = {
    peerId: number;
};
export type Net = {
    peerId: number;
    connected: Set<number>;
    wait: (ms: number) => void;
    registerAlias: (alias: string) => Promise<void>;
    unregisterAlias: (alias: string) => void;
    queryAliases: (query: string) => Promise<Peer[]>;
    sendBinary: (data: Uint8Array, peerId: number) => number;
    recvBinary: () => {
        data: Uint8Array;
        peerId: number;
    } | null;
    disconnect: (peerId: number) => void;
};
export type ClientMessage = "wc-install" | "wc-run" | "wc-pack-fs-to-bundle" | "wc-add-key" | "wc-mouse-move" | "wc-mouse-button" | "wc-mouse-sync" | "wc-exit" | "wc-sync-sleep" | "wc-pause" | "wc-resume" | "wc-mute" | "wc-unmute" | "wc-connect" | "wc-disconnect" | "wc-backend-event" | "wc-asyncify-stats" | "wc-fs-tree" | "wc-fs-get-file" | "wc-send-data-chunk" | "wc-net-connected" | "wc-net-received" | "wc-unload" | "wc-fs-delete-file" | "wc-persist-sockdrives" | "wc-get-running-program";
export type ServerMessage = "ws-extract-progress" | "ws-ready" | "ws-server-ready" | "ws-frame-set-size" | "ws-update-lines" | "ws-log" | "ws-warn" | "ws-err" | "ws-stdout" | "ws-exit" | "ws-persist" | "ws-sound-init" | "ws-sound-push" | "ws-config" | "ws-sync-sleep" | "ws-connected" | "ws-disconnected" | "ws-asyncify-stats" | "ws-fs-tree" | "ws-send-data-chunk" | "ws-net-disconnect" | "ws-net-send" | "ws-unload" | "ws-fs-delete-file" | "ws-persist-sockdrives" | "ws-get-running-program";
export type MessageHandler = (name: ServerMessage, props: {
    [key: string]: any;
}) => void;
export interface TransportLayer {
    sessionId: string;
    sendMessageToServer(name: ClientMessage, props: {
        [key: string]: any;
    }, transfer?: Transferable[]): void;
    initMessageHandler(handler: MessageHandler): void;
    exit?: () => void;
    net: Net | null;
}
export interface FrameLine {
    start: number;
    heapu8: Uint8Array;
}
export interface DataChunk {
    type: "ok" | "file" | "bundle";
    name: string;
    data: ArrayBuffer | null;
}
export interface CPUMetrics {
    cpuMax: number;
    emulatorSpeed: number;
    cpuUsed: number;
    frameSkip: number;
    fastForward: boolean;
    cpuSockdrive: boolean;
    cpuAuto: boolean;
    cpuSkip: boolean;
    sleepPattern: string;
    ratio: number[];
    newCmax: number[];
    ticksDone: number[];
    ticksScheduled: number[];
}
export interface AsyncifyStats {
    glfx?: boolean;
    offscreenCanvas?: boolean;
    messageSent: number;
    messageReceived: number;
    messageFrame: number;
    messageSound: number;
    nonSkippableSleepCount: number;
    sleepCount: number;
    sleepTime: number;
    cpuMetrics: CPUMetrics | null;
    netSent: number;
    netRecv: number;
    driveIo: {
        url: string;
        preload: number;
        total: number;
        read: number;
        write: number;
    }[];
}
export interface FsNode {
    name: string;
    size: number | null;
    nodes: FsNode[] | null;
}
export declare class CommandInterfaceOverTransportLayer implements CommandInterface {
    private startedAt;
    private exited;
    private frameWidth;
    private frameHeight;
    private rgb;
    private rgba;
    private freq;
    private utf8Decoder;
    private init?;
    private transport;
    private ready;
    private persistPromise?;
    private persistResolve?;
    private exitPromise?;
    private exitResolve?;
    private eventsImpl;
    private keyMatrix;
    private configPromise;
    private configResolve;
    private panicMessages;
    private connectPromise;
    private connectResolve;
    private connectReject;
    private disconnectPromise;
    private disconnectResolve;
    private asyncifyStatsPromise;
    private asyncifyStatsResolve;
    private fsTreePromise;
    private fsTreeResolve;
    private fsGetFilePromise;
    private fsGetFileResolve;
    private fsGetFileParts;
    private fsDeleteFilePromise;
    private fsDeleteFileResolve;
    private getRunningProgramPromise;
    private getRunningProgramResolve;
    private dataChunkPromise;
    private dataChunkResolve;
    private persistSockdrivesPromise;
    private persistSockdrivesResolve;
    private myPeerId;
    private netSent;
    private netRecv;
    private netPollInterval;
    options: BackendOptions;
    constructor(init: InitFsEntry[], transport: TransportLayer, ready: (err: Error | null) => void, options: BackendOptions);
    private sendClientMessage;
    private onServerMessage;
    private onConfig;
    private onFrameSize;
    private onFrameLines;
    private onSoundInit;
    private onSoundPush;
    private onLog;
    private onWarn;
    private onErr;
    private onStdout;
    config(): Promise<DosConfig>;
    width(): number;
    height(): number;
    soundFrequency(): number;
    screenshot(): Promise<ImageData>;
    simulateKeyPress(...keyCodes: number[]): void;
    sendKeyEvent(keyCode: number, pressed: boolean): void;
    addKey(keyCode: number, pressed: boolean, timeMs: number): void;
    sendMouseMotion(x: number, y: number): void;
    sendMouseRelativeMotion(x: number, y: number): void;
    sendMouseButton(button: number, pressed: boolean): void;
    sendMouseSync(): void;
    sendBackendEvent(payload: any): void;
    persist(optOnlyChanges?: boolean): Promise<Uint8Array | null>;
    private onPersist;
    pause(): void;
    resume(): void;
    mute(): void;
    unmute(): void;
    exit(): Promise<void>;
    private onExit;
    events(): CommandInterfaceEventsImpl;
    networkConnect(networkType: NetworkType, address: string): Promise<void>;
    networkDisconnect(networkType: NetworkType): Promise<void>;
    asyncifyStats(): Promise<AsyncifyStats>;
    fsTree(): Promise<FsNode>;
    fsReadFile(file: string): Promise<Uint8Array>;
    fsWriteFile(file: string, contents: ReadableStream<Uint8Array> | Uint8Array): Promise<void>;
    fsDeleteFile(file: string): Promise<boolean>;
    persistSockdrives(): Promise<Uint8Array | null>;
    private sendDataChunk;
    private sendFullDataChunk;
    private dataChunkKey;
    private mergeChunks;
    net(): Net | null;
    getRunningProgram(): Promise<string>;
}
export {};
