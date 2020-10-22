module.exports = class AttrCheck {
    constructor(typeName, name, testFn) {
        if (typeof typeName !== "string") {
            throw new TypeError(`AttrCheck(type) expected string, got: ${typeName}`);
        }

        if (typeof name !== "string") {
            throw new TypeError(`AttrCheck(name) expected string, got: ${name}`);
        }

        if (typeof testFn !== "function") {
            throw new TypeError(`AttrCheck(testFn) expected function, got: ${testFn}`);
        }

        let type = TypeCheck.getType(typeName, "AttrCheck.constructor");

        // TODO: make sure name isn't already registered

        this.name = name;
        this.test = testFn;
        this.typeName = typeName;
        this.type = type;
        this.type.addAttr(this.name, this);
    }

    static getAttr(type, name, methodName) {
        let attr = type.attrs.get(name);
        if (!attr) {
            throw new TypeError(`'${name}' is not a recognized attribute of ${type.name} when calling '${methodName}'`);
        }

        return attr;
    }
};

// XXX: at bottom to break cyclic dependency
const TypeCheck = require("./TypeCheck");
