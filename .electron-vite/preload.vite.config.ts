import { defineConfig } from "vite";
import { join } from 'path';
export default defineConfig({
	root: __dirname,
	resolve: {
		alias: {
			project: join(__dirname, '../')
		}
	},
	build: {
		outDir: '../dist/preload',
		emptyOutDir: true,
		minify: process.env.NODE_ENV === 'production',
		sourcemap: true,
		lib: {
			entry: join(__dirname, '../electron/preload/index.ts'),
			formats: ['cjs'],
			fileName: () => '[name].js'
		},
	}
})