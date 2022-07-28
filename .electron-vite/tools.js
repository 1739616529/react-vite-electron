import { join } from "path";
export function get_vite_config_path(config_file_name) {
    return join(__dirname, `${config_file_name}.${/(ts)/g.test(__filename) ? "ts" : "js"}`);
}
