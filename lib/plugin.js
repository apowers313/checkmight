const TypeCheck = require("./TypeCheck");
const AttrCheck = require("./AttrCheck");

module.exports = function plugin(pluginFn) {
    // if function is a string, treat it like a module
    if (typeof pluginFn === "string") {
        pluginFn = require(pluginFn);
    }

    if (typeof pluginFn !== "function") {
        throw new TypeError(`expected checkmight plugin to be a function: ${pluginFn}`);
    }

    let pluginArgs = {
        TypeCheck,
        AttrCheck,
    };

    return pluginFn(pluginArgs);
};
