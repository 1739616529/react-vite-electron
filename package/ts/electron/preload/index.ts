import { ipcRenderer, contextBridge } from "electron";
import { WEBVIEW_NODE } from "project/config";

if (WEBVIEW_NODE === false || WEBVIEW_NODE === void 0) {
    contextBridge.exposeInMainWorld("ipcRenderer", ipcRenderer);
}
