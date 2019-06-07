const fs = require("fs");

const libheif = fs.readFileSync("./src/libheif.js", { encoding: "utf8" });
let src = fs.readFileSync("./dist/index.js", { encoding: "utf8" });
const umdString = `
(function (global, factory) {
    if(typeof exports === 'object' && typeof module !== 'undefined') {
        module.exports = factory();
        module.exports.default = factory();
    }
	else if(typeof define === 'function' && define.amd) {
        define(factory);
    }
    else {
        (global = global || self, global.heic2any = factory())
    }
}(this, function () { 'use strict';
`;
const returnString = `
return heic2any;
}));
`;

src = src.replace(`import "./libheif";`, "");
src = src.replace(`export default heic2any;`, "");

const result = libheif + umdString + src + returnString;
fs.writeFileSync("./dist/index.js", result);
console.log("# Build finished successfully");
