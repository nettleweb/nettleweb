export interface Store {
    keys: () => Promise<number[]>;
    put: (key: number, data: Uint8Array) => Promise<void>;
    getSync: (key: number) => Uint8Array | null;
    getAsync: (key: number) => Promise<Uint8Array | null>;
}
export declare class NoStore implements Store {
    store: Map<number, Uint8Array>;
    put(key: number, data: Uint8Array): Promise<void>;
    getSync(key: number): Uint8Array | null;
    getAsync(_: number): Promise<Uint8Array | null>;
    keys(): Promise<number[]>;
}
export declare class OpfsStore implements Store {
    private dir;
    private index;
    private syncMode;
    private blockHandle;
    private metaHandle;
    private blockSize;
    private metaSize;
    private blockLength;
    private metaEntry;
    private asyncOpPromise;
    private constructor();
    static create(url: string, blockLength: number, opfsRoot: string): Promise<OpfsStore>;
    private init;
    private loadIndex;
    keys(): Promise<number[]>;
    put(key: number, data: Uint8Array): Promise<void>;
    getSync(key: number): Uint8Array | null;
    getAsync(key: number): Promise<Uint8Array | null>;
}
export declare function getStore(url: string, blockLength: number, opfsRoot: string): Promise<Store>;
export declare function readUint32(container: Uint8Array, offset: number): number;
export declare function writeUint32(container: Uint8Array, value: number, offset: number): number;
