function nullPlugin(mod) {
    const {TypeCheck} = mod;

    new TypeCheck("Null", function(v) {
        return v === null;
    });
}

module.exports = nullPlugin;
