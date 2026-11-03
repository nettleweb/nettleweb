import { WasmModule } from "../../../impl/modules";
import { TransportLayer, Net } from "../../../protocol/protocol";
import "../../../sockdrive/sockdrive";
export declare function dosDirect(wasmModule: WasmModule, sessionId: string, canvas?: OffscreenCanvas, audioWorklet?: boolean, net?: Net): Promise<TransportLayer>;
