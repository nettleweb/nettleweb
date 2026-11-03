import { WasmModule } from "../../../impl/modules";
import { TransportLayer, Net } from "../../../protocol/protocol";
export declare function dosWorker(workerUrl: string, wasmModule: WasmModule, sessionId: string, canvas?: OffscreenCanvas, audioWorklet?: boolean, net?: Net): Promise<TransportLayer>;
