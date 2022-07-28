import { join } from "path";
import { defineConfig, BuildOptions } from "vite";
import { builtinModules } from "module";

export default {
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
            external: ["electron", ...builtinModules],
        },
        watch: {},
    },
    publicDir: join(__dirname, "../electron/resources"),
} as BuildOptions;
