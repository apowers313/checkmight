module.exports = class CheckMightError extends TypeError {
    constructor(str = "CheckMightError!") {
        super(str);
    }
};
