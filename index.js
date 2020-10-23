const TypeChainable = require("./lib/TypeChainable");
let ret = new TypeChainable();

ret.plugin(`${__dirname}/lib/types/string.js`);
ret.plugin(`${__dirname}/lib/types/object.js`);
ret.plugin(`${__dirname}/lib/types/null.js`);
ret.plugin(`${__dirname}/lib/types/undefined.js`);
ret.plugin(`${__dirname}/lib/types/boolean.js`);
ret.plugin(`${__dirname}/lib/types/date.js`);
ret.plugin(`${__dirname}/lib/types/regexp.js`);
ret.plugin(`${__dirname}/lib/types/function.js`);
ret.plugin(`${__dirname}/lib/types/promise.js`);
ret.plugin(`${__dirname}/lib/types/number.js`);

module.exports = ret;
