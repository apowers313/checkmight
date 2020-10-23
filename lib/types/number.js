function numberPlugin(mod) {
    const {TypeCheck, AttrCheck} = mod;

    new TypeCheck("Number", function(v) {
        return typeof v === "number";
    });

    new AttrCheck("Number", "Value", function(hasValue, wantValue) {
        return hasValue === wantValue;
    });
}

module.exports = numberPlugin;
