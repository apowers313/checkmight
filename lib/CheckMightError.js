const Context = require("./Context");

module.exports = class CheckMightError extends TypeError {
    constructor(ctx) {
        if (!(ctx instanceof Context)) {
            throw TypeError("CheckMightError.constructor expected 'ctx' to inherit from 'Context'");
        }

        let {errFmt} = ctx;
        if (typeof errFmt !== "function") {
            throw new TypeError("CheckMightError.constructor expected ctx.errFmt to be a function");
        }

        let str = errFmt(ctx);

        let o = {};
        Error.captureStackTrace(o);

        super(str);
    }
};
