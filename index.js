const TypeChainable = require("./lib/TypeChainable");
let ret = new TypeChainable();

ret.plugin("./types/string.js");
ret.plugin("./types/object.js");
ret.plugin("./types/null.js");
ret.plugin("./types/undefined.js");
ret.plugin("./types/boolean.js");
ret.plugin("./types/date.js");
ret.plugin("./types/regexp.js");

module.exports = ret;
