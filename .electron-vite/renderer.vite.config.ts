import { join } from 'path';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import config from '../config'
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	root: join(__dirname, '..'),
	mode: process.env.NODE_ENV,
	base: './',
	build: {
		outDir: join(__dirname, '../dist'),
		emptyOutDir: true,
		target: 'esnext',
		minify: 'esbuild'
	},
	server: {
		host: config.HOST,
		port: config.PROT,
	}
})
