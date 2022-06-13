import { ipcMain } from "electron";
import WinDispatch from "main/lib/window";

export function use_home_win() {
    const { is_exist, win } = WinDispatch.createWin( "home" )();

    if ( is_exist ) return;

    win.loadURL( WinDispatch.get_loadUrl() );
    win.webContents.openDevTools();
    ipcMain.on( "test", ( e: Event, data: string ) => {
        console.log( "this is renderer send msg data is: ", data );
    } );
}