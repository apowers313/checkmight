function booleanPlugin(mod) {
    const {TypeCheck, TypeExample} = mod;

    let b = new TypeCheck("Boolean", function(v) {
        return typeof v === "boolean" ||
            (typeof v === "object" && v instanceof Boolean);
    });
    b.documentation = "Tests whether the specified value is a [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)";
    new TypeExample("Boolean", "true");
    new TypeExample("Boolean", "false");
    new TypeExample("Boolean", "new Boolean(false)");
    new TypeExample("Boolean", "'bob'");

    let f = new TypeCheck("False", function(v) {
        return v === false;
    });
    f.documentation = "Tests whether the specified value value is the `false` [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)";
    new TypeExample("False", "true");
    new TypeExample("False", "false");
    new TypeExample("False", "new Boolean(false)");

    let t = new TypeCheck("True", function(v) {
        return v === true;
    });
    t.documentation = "Tests whether the specified value is the `true` [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)";
    new TypeExample("True", "true");
    new TypeExample("True", "false");
    new TypeExample("True", "new Boolean(true)");
}

module.exports = booleanPlugin;
