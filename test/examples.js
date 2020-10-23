const {assert} = require("chai");

describe("examples", function() {
    it("basic type", function() {
        const {plugin} = require("..");

        plugin(function(mod) {
            const {TypeCheck} = mod;

            // creates isFoo, isNotFoo, and isOptFoo
            // isFoo() throws if the value passed to it is not
            // the string "foo"
            new TypeCheck("Foo", function(value) {
                return value === "foo";
            });
        });
    });

    it("basic attr", function() {
        const cm = require("..");
        const {plugin} = cm;

        plugin(function(mod) {
            const {TypeCheck, AttrCheck} = mod;

            // isDrink() looks for an object with a 'drink' property
            new TypeCheck("Drink", function(value) {
                return typeof value === "object" &&
            value.hasOwnProperty("drink");
            });

            // isDrink().hasType() sees if the drink is your preferred type
            new AttrCheck("Drink", "Type", function(obj, wantValue) {
                return obj.drink === wantValue;
            });
        });

        cm.isDrink({drink: "beer"}).hasType("beer"); // good
        assert.throws(() => {
            cm.isDrink(42); // TypeError: isDrink() failed due to value: 42
        }, TypeError, "isDrink() failed due to value: 42");
        assert.throws(() => {
            cm.isDrink({drink: "beer"}).hasType("wine"); // TypeError: TypeError: hasType() failed due to value: { drink: 'beer' }
        }, TypeError, "hasType() failed due to value: { drink: 'beer' }");
    });
});
