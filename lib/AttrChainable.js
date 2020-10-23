const Context = require("./Context");
const CheckMightError = require("./CheckMightError");
const AttrCheck = require("./AttrCheck");
const DoesCheck = require("./DoesCheck");

const hasMatch = /^has(?<prop>.*$)/;
const doesMatch = /^does(?<prop>.*$)/;

module.exports = class AttrChainable {
    constructor(ctx) {
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
        // TODO: refactor these checks into a function 'getHandlerGuard(obj, prop)'
        let match;

        // if (!(ctx instanceof Context)) {
        //     throw new TypeError(`TypeChainable.constructor(ctx) expected instance of Context, got: ${ctx}`);
        // }

        // XXX: guard against Symbol(Symbol.toStringTag), which can't be compared against strings
        if (typeof methodName !== "string") {
            return undefined;
        }

        // XXX: guard against things that want to look at the constructor or inspect them, like chai
        if (methodName === "constructor" ||
            methodName === "inspect") {
            return undefined;
        }

        // has*
        if ((match = methodName.match(hasMatch))) {
            let {prop} = match.groups;
            return function checkHas(... args) {
                ctx.currFn = methodName;
                let attr = AttrCheck.getAttr(ctx.type, prop, methodName);
                let val = ctx.getValue();

                if (!attr.test.call(ctx, val, ... args)) {
                    throw new CheckMightError(ctx);
                }

                return new AttrChainable(ctx);
            };

        // does*
        } else if ((match = methodName.match(doesMatch))) {
            let {prop} = match.groups;
            return function checkDone(... args) {
                ctx.currFn = methodName;
                let val = ctx.getValue();
                ctx.setArgs(... args);
                let {does, retTypeName} = DoesCheck.getDoes(ctx.type, prop, methodName);
                let ret = does.doIt(ctx, val);
                ctx.setValue(ret);

                if (retTypeName) {
                    let checkFnName = `is${retTypeName}`;
                    let typeChain = new TypeChainable(ctx);
                    return typeChain[checkFnName]();
                }

                return new TypeChainable(ctx);
            };
        }

        throw new TypeError(`'${methodName}' is not a valid attribute checking function`);
    }

    setHandler() {
        throw new Error("dude, don't set...");
    }
};

// XXX: at bottom to break cyclic dependency
const TypeChainable = require("./TypeChainable");
