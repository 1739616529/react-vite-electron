import { ipcMain } from "electron";
import WinDispatch from "main/lib/window";

export function use_home_win() {
    const win_name = "home";
    // 如果有 就 return
    if (WinDispatch.getWin(win_name)) return;
    const { is_exist, win } = WinDispatch.createWin(win_name)({ title: "真的吗哈哈" });

    if (is_exist) return;

    win.loadURL(WinDispatch.getLoadUrl());
    win.webContents.openDevTools();
}
