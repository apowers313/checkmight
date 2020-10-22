function objectPlugin(mod) {
    const {TypeCheck, AttrCheck} = mod;

    new TypeCheck("Object", function(v) {
        return typeof v === "object" && v !== null;
    });

    // hasProp
    // hasNoProps
    // hasValue
    // eachProp().is<Type>()
}

module.exports = objectPlugin;
