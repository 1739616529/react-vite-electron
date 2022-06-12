import WinDispatch from "main/lib/window";

export function use_home_win() {
    const { is_exist, win } = WinDispatch.createWin("home")();

    if (is_exist) return;

    win.loadURL(WinDispatch.get_loadUrl());
    win.webContents.openDevTools();
}