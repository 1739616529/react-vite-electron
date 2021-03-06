
import { join } from 'path';
import { defineConfig } from 'vite';
import { builtinModules } from 'module'

export default defineConfig({
	root: __dirname,
	resolve: {
		alias: {
			project: join(__dirname, '../'),
			main: join(__dirname, '../electron/main')
		}
	},
	build: {
		outDir: '../dist/main',
		emptyOutDir: true,
		minify: process.env.NODE_ENV === 'production',
		sourcemap:  process.env.NODE_ENV === 'development',
		lib: {
			entry: join(__dirname, '../electron/main/index.ts'),
			formats: ['cjs'],
			fileName: () => '[name].js'
		},
		rollupOptions: {
			external: ['electron', ...builtinModules]
		},
		watch: {}
	},
	publicDir:join(__dirname,'../electron/resources')
});