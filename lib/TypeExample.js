const TypeCheck = require("./TypeCheck");

module.exports = class TypeExample {
    constructor(typeName, ... argStrs) {
        console.log("TypeCheck", TypeCheck);
        this.type = TypeCheck.getType(typeName, "TypeExample.constructor");
        this.argsDesc = argStrs.join(", ");
        this.args = argStrs.map((a) => eval(a));
        this.type.examples.add(this);
    }

    toString() {
        return `is${this.type.name}(${this.argsDesc})`;
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
