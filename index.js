const TypeChainable = require("./lib/TypeChainable");
let ret = new TypeChainable();

ret.plugin("./types/string.js");

module.exports = ret;
