const Context = require("./Context");
const config = require("./config");
const plugin = require("./plugin");
const CheckMightError = require("./CheckMightError");

module.exports = class BaseChainable {
    constructor(ctx = new Context()) {
        if (!(ctx instanceof Context)) {
            throw new TypeError(`TypeChainable.constructor(ctx) expected instance of Context, got: ${ctx}`);
        }

        let prox = new Proxy(ctx, {
            get: this.getHandler,
            set: this.setHandler,
        });

        return prox;
    }

    getHandler(ctx, methodName) {
        // TODO: this could be refactored further

        // XXX: guard against Symbol(Symbol.toStringTag), which can't be compared against strings
        if (typeof methodName !== "string") {
            return {done: true, doneValue: undefined};
        }

        switch (methodName) {
        case "then": return {done: true, doneValue: thenFn};
        case "config": return {done: true, doneValue: config};
        case "plugin": return {done: true, doneValue: plugin};
        // case "exec": return {done: true, doneValue: execFn};
        // XXX: guard against things that want to look at the constructor or inspect them, like chai
        case "constructor":
        case "inspect": return {done: true, doneValue: undefined};
        default: return {done: false};
        }

        function thenFn(resolve, reject) {
            Promise.resolve(ctx.getValue).then(resolve).catch(reject);
            // resolve(ctx.getValue());
        }

        // function execFn(fn) {
        //     let ret = fn.call(ctx);
        //     if (!ret) {
        //         throw new CheckMightError(ctx);
        //     }

        //     return new TypeChainable(ctx);
        // }
    }

    findMatchingProp(methodName, matcherList) {
        for (let matcher of matcherList) {
            let m = methodName.match(matcher);
            if (m) {
                return m.groups;
            }
        }

        return {};
    }

    setHandler() {
        throw new Error("dude, don't set...");
    }

    getOwnPropertyDescriptor(obj, prop) {
        return undefined;
        // let isList = [... typeMap.values()].map((v) => {`is${v}`);
        // let isNotList = [... typeMap.values()].map((v) => `isNot${v}`);
        // let isOptList = [... typeMap.values()].map((v) => `isOpt${v}`);
        // return ["config", ... isList, ... isNotList, ... isOptList]
    }
};
