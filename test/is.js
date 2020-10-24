const {assert} = require("chai");
let cm = require("..");

describe("is*", function() {
    it("isString does not throw on good value", function() {
        let ret = cm.isString("test string");
        assert.isObject(ret);
        // instanceOf AttrChainable
        assert.isFunction(ret.hasMinLength);
    });

    it("isString throws on bad value", function() {
        assert.throws(() => {
            cm.isString(3);
        }, TypeError, "isString() failed due to value: 3");
    });

    it("isString throws on undefined", function() {
        assert.throws(() => {
            cm.isString(undefined);
        }, TypeError, "isString() failed due to value: undefined");
    });

    it("is thenable");
    it("thenable catches error");

    describe("chainable", function() {
        it("passes anything", function() {
            cm.isOptString(undefined).can().pass().anything();
        });
    });

    it("throws on unknown type", function() {
        assert.throws(() => {
            cm.isOptBlargh(3);
        }, TypeError, "'Blargh' is not a recognized type when calling 'isOptBlargh'");
    });

    it("throws on unknown function", function() {
        assert.throws(() => {
            cm.notString(3);
        }, TypeError, "'notString' is not a valid type checking function");
    });

    it("doesn't share context across multiple calls");
});

describe("isNot*", function() {
    it("isNotString does not throw on bad value", function() {
        let ret = cm.isNotString(3);
        assert.isObject(ret);
        // instanceOf TypeChainable
    });

    it("isNotString throws on bad value", function() {
        assert.throws(() => {
            cm.isNotString("test string");
        }, TypeError, "isNotString() failed due to value: 'test string'");
    });
});

describe("isOpt*", function() {
    it("isOptString returns object with undefined", function() {
        let ret = cm.isOptString(undefined);
        assert.isObject(ret);
        assert.isFunction(ret.isString);
        // instanceOf OkChainable
    });

    it("isOptString throws when bad value", function() {
        assert.throws(() => {
            cm.isOptString(3);
        }, TypeError, "isOptString() failed due to value: 3");
    });

    it("isOptString returns chainable on ok value", function() {
        let ret = cm.isOptString("test string");
        assert.isObject(ret);
        assert.isFunction(ret.hasMinLength);
        // instanceOf AttrChainable
    });

    it("chains anything on undefined", function() {
        cm.isOptString(undefined)
            .isString()
            .isFoo()
            .isBar()
            .hasBeer();
    });
});
