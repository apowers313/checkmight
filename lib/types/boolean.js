function booleanPlugin(mod) {
    const {TypeCheck} = mod;

    new TypeCheck("Boolean", function(v) {
        return typeof v === "boolean";
    });
}

module.exports = booleanPlugin;
