const fs = require("fs-extra");
const path = require("path");

const vanilla_path = path.join(__dirname, "../vanilla");
const js_path = path.join(__dirname, "../package/js");
const ts_path = path.join(__dirname, "../package/ts");
const ditc_vanilla_files = _reduce_to_ditc(fs.readdirSync(vanilla_path, {withFileTypes: true}));
const ditc_js_files = _reduce_to_ditc(fs.readdirSync(js_path, {withFileTypes: true}));
const ditc_ts_files = _reduce_to_ditc(fs.readdirSync(ts_path, {withFileTypes: true}));
const ditc_ignore_files = {
    "node_modules": "node_modules",
    ".eslintrc.js": ".eslintrc.js",
    "tsconfig.json": "tsconfig.json",
    "index.html": "index.html",
    "README.MD": "README.MD",
    "dist": "dist",
    "src": "src",
    "types": "types",
}
function _reduce_to_ditc(arr) {
    return arr.reduce((r, v) => {
        r[v.name] = v
        return r
    }, {})
}

Object.keys(ditc_ts_files).forEach(v => {
    // 如果是要忽略的 文件夹
    if (v in ditc_ignore_files) return 
    let copy_file_path = path.join(ts_path, v)
    const copt_to_file_path = path.join(js_path, v)
    if (v in ditc_vanilla_files) copy_file_path = path.join(vanilla_path, v)
    fs.copySync(copy_file_path, copt_to_file_path)
})
