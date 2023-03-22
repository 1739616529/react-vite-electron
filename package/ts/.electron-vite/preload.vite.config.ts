import { UserConfig, UserConfigFn } from "vite";
import { join } from "path";
import { watch, def_external } from "./config";
export default <UserConfigFn>function({mode}){

    const _config: UserConfig = {
        root: __dirname,
        resolve: {
            alias: {
                project: join(__dirname, "../"),
            },
        },
        build: {
            outDir: "../dist/preload",
            emptyOutDir: true,
            minify: process.env.NODE_ENV === "production",
            lib: {
                entry: join(__dirname, "../electron/preload/index"),
                formats: ["cjs"],
                fileName: () => "[name].js",
            },
            rollupOptions: {
                external: [ ...def_external ],
            },
        },
    }

    if (mode === "development") _config.build!["watch"] = watch || {}

    return _config
};
