
import { join } from 'path';
import { builtinModules } from 'module'
import { build, BuildOptions, WatchMode ,BuildResult} from 'esbuild';
const config = (env: string,): BuildOptions => {
	return {
		bundle: true,
		platform: 'node',
		entryPoints: [join(__dirname, '../electron/main/index.ts')],
		// outfile: join(__dirname, '../dist/main/index.js'),
		outdir: join(__dirname, '../dist/main'),
		entryNames: '[name]',
		external: ['electron', ...builtinModules],
		format: 'esm',
		minify: env === 'production',
		sourcemap: env === 'development',
		allowOverwrite: true,
		watch: { onRebuild: (err,ret)=>{
			if(rebuild_cb) rebuild_cb(err,ret)
		} },
		color: true,
	}
}

let rebuild_cb: WatchMode['onRebuild']
export function watch(fn: WatchMode['onRebuild']) {
	rebuild_cb = fn
}
export default config