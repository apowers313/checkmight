const {inspect} = require("util");

function defaultErrFmt(ctx) {
    // args, this, hasNoValue
    // isString(value).hasMinLength(args) failed due to value: ...
    // JSON.stringify(ctx._value)?
    // if(!Promise.isSettled) value = Promise<pending>
    return `${ctx.currFn}() failed due to value: ${inspect(ctx._value)}`;
}

const config = {
    errFmt: defaultErrFmt,
};

module.exports = config;
