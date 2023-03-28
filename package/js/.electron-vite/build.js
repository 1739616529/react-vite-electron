process.env.NODE_ENV = "production";
import { build } from "vite";
import { get_vite_config_path } from "./tools";
function use_main_build() {
    return build({ configFile: get_vite_config_path("main.vite.config") });
}
async function use_renderer_build() {
    await build({ configFile: get_vite_config_path("renderer.vite.config") });
}
function use_preload_build() {
    return build({ configFile: get_vite_config_path("preload.vite.config") });
}
async function start() {
    await use_renderer_build();
    await use_main_build();
    await use_preload_build();
    process.exit(0);
}
start();
