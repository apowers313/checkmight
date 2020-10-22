function datePlugin(mod) {
    const {TypeCheck} = mod;

    new TypeCheck("Date", function(v) {
        return v instanceof Date;
    });
}

module.exports = datePlugin;
