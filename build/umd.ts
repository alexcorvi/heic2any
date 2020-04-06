export const umdString = `
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
export const returnString = `
return heic2any;
}));
`;
