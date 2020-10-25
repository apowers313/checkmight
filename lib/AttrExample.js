const TypeCheck = require("./TypeCheck");
const AttrCheck = require("./AttrCheck");

module.exports = class AttrExample {
    constructor(typeName, typeArg, attrName, ... argStrs) {
        console.log("TypeCheck", TypeCheck);
        this.typeName = typeName;
        this.type = TypeCheck.getType(typeName, "AttrExample.constructor");
        this.attrName = attrName;
        this.attr = AttrCheck.getAttr(typeName, "AttrExample.constructor");
        this.argsDesc = argStrs.join(", ");
        // XXX: 'eval' danger will robinson!
        this.args = argStrs.map((a) => eval(a));
        this.type.attrs.examples.add(this);
    }

    toString() {
        return `is${this.type.name}(${this.argsDesc}).has(${this.argsDesc})`;
    }

    runTest() {
        let passed = true;
        const TypeChainable = require("./TypeChainable");
        console.log("TypeChainable in runTest", TypeChainable);
        let tc = new TypeChainable();
        try {
            tc[`is${this.type.name}`](... this.args);
        } catch (err) {
            passed = false;
        }
        return passed;
    }
};
