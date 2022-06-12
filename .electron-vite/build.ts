process.env.NODE_ENV = 'production';


import { join } from 'path';
import { build } from 'vite';
import type { RollupWatcher } from 'rollup'

async function use_main_build() {
	return new Promise(async resolve => {
	const watch = await build({ configFile: join(__dirname, "./main.vite.config.ts") }) as RollupWatcher
	watch.on('event',(data)=>{
		if(data.code === 'END'){
			watch.close()
			resolve(0)
		}
	})
	})
}

async function use_renderer_build() {
	await build({ configFile: join(__dirname, "./renderer.vite.config.ts") })
}

async function use_preload_build() {
	await build({ configFile: join(__dirname, "./preload.vite.config.ts") })
}


async function start() {
	await use_renderer_build()
	await use_main_build()
	await use_preload_build()

	process.exit(0)
}

start()