process.env.NODE_ENV = "production";
import { build } from "vite";
import { get_vite_config_path } from "./tools";
async function use_main_build() {
    return new Promise(async (resolve) => {
        const watch = (await build({
            configFile: get_vite_config_path("main.vite.config"),
        }));
        watch.on("event", (data) => {
            if (data.code === "END") {
                watch.close();
                resolve(0);
            }
        });
    });
}
async function use_renderer_build() {
    await build({ configFile: get_vite_config_path("renderer.vite.config") });
}
async function use_preload_build() {
    return new Promise(async (resolve) => {
        const watch = (await build({ configFile: get_vite_config_path("preload.vite.config") }));
        watch.on("event", (data) => {
            if (data.code === "END") {
                watch.close();
                resolve(0);
            }
        });
    });
}
async function start() {
    await use_renderer_build();
    await use_main_build();
    await use_preload_build();
    process.exit(0);
}
start();
