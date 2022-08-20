process.env.NODE_ENV = "development";
import { resolve } from "path";
import { build, createServer } from "vite";
import { spawn } from "child_process";
import electron from "electron";
import { get_vite_config_path, antiShake } from "./tools";
import { watch } from "fs-extra";
import { main } from "../package.json";
let electron_process;
let argvs = [];
async function use_watch_main() {
    await build({
        configFile: get_vite_config_path("main.vite.config"),
        mode: process.env.NODE_ENV,
    });
}
async function use_watch_preload() {
    await build({
        configFile: get_vite_config_path("preload.vite.config"),
        mode: process.env.NODE_ENV,
    });
}
async function use_watch_renderer() {
    const rednerer = await createServer({
        configFile: get_vite_config_path("renderer.vite.config"),
    });
    await rednerer.listen();
}
function use_electron_process() {
    electron_process?.kill("SIGINT");
    electron_process = spawn(electron, use_argvs());
    electron_process.stdout?.pipe(process.stdout);
    electron_process.stderr?.pipe(process.stderr);
    electron_process.on("exit", (code, sig) => {
        if (sig === "SIGINT")
            return;
        process.exit(0);
    });
}
function use_argvs() {
    if (argvs.length)
        return argvs;
    argvs = [
        // `--inspect=${config.INSPECT_PORT}`,
        resolve(main),
    ];
    argvs = argvs.concat(process.argv.slice(2));
    return argvs;
}
function use_process_event() {
    process.on("SIGINT", () => {
        process.exit();
    });
    process.on("exit", () => {
        electron_process?.kill();
    });
}
function use_electron_file_watch() {
    const file_change = antiShake(async (event, filename) => {
        if (event === "change") {
            console.log(`change file:----->     ${filename}`);
            await Promise.all([use_watch_main(), use_watch_preload()]);
            use_electron_process();
        }
    });
    watch(resolve("electron/main"), { recursive: true }, file_change);
    watch(resolve("electron/preload"), { recursive: true }, file_change);
}
async function start() {
    await Promise.all([use_watch_main(), use_watch_preload(), use_watch_renderer()]);
    use_electron_process();
    use_electron_file_watch();
    use_process_event();
}
start();
