import { join } from "path";
import { UserConfigFn, UserConfig } from "vite";
import { builtinModules } from "module";
import { watch, def_external } from "./config";
export default <UserConfigFn>function ({mode}) {

    const _config: UserConfig = {
        root: __dirname,
        resolve: {
            alias: {
                project: join(__dirname, "../"),
                main: join(__dirname, "../electron/main"),
            },
        },
        build: {
            outDir: "../dist/main",
            emptyOutDir: true,
            minify: process.env.NODE_ENV === "production",
            sourcemap: process.env.NODE_ENV === "development",
            lib: {
                entry: join(__dirname, "../electron/main/index"),
                formats: ["cjs"],
                fileName: () => "[name].js",
            },
            rollupOptions: {
                external: [ ...def_external ],
            },
        },
        publicDir: join(__dirname, "../electron/resources"),
    }

    if (mode === "development") _config.build!["watch"] = watch || {}

    return _config
}
