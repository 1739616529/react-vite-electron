import { ipcRenderer, contextBridge } from "electron";
import config from "project/config";
function use_context_bridge() {
    if (config?.WEBVIEW_NODE)
        return;
    contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);
    // ... contextBridge.exposeInMainWorld("xxx", xxx);
}
use_context_bridge();
