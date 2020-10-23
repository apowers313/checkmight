function thenablePlugin(mod) {
    const {TypeCheck} = mod;

    new TypeCheck("Thenable", function(v) {
        return typeof v === "object" &&
            typeof v.then === "function";
    });
}

module.exports = thenablePlugin;
