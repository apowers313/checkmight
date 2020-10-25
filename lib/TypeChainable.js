const BaseChainable = require("./BaseChainable");
const TypeCheck = require("./TypeCheck");
const OkChainable = require("./OkChainable");
const CheckMightError = require("./CheckMightError");

const notMatch = /^(?<fnType>isNot)(?<typeName>.*)$/;
const optMatch = /^(?<fnType>isOpt)(?<typeName>.*)$/;
const isMatch = /^(?<fnType>is)(?<typeName>.*)$/;

function testNotType(type, ctx, val) {
    let ret = type.test.call(ctx, val);
    if (ret) {
        throw new CheckMightError(ctx);
    }

    return new TypeChainable(ctx);
}

function testOptType(type, ctx, val) {
    if (val === undefined) {
        return new OkChainable();
    }

    return testIsType(type, ctx, val);
}

function testIsType(type, ctx, val) {
    let ret = type.test.call(ctx, val);
    if (!ret) {
        throw new CheckMightError(ctx);
    }

    ctx.setValue(val);
    return new AttrChainable(ctx);
}

class TypeChainable extends BaseChainable {
    getHandler(ctx, methodName) {
        let {done, doneValue} = super.getHandler(ctx, methodName);
        if (done) {
            return doneValue;
        }

        // figure out what type to use (e.g. String) and what matcher (Not, Opt, Is)
        let {fnType, typeName} = super.findMatchingProp(methodName, [
            notMatch,
            optMatch,
            isMatch, // XXX: order matters, is* goes last
        ]);

        // make sure we found a matching type
        if (!typeName || !fnType) {
            throw new TypeError(`'${methodName}' is not a valid type checking function`);
        }

        // setup test function
        let testFn;
        // eslint-disable-next-line default-case
        switch (fnType) {
        case "isNot": testFn = testNotType; break;
        case "isOpt": testFn = testOptType; break;
        case "is": testFn = testIsType; break;
        }

        // return a test function that is configured for this type
        return function testType(... args) {
            let type = TypeCheck.getType(typeName, methodName);
            ctx.setType(type);
            ctx.currFn = methodName;
            ctx.setValue(... args);
            let val = ctx.getValue();
            // testFn
            return testFn(type, ctx, val);
        };
    }
}

module.exports = TypeChainable;

// XXX: at bottom to break cyclic dependency
const AttrChainable = require("./AttrChainable");
