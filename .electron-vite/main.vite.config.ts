import { join } from "path";
import { defineConfig } from "vite";
import { builtinModules } from "module";
import config from "project/config";
export default defineConfig({
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
            external: ["electron", ...config.INTRODUCTION, ...builtinModules],
        },
        watch: {},
    },
    publicDir: join(__dirname, "../electron/resources"),
});
