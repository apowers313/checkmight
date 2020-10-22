const {assert} = require("chai");
const {
    isString,
    isObject,
    isNull,
    isUndefined,
    isBoolean,
    isDate,
    isRegExp,
} = require("..");

describe.only("types", function() {
    describe("string", function() {
        it("isString 'foo'", function() {
            isString("foo");
        });

        it("isString new String()", function() {
            isString(new String("foo"));
        });

        it("isString throws", function() {
            assert.throws(() => {
                isString(null);
            }, TypeError, "CheckMightError!");
        });

        describe("MinLength", function() {
            it("hasMinLength passes", function() {
                isString("foo")
                    .hasMinLength(2);
            });

            it("hasMinLength throws", function() {
                assert.throws(() => {
                    isString("foo")
                        .hasMinLength(5);
                }, TypeError, "CheckMightError!");
            });
        });
    });

    describe("object", function() {
        it("isObject {}", function() {
            isObject({});
        });

        it("isObject {foo: \"bar\"}", function() {
            isObject({foo: "bar"});
        });

        it("isObject 3 throws", function() {
            assert.throws(() => {
                isObject(3);
            }, TypeError, "CheckMightError!");
        });

        it("isObject null throws", function() {
            assert.throws(() => {
                isObject(null);
            }, TypeError, "CheckMightError!");
        });

        it("isObject null prototype", function() {
            isObject(Object.create(null));
        });
    });

    describe("null", function() {
        it("isNull", function() {
            isNull(null);
        });

        it("isNull throws", function() {
            assert.throws(() => {
                isNull(undefined);
            }, TypeError, "CheckMightError!");
        });
    });

    describe("undefined", function() {
        it("isUndefined", function() {
            isUndefined(undefined);
        });

        it("isUndefined throws", function() {
            assert.throws(() => {
                isUndefined(null);
            }, TypeError, "CheckMightError!");
        });
    });

    describe("boolean", function() {
        it("isBoolean true", function() {
            isBoolean(true);
        });

        it("isBoolean false", function() {
            isBoolean(false);
        });

        it("isBoolean throws", function() {
            assert.throws(() => {
                isBoolean(0);
            }, TypeError, "CheckMightError!");
        });
    });

    describe("date", function() {
        it("isDate", function() {
            isDate(new Date());
        });

        it("isDate throws", function() {
            assert.throws(() => {
                isDate("today");
            }, TypeError, "CheckMightError!");
        });
    });

    describe("regexp", function() {
        it("isRegExp new RegExp()", function() {
            isRegExp(new RegExp());
        });

        it("isRegExp static regexp", function() {
            isRegExp(/foo/g);
        });

        it("isRegExp throws", function() {
            assert.throws(() => {
                isRegExp("today");
            }, TypeError, "CheckMightError!");
        });
    });
});
