const Context = require("./Context");
const CheckMightError = require("./CheckMightError");
const AttrCheck = require("./AttrCheck");

const hasMatch = /^has(?<prop>.*$)/;

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

        if ((match = methodName.match(hasMatch))) {
            let {prop} = match.groups;
            return function checkHas(... args) {
                let attr = AttrCheck.getAttr(ctx.type, prop, methodName);
                let val = ctx.getValue();

                if (!attr.test(val, ... args)) {
                    throw new CheckMightError();
                }

                return new AttrChainable(ctx);
            };
        }

        throw new TypeError(`'${methodName}' is not a valid attribute checking function`);
    }

    setHandler() {
        throw new Error("dude, don't set...");
    }
};
