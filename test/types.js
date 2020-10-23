const {assert} = require("chai");
const {
    isString,
    isObject,
    isNull,
    isUndefined,
    isBoolean,
    isDate,
    isRegExp,
    isFunction,
    isNumber,
    isPromise,
} = require("..");

describe("types", function() {
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
            }, TypeError, "isString() failed due to value: null");
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
                }, TypeError, "hasMinLength() failed due to value: 'foo'");
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
            }, TypeError, "isObject() failed due to value: 3");
        });

        it("isObject null throws", function() {
            assert.throws(() => {
                isObject(null);
            }, TypeError, "isObject() failed due to value: null");
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
            }, TypeError, "isNull() failed due to value: undefined");
        });
    });

    describe("undefined", function() {
        it("isUndefined", function() {
            isUndefined(undefined);
        });

        it("isUndefined throws", function() {
            assert.throws(() => {
                isUndefined(null);
            }, TypeError, "isUndefined() failed due to value: null");
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
            }, TypeError, "isBoolean() failed due to value: 0");
        });
    });

    describe("date", function() {
        it("isDate", function() {
            isDate(new Date());
        });

        it("isDate throws", function() {
            assert.throws(() => {
                isDate("today");
            }, TypeError, "isDate() failed due to value: 'today'");
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
                isRegExp("not a regexp");
            }, TypeError, "isRegExp() failed due to value: 'not a regexp'");
        });
    });

    describe("function", function() {
        it("isFunction", function() {
            isFunction(function(){});
        });

        it("isFunction throws", function() {
            assert.throws(() => {
                isFunction(12);
            }, TypeError, "isFunction() failed due to value: 12");
        });

        describe("doesReturn", function() {
            it("does function call", function(done) {
                function foo() {
                    done();
                }
                isFunction(foo)
                    .doesReturn();
            });

            it("gets called with args", function(done) {
                function foo(a, b, c) {
                    assert.strictEqual(a, "one");
                    assert.strictEqual(b, "two");
                    assert.strictEqual(c, "three");
                    done();
                }
                isFunction(foo)
                    .doesReturn("one", "two", "three");
            });

            it("gets called with this");
            it("returns type chainable");
        });

        describe("doesReturnString", function() {
            it("ok on string return", function() {
                function foo() {
                    return "this is a test";
                }
                isFunction(foo)
                    .doesReturnString();
            });

            it("throws on non-string", function() {
                function foo() {
                    return {foo: "bar"};
                }

                assert.throws(() => {
                    isFunction(foo).doesReturnString();
                }, TypeError, "isString() failed due to value: { foo: 'bar' }");
            });

            it("returns attr chainable");
        });
    });

    describe("number", function() {
        it("isNumber", function() {
            isNumber(3);
        });
        it("isNumber throws", function() {
            assert.throws(() => {
                isNumber("bob");
            }, TypeError, "isNumber() failed due to value: 'bob'");
        });
    });

    describe("promise", function() {
        it("isPromise", function() {
            isPromise(new Promise(() => {}));
        });

        it("isPromise throws", function() {
            assert.throws(() => {
                isPromise(24);
            }, TypeError, "isPromise() failed due to value: 24");
        });

        describe("doesResolve", function() {
            this.slow(2000);

            it("resolves", function() {
                let p = new Promise((resolve) => {
                    setTimeout(function() {
                        console.log("promise done");
                        resolve(42);
                    }, 500);
                });

                return isPromise(p)
                    .doesResolve();
            });

            it.skip("resolves to 42", function() {
                let p = new Promise((resolve) => {
                    setTimeout(function() {
                        console.log("promise done");
                        resolve(42);
                    }, 500);
                });
                return isPromise(p)
                    .doesResolve()
                    .isNumber()
                    .hasValue(42);
            });

            it.skip("resolves object property to string", function() {
                let p = new Promise((resolve) => {
                    setTimeout(function() {
                        console.log("promise done");
                        resolve({foo: "bar"});
                    }, 500);
                });
                return isPromise(p)
                    .doesResolve()
                    .isObject()
                    .hasProperty("foo")
                    .isString()
                    .hasLength(3)
                    .hasValue("bar");
            });

            it.skip("throws on reject", function() {
                let p = new Promise((resolve, reject) => {
                    setTimeout(function() {
                        console.log("promise rejecting");
                        reject();
                    }, 500);
                });
                isPromise(p)
                    .doesResolve();
            });
        });

        describe("doesReject", function() {
            it("rejects");
            it("throws on resolve");
        });
    });
});
