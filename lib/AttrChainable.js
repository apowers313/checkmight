const BaseChainable = require("./BaseChainable");
const CheckMightError = require("./CheckMightError");
const AttrCheck = require("./AttrCheck");
const DoesCheck = require("./DoesCheck");

const hasMatch = /^(?<fnType>has)(?<attrName>.*)$/;
const doesMatch = /^(?<fnType>does)(?<attrName>.*)$/;

function testHas(attrName, ctx, val, ... args) {
    let attr = AttrCheck.getAttr(ctx.type, attrName, ctx.currFn);

    let ret = attr.test.call(ctx, val, ... args);

    if (!ret) {
        throw new CheckMightError(ctx);
    }

    return new AttrChainable(ctx);
}

function testDoes(attrName, ctx, val, ... args) {
    if (!ctx.type.isExec) {
        throw new Error(`${ctx.type.name} is not executable, but tried calling 'does'`);
    }

    ctx.setArgs(... args);

    let does = DoesCheck.getDoes(ctx.type, attrName, ctx.currFn);
    let ret = does.doIt(ctx, val);

    // does* isn't chainable, always returns a Promise
    return Promise.resolve(ret);
}

class AttrChainable extends BaseChainable {
    getHandler(ctx, methodName) {
        let {done, doneValue} = super.getHandler(ctx, methodName);
        if (done) {
            return doneValue;
        }

        // figure out what type to use (e.g. String) and what matcher (Not, Opt, Is)
        let {fnType, attrName} = super.findMatchingProp(methodName, [
            hasMatch,
            doesMatch,
        ]);

        // make sure we found a matching type
        if (!attrName || !fnType) {
            throw new TypeError(`'${methodName}' is not a valid type checking function`);
        }

        let testFn;
        // eslint-disable-next-line default-case
        switch (fnType) {
        case "does": testFn = testDoes; break;
        case "has": testFn = testHas; break;
        }

        return function testAttr(... args) {
            ctx.currFn = methodName;
            let val = ctx.getValue();

            return testFn(attrName, ctx, val, ... args);
        };
    }
}

module.exports = AttrChainable;

// XXX: at bottom to break cyclic dependency
const TypeChainable = require("./TypeChainable");
