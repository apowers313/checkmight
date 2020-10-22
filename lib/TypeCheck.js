const typeMap = new Map();

module.exports = class TypeCheck {
    constructor(name, testFn) {
        if (typeof name !== "string") {
            throw new TypeError(`TypeCheck(name) expected string, got: ${name}`);
        }

        if (typeof testFn !== "function") {
            throw new TypeError(`TypeCheck(testFn) expected function, got: ${testFn}`);
        }

        // TODO: make sure name isn't already registered

        this.name = name;
        this.test = testFn;
        this.attrs = new Map();
        typeMap.set(this.name, this);
    }

    addAttr(name, attr) {
        if (typeof name !== "string") {
            throw new TypeError(`TypeCheck.addAttr(name) expected string, got: ${name}`);
        }

        if (!(attr instanceof AttrCheck)) {
            throw new TypeError(`TypeCheck.addAttr(attr) expected instance of AttrCheck, got: ${attr}`);
        }

        this.attrs.set(name, attr);
    }

    static getType(typeName, methodName) {
        let type = typeMap.get(typeName);
        if (!type) {
            throw new TypeError(`'${typeName}' is not a recognized type when calling '${methodName}'`);
        }

        return type;
    }
};

// XXX: at bottom to break cyclic dependency
const AttrCheck = require("./AttrCheck");
