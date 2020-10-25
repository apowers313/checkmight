const TypeCheck = require("./TypeCheck");
const AttrCheck = require("./AttrCheck");
const DoesCheck = require("./DoesCheck");
const Context = require("./Context");
const TypeExample = require("./TypeExample");
const CheckMightError = require("./CheckMightError");
const path = require("path");

function createPluginPath(pathName) {
    if (path.isAbsolute(pathName)) {
        return pathName;
    }

    let cwd = process.cwd();
    return path.join(cwd, pathName);
}

module.exports = function plugin(pluginFn) {
    // if function is a string, treat it like a module
    if (typeof pluginFn === "string") {
        pluginFn = require(createPluginPath(pluginFn));
    }

    if (typeof pluginFn !== "function") {
        throw new TypeError(`expected checkmight plugin to be a function: ${pluginFn}`);
    }

    let pluginArgs = {
        TypeCheck,
        AttrCheck,
        DoesCheck,
        Context,
        TypeExample,
        CheckMightError,
    };

    return pluginFn(pluginArgs);
};
