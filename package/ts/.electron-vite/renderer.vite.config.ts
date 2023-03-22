import { join } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import config from "../config";
import { def_external } from "./tools";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    root: join(__dirname, ".."),
    mode: process.env.NODE_ENV,
    resolve: {
        alias: {
            src: join(__dirname, "../src"),
        },
    },
    base: "./",
    build: {
        outDir: join(__dirname, "../dist"),
        emptyOutDir: true,
        target: "esnext",
        minify: "esbuild",
        rollupOptions: {
            external: [ ...def_external ],
        },
    },
    server: {
        host: config.HOST,
        port: config.PROT,
    },
});
