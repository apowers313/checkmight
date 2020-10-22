function undefinedPlugin(mod) {
    const {TypeCheck} = mod;

    new TypeCheck("Undefined", function(v) {
        return typeof v === "undefined";
    });
}

module.exports = undefinedPlugin;
