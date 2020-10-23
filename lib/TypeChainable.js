const Context = require("./Context");
const OkChainable = require("./OkChainable");
const CheckMightError = require("./CheckMightError");
const TypeCheck = require("./TypeCheck");
const config = require("./config");
const plugin = require("./plugin");

const notMatch = /^isNot(?<prop>.*$)/;
const optMatch = /^isOpt(?<prop>.*$)/;
const isMatch = /^is(?<prop>.*$)/;

module.exports = class TypeChainable {
    constructor(ctx = new Context()) {
        // if (!(ctx instanceof Context)) {
        //     throw new TypeError(`TypeChainable.constructor(ctx) expected instance of Context, got: ${ctx}`);
        // }

        return new Proxy(ctx, {
            get: this.getHandler,
            set: this.setHandler,
            getOwnPropertyDescriptor: this.getOwnPropertyDescriptor,
        });
    }

    getHandler(ctx, methodName) {
        let match;

        // XXX: guard against Symbol(Symbol.toStringTag), which can't be compared against strings
        if (typeof methodName !== "string") {
            return undefined;
        }

        // XXX: guard against things that want to look at the constructor or inspect them, like chai
        if (methodName === "constructor") {
            console.log("asked for constructor");
            return undefined;
        }

        if (methodName === "inspect") {
            console.log("asked for inspect");
            return undefined;
        }

        if (methodName === "config") {
            return config;
        }

        if (methodName === "plugin") {
            return plugin;
        }

        if (methodName === "exec") {
            return function execFunction(fn) {
                let ret = fn.call(ctx);
                if (!ret) {
                    throw new CheckMightError(ctx);
                }

                return new TypeChainable(ctx);
            };
        }

        if (methodName === "then") {
            return function(resolve, reject) {
                if (ctx._value instanceof Promise) {
                    ctx._value.then(resolve).catch(reject);
                }
            };
        }

        if (methodName === "catch") {
            return function(... args) {
                console.log("awaiting catch:", ... args);
            };
        }

        // isNot*
        if ((match = methodName.match(notMatch))) {
            let {prop} = match.groups;
            return function checkIsNot(... args) {
                ctx.currFn = methodName;
                ctx.setValue(... args);
                let val = ctx.getValue();

                let type = TypeCheck.getType(prop, methodName);

                if (type.test.call(ctx, val)) {
                    throw new CheckMightError(ctx);
                }

                return new TypeChainable(ctx);
            };

        // isOpt*
        } else if ((match = methodName.match(optMatch))) {
            let {prop} = match.groups;
            return function checkIsOpt(... args) {
                ctx.currFn = methodName;
                ctx.setValue(... args);
                let val = ctx.getValue();
                if (val === undefined) {
                    return new OkChainable();
                }

                let type = TypeCheck.getType(prop, methodName);

                if (val !== undefined &&
                    !type.test.call(ctx, val)) {
                    throw new CheckMightError(ctx);
                }

                if (val === undefined) {
                    return new OkChainable();
                }

                ctx.setType(type);
                ctx.setValue(val);
                return new AttrChainable(ctx);
            };

        // is*
        } else if ((match = methodName.match(isMatch))) {
            let {prop} = match.groups;
            return function checkIs(... args) {
                ctx.currFn = methodName;
                ctx.setValue(... args);
                let val = ctx.getValue();
                let type = TypeCheck.getType(prop, methodName);

                if (!type.test.call(ctx, val)) {
                    throw new CheckMightError(ctx);
                }

                ctx.setType(type);
                ctx.setValue(val);
                return new AttrChainable(ctx);
            };
        }

        throw new TypeError(`'${methodName}' is not a valid type checking function`);
    }

    setHandler() {
        throw new Error("dude, don't set...");
    }

    getOwnPropertyDescriptor(obj, prop) {
        console.log("getOwnPropertyDescriptor", obj, prop);
        return undefined;
        // let isList = [... typeMap.values()].map((v) => {`is${v}`);
        // let isNotList = [... typeMap.values()].map((v) => `isNot${v}`);
        // let isOptList = [... typeMap.values()].map((v) => `isOpt${v}`);
        // return ["config", ... isList, ... isNotList, ... isOptList]
    }
};

// XXX: at bottom to break cyclic dependency
const AttrChainable = require("./AttrChainable");

