function stringPlugin(mod) {
    const {TypeCheck, AttrCheck} = mod;

    new TypeCheck("String", function(v) {
        return typeof v === "string" || v instanceof String;
    });

    new AttrCheck("String", "MinLength", function(v, len) {
        return v.length >= len;
    });

    // MaxLength
    // Length
    // Pattern
    // Start
    // End
}

module.exports = stringPlugin;
