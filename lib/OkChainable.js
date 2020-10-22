module.exports = class OkChainable {
    constructor() {
        let prox = new Proxy({}, {
            get: this.getHandler,
            set: this.setHandler,
        });

        return prox;
    }

    getHandler(obj, prop) {
        // XXX: guard against Symbol(Symbol.toStringTag), which can't be compared against strings
        if (typeof prop !== "string") {
            return undefined;
        }

        // XXX: guard against things that want to look at the constructor or inspect them, like chai
        if (prop === "constructor" ||
            prop === "inspect") {
            return undefined;
        }

        return function okFunction() {
            return new OkChainable();
        };
    }

    setHandler() {
        throw new Error("dude, don't set...");
    }
};
