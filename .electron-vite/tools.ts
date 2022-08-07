import { join } from "path";
export type config_file_name = "main.vite.config" | "preload.vite.config" | "renderer.vite.config";
export function get_vite_config_path(config_file_name: config_file_name) {
    return join(__dirname, `${config_file_name}.${/(ts)/g.test(__filename) ? "ts" : "js"}`);
}

export function antiShake(fn: (...args: any[]) => any, delay: number = 300): (...args: any[]) => any {
    let timer: undefined | NodeJS.Timeout;
    return function (this: unknown, ...args: any[]) {
        if (timer !== undefined) return;

        fn.apply(this, args);

        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = undefined;
        }, delay);
    };
}
