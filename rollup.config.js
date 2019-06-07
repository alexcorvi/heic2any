import typescript from "rollup-plugin-typescript2";
import pkg from "./package.json";
import { readFileSync } from "fs";
export default {
	input: "src/index.ts",
	output: {
		file: pkg.main,
		format: "iife",
		name: "heic2any",
		banner: () =>
			readFileSync("./src/libheif.js", { encoding: "utf8" }) + "\n\n",
		globals: {
			"./libheif": "libheif"
		}
	},
	external: [
		...Object.keys(pkg.dependencies || {}),
		...Object.keys(pkg.peerDependencies || {})
	],
	plugins: [
		typescript({
			typescript: require("typescript")
		})
	]
};
