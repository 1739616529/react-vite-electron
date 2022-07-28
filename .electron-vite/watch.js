process.env.NODE_ENV = "development";
import { join } from "path";
import { build, createServer } from "vite";
import { spawn } from "child_process";
import electron from "electron";
import { get_vite_config_path } from "./tools";
let electron_process;
let argvs = [];
async function use_watch_main() {
    const watch = (await build({
        configFile: get_vite_config_path("main.vite.config"),
        mode: process.env.NODE_ENV,
    }));
    watch.on("change", (data) => {
        console.log("update file: ", data);
        use_electron_process();
    });
}
async function use_watch_preload() {
    const watch = (await build({
        configFile: get_vite_config_path("preload.vite.config"),
        mode: process.env.NODE_ENV,
    }));
    watch.on("change", (data) => {
        console.log("update file: ", data);
        use_electron_process();
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
        join(__dirname, "../dist/main/index.js"),
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
async function start() {
    await use_watch_renderer();
    await use_watch_main();
    await use_watch_preload();
    use_electron_process();
    use_process_event();
}
start();
