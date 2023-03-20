import { app, BrowserWindow, BrowserWindowConstructorOptions } from "electron";
import { join } from "path";
import config from "project/config";
/** 添加新窗口要在这里添加 窗口 标识 */

export type Wins = {
    home?: BrowserWindow;
    view?: BrowserWindow;
};

export class WinDispatch {
    private _wins: Wins = {};

    public get wins() {
        return this._wins;
    }

    //  默认配置
    private _def_option: BrowserWindowConstructorOptions = {
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, "../preload/index.js"),
        },
    };

    public getWin(win_name: keyof Wins) {
        return this._wins[win_name];
    }

    public createWin(win_name: keyof Wins) {
        return (option: BrowserWindowConstructorOptions = {}) => {
            let is_exist = true;
            let win = this._wins[win_name];

            if (win === undefined) {
                is_exist = false;
                win = new BrowserWindow(this.formatWinOption(option));
                win.on("closed", () => {
                    delete this._wins[win_name];
                });
            }

            this._wins[win_name] = win;
            return { win, is_exist };
        };
    }

    public getLoadUrl(path = ""): string {
        const url = app.isPackaged ? `file:///${join(__dirname, "../index.html")}` : `http://${config.HOST}:${config.PROT}`;

        return `${url}#/${path}`;
    }

    private formatWinOption<T extends BrowserWindowConstructorOptions>(option: T): T {
        return {
            ...this._def_option,
            ...option,
            webPreferences: { ...this._def_option.webPreferences, ...option.webPreferences },
        };
    }
}

export default new WinDispatch();
