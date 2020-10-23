function functionPlugin(mod) {
    const {TypeCheck, DoesCheck} = mod;

    new TypeCheck("Function", function(v) {
        return typeof v === "function";
    });

    new DoesCheck("Function", "Return", function(v) {
        let ctx = this;
        return v.call(ctx.this, ... ctx.args);
    });
}

module.exports = functionPlugin;
