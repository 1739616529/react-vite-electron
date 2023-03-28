process.env.NODE_ENV = "development";
import { resolve } from "path";
import { build, createServer } from "vite";
import { spawn } from "child_process";
import electron from "electron";
import { get_vite_config_path } from "./tools";
import { main } from "../package.json";
function main_file_change(event, init = 1) {
    event.on("event", (e) => {
        if (e.code !== "BUNDLE_END")
            return;
        if (init) {
            init--;
            return;
        }
        use_electron_process();
    });
}
async function use_watch_main() {
    const event = await build({
        configFile: get_vite_config_path("main.vite.config"),
        mode: process.env.NODE_ENV,
    });
    main_file_change(event);
}
async function use_watch_preload() {
    const event = await build({
        configFile: get_vite_config_path("preload.vite.config"),
        mode: process.env.NODE_ENV,
    });
    main_file_change(event);
}
async function use_watch_renderer() {
    const rednerer = await createServer({
        configFile: get_vite_config_path("renderer.vite.config"),
    });
    await rednerer.listen();
}
const use_electron_process = (() => {
    let electron_process;
    return function () {
        electron_process?.kill("SIGINT");
        electron_process = spawn(electron, use_argvs());
        electron_process.stdout?.pipe(process.stdout);
        electron_process.stderr?.pipe(process.stderr);
        electron_process.on("exit", (code, sig) => {
            if (sig === "SIGINT")
                return;
            process.exit(0);
        });
    };
})();
const use_argvs = (() => {
    let argvs = [];
    return function () {
        if (argvs.length)
            return argvs;
        argvs = [
            // `--inspect=${config.INSPECT_PORT}`,
            resolve(main),
        ];
        argvs = argvs.concat(process.argv.slice(2));
        return argvs;
    };
})();
async function start() {
    await Promise.all([use_watch_main(), use_watch_preload(), use_watch_renderer()]);
    use_electron_process();
}
start();
