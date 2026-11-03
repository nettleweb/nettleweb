export interface WasmModule {
    instantiate: (module?: any) => Promise<any>;
}
export interface IWasmModules {
    libzip: () => Promise<WasmModule>;
    dosbox: () => Promise<WasmModule>;
    dosboxx: () => Promise<WasmModule>;
    dosboxxJspi: () => Promise<WasmModule>;
    dosboxxDebug: () => Promise<WasmModule>;
}
interface Globals {
    exports: {
        [moduleName: string]: any;
    };
    module: {
        exports?: () => void;
    };
    compiled: {
        [moduleName: string]: Promise<WasmModule>;
    };
}
declare class Host {
    wasmSupported: boolean;
    globals: Globals;
    constructor();
}
export declare const host: Host;
export declare class WasmModulesImpl implements IWasmModules {
    private pathPrefix;
    private pathSuffix;
    private wdosboxJs;
    private wdosboxxJs;
    private wdosboxxJsJspi;
    private wdosboxxJsDebug;
    private libzipPromise?;
    private dosboxPromise?;
    private dosboxxPromise?;
    private dosboxxJspiPromise?;
    private dosboxxDebugPromise?;
    wasmSupported: boolean;
    constructor(pathPrefix: string, pathSuffix: string, wdosboxJs: string, wdosboxxJs: string, wdosboxxJsJspi: string, wdosboxxJsDebug: string);
    libzip(): Promise<WasmModule>;
    dosbox(): Promise<WasmModule>;
    dosboxx(): Promise<WasmModule>;
    dosboxxJspi(): Promise<WasmModule>;
    dosboxxDebug(): Promise<WasmModule>;
    private loadModule;
}
export declare function loadWasmModule(url: string, moduleName: string, onprogress: (stage: string, total: number, loaded: number) => void): Promise<WasmModule>;
export {};
