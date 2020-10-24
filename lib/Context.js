const TypeCheck = require("./TypeCheck");
const config = require("./config");

module.exports = class Context {
    constructor(ctx = {}) {
        // hide all our props since they will be underneath the Proxy()
        // if you don't hide them, some things get nosey and try to inspect them
        Object.defineProperty(this, "errFmt", {
            value: ctx.errFmt || config.errFmt,
            writable: true,
            configurable: true,
            enumerable: false,
        });
        Object.defineProperty(this, "_value", {
            value: ctx._value,
            writable: true,
            configurable: true,
            enumerable: false,
        });
        Object.defineProperty(this, "args", {
            value: [],
            writable: true,
            configurable: true,
            enumerable: false,
        });
        Object.defineProperty(this, "hasNoValue", {
            value: true,
            writable: true,
            configurable: true,
            enumerable: false,
        });
        Object.defineProperty(this, "currFn", {
            value: null,
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
            this.hasNoValue = false;
            this._value = args[0];
        }

        // object.prop value
        if (args.length === 2 &&
            typeof args[1] === "string") {
            this.hasNoValue = false;
            throw new Error("not implemented (yet)");
        }
    }

    getValue() {
        if (this.hasNoValue) {
            throw new Error("value is undefined");
        }

        return this._value;
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

    setArgs(... args) {
        this.args = args;
    }
};
