import { WatcherOptions } from 'rollup';
import { builtinModules } from "module";
import { dependencies } from "../package.json"



export const watch: WatcherOptions = {};
export const def_external = ["electron", ...builtinModules, ...Object.keys(dependencies)]
