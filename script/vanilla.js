const fs = require("fs-extra");
const path = require("path");
fs.emptyDirSync(path.join(__dirname, "../vanilla"))
process.argv = process.argv.splice(0, 2).concat(["-p", "./ts-to-js.tsconfig.json"])
require(`typescript/bin/tsc`)