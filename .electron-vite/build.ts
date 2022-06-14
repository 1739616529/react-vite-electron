process.env.NODE_ENV = 'production';


import { join } from 'path';
import { build } from 'vite';
import { build as esbuild_build, BuildFailure } from 'esbuild'
import main_build_config, { watch } from './main.build.config'
import type { RollupWatcher } from 'rollup'

async function use_main_build() {
	return new Promise(async resolve => {
		esbuild_build(main_build_config(process.env.NODE_ENV)).then(resolve)
		// watch((err, ret) => {
		// 	if(err) throw err
		// 	console.log('ret', ret?.outputFiles,ret?.metafile)
		// })
		
		// watch.on('event', (data) => {
		// 	if (data.code === 'END') {
		// 		watch.close()
		// 		resolve(0)
		// 	}
		// })
	})
}

async function use_renderer_build() {
	await build({ configFile: join(__dirname, "./renderer.vite.config.ts") })
}

async function use_preload_build() {
	await build({ configFile: join(__dirname, "./preload.vite.config.ts") })
}


async function start() {
	// await use_renderer_build()
	await use_main_build()
	// await use_preload_build()

	process.exit(0)
}

start()