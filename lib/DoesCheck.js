const matchDoesType = /^Does(?<type>.*)$/;

module.exports = class DoesCheck {
    constructor(typeName, name, doesFn) {
        if (typeof typeName !== "string") {
            throw new TypeError(`DoesCheck(type) expected string, got: ${typeName}`);
        }

        if (typeof name !== "string") {
            throw new TypeError(`DoesCheck(name) expected string, got: ${name}`);
        }

        if (typeof doesFn !== "function") {
            throw new TypeError(`DoesCheck(doesFn) expected function, got: ${doesFn}`);
        }

        let type = TypeCheck.getType(typeName, "DoesCheck.constructor");

        this.typeName = typeName;
        this.type = type;
        this.fn = doesFn;
        this.name = name;
        type.addDoes(name, this);
    }

    doIt(ctx, fn) {
        return this.fn.call(ctx, fn, ... ctx.args);
    }

    static getDoes(type, name, methodName) {
        let retTypeName = null;
        let does = type.does.get(name);
        if (!does) {
            let ret = findRetTypeMatch(type, name);
            if (!ret.typeName) {
                throw new TypeError(`'${name}' is not a recognized 'does' execution of '${type.name}' when calling '${methodName}'`);
            }

            retTypeName = ret.typeName;
            does = type.does.get(ret.doesName);
        }

        return {does, retTypeName};
    }
};

function findRetTypeMatch(type, name) {
    let doesNameList = [... type.does.keys()];
    let typeNameList = [... TypeCheck.typeMap.keys()];
    for (let doesName of doesNameList) {
        for (let typeName of typeNameList) {
            // console.log(`checking: ${name} === ${doesName}${typeName}`);
            if (name === `${doesName}${typeName}`) {
                return {doesName, typeName};
            }
        }
    }
    return null;
}

// XXX: at bottom to break cyclic dependency
const TypeCheck = require("./TypeCheck");
