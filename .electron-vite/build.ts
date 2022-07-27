process.env.NODE_ENV = "production";

import { build } from "vite";
import main_vite_config from "./main.vite.config";
import preload_vite_config from "./preload.vite.config";
import renderer_vite_config from "./renderer.vite.config";
import type { RollupWatcher } from "rollup";

async function use_main_build() {
    return new Promise(async (resolve) => {
        const watch = (await build({
            build: main_vite_config,
        })) as RollupWatcher;
        watch.on("event", (data) => {
            if (data.code === "END") {
                watch.close();
                resolve(0);
            }
        });
    });
}

async function use_renderer_build() {
    await build({ build: renderer_vite_config });
}

async function use_preload_build() {
    return new Promise(async (resolve) => {
        const watch = (await build({ build: preload_vite_config })) as RollupWatcher;
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
