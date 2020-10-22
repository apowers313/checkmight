const Context = require("./Context");
const OkChainable = require("./OkChainable");
const CheckMightError = require("./CheckMightError");
const TypeCheck = require("./TypeCheck");
const AttrChainable = require("./AttrChainable");
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
        if (methodName === "constructor" ||
            methodName === "inspect") {
            return undefined;
        }

        if (methodName === "config") {
            return config;
        }

        if (methodName === "plugin") {
            return plugin;
        }

        // isNot*
        if ((match = methodName.match(notMatch))) {
            let {prop} = match.groups;
            return function checkIsNot(... args) {
                ctx.setValue(... args);
                let val = ctx.value;

                let type = TypeCheck.getType(prop, methodName);

                if (type.test(val)) {
                    throw new CheckMightError();
                }

                return new TypeChainable(ctx);
            };

        // isOpt*
        } else if ((match = methodName.match(optMatch))) {
            let {prop} = match.groups;
            return function checkIsOpt(... args) {
                ctx.setValue(... args);
                let val = ctx.value;
                if (val === undefined) {
                    return new OkChainable();
                }

                let type = TypeCheck.getType(prop, methodName);

                if (val !== undefined &&
                    !type.test(val)) {
                    throw new CheckMightError();
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
            return function checkIs(val) {
                let type = TypeCheck.getType(prop, methodName);

                if (!type.test(val)) {
                    throw new CheckMightError();
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
