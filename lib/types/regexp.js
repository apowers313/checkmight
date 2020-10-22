function regExpPlugin(mod) {
    const {TypeCheck} = mod;

    new TypeCheck("RegExp", function(v) {
        return v instanceof RegExp;
    });
}

module.exports = regExpPlugin;
