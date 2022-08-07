import { app, BrowserWindow } from "electron";
import { join } from "path";
import config from "project/config";
export class WinDispatch {
    _wins = {};
    get wins() {
        return this._wins;
    }
    //  默认配置
    _def_option = {
        width: 800,
        height: 600,
        webPreferences: {
            preload: join(__dirname, "../preload/index.js"),
        },
    };
    getWin(win_name) {
        return this._wins[win_name];
    }
    createWin(win_name) {
        return (option = {}) => {
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
    getLoadUrl(path = "") {
        const url = app.isPackaged ? `file:///${join(__dirname, "../index.html")}` : `http://${config.HOST}:${config.PROT}`;
        return `${url}#/${path}`;
    }
    formatWinOption(option) {
        return {
            ...this._def_option,
            ...option,
            webPreferences: { ...this._def_option.webPreferences, ...option.webPreferences },
        };
    }
}
export default new WinDispatch();
