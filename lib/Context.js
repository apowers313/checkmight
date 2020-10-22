const TypeCheck = require("./TypeCheck");
const config = require("./config");

module.exports = class Context {
    constructor(ctx = {}) {
        Object.defineProperty(this, "errFmt", {
            value: ctx.errFmt || config.errFmt,
            writable: true,
            configurable: true,
            enumerable: false,
        });
        Object.defineProperty(this, "value", {
            value: ctx.value,
            writable: true,
            configurable: true,
            enumerable: false,
        });
    }

    setValue(... args) {
        // no value
        if (args.length === 0) {
            return;
        }

        // simple value
        if (args.length === 1) {
            this.value = args[0];
        }

        // object.prop value
        if (args.length === 2 &&
            typeof args[1] === "string") {
            throw new Error("not implemented (yet)");
        }
    }

    getValue() {
        if (this.value === undefined) {
            throw new Error("value is undefined");
        }

        return this.value;
    }

    setType(type) {
        if (typeof type === "string") {
            type = TypeCheck.getType(type, "Context.setType");
        }

        if (!(type instanceof TypeCheck)) {
            throw new Error("Context.setType expected an instance of TypeCheck");
        }

        Object.defineProperty(this, "type", {
            value: type,
            writable: true,
            configurable: true,
            enumerable: false,
        });
    }
};
