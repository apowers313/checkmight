const {assert} = require("chai");
let cm = require("..");
let {config, plugin} = cm;

describe("is", function() {
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
            }, TypeError, "CheckMightError!");
        });

        it("isString throws on undefined", function() {
            assert.throws(() => {
                cm.isString(undefined);
            }, TypeError, "CheckMightError!");
        });
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
            }, TypeError, "CheckMightError!");
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
            }, TypeError, "CheckMightError!");
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

    describe("chainable", function() {
        it("passes anything", function() {
            cm.isOptString(undefined).can().pass().anything();
        });
    });

    it("throws on unknown type", function() {
        assert.throws(() => {
            cm.isOptFoo(3);
        }, TypeError, "'Foo' is not a recognized type when calling 'isOptFoo'");
    });

    it("throws on unknown function", function() {
        assert.throws(() => {
            cm.notString(3);
        }, TypeError, "'notString' is not a valid type checking function");
    });

    it("doesn't share context across multiple calls");
});
