import { builtinModules } from "module";
import { dependencies } from "../package.json";
export const watch = {};
export const def_external = ["electron", ...builtinModules, ...Object.keys(dependencies)];
