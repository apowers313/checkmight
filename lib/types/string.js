function stringPlugin(mod) {
    const {TypeCheck, AttrCheck} = mod;

    new TypeCheck("String", function(v) {
        return typeof v === "string";
    });

    new AttrCheck("String", "MinLength", function(v, len) {
        return v.length >= len;
    });
}

module.exports = stringPlugin;
