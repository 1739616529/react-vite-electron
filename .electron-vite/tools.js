import { join } from "path";
export function get_vite_config_path(config_file_name) {
    return join(__dirname, `${config_file_name}.${/(ts)/g.test(__filename) ? "ts" : "js"}`);
}
export function antiShake(fn, delay = 300) {
    let timer;
    return function (...args) {
        if (timer !== undefined)
            return;
        fn.apply(this, args);
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = undefined;
        }, delay);
    };
}
