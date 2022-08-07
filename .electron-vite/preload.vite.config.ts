import { defineConfig } from "vite";
import { join } from "path";
import { builtinModules } from "module";
export default defineConfig({
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
            external: ["electron", ...builtinModules],
        },
    },
});
