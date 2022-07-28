import { pathExistsSync, readdirSync } from "fs-extra";
import { join } from "path";
import { cd, exec, which, rm, mv } from "shelljs";
const vanilla_path = join(__dirname, "../vanilla");
cd(process.cwd());
function tsc_compiler() {
    if (!which("tsc")) exec("npm i -g typescript");
    if (pathExistsSync(vanilla_path)) rm("-rf", vanilla_path);
    exec("tsc");
}
function change_breach() {
    if (!pathExistsSync(vanilla_path)) throw new Error("没有 vanilla 文件夹");
    exec("git checkout vanilla");
}
function copy_js() {
    const dir_list = readdirSync(vanilla_path);
    dir_list.forEach((v) => {
        if (v === "src") return;
        rm("-rf", v);
        mv(`${vanilla_path}/${v}`, v);
    });
}
tsc_compiler();
change_breach();
copy_js();
