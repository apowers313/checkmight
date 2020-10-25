[Work in progress, do not use]

# checkmight
The mighty type checking and validation library. Use it in your code for method guarding or in your test library as an assert library.

## Example
``` js
const cm = require("checkmight");

cm.isString("foo bar")
    .hasMinLength(5)
    .hasPattern(/^foo/);

cm.isObject({foo: "bar"})
    .hasProp("foo")
    .isString()
    .hasLength(3)
    .hasValue("bar");
```

## Why?
Chai is dead
Inspect.js is dead
TypeScript is only static validation, requires compilation, and isn't compatible with all the things yet

## The Mental Model
* is* - is a "type" of a thing: isString, isObject, isFunction, isPromise, etc.
* has* - has an "attribute": hasLength, hasProperty, etc.
* does* - is executible and performs some action: doesReturn, doesResolve, doesYield, etc.
* each* - is a collection of things that all have some common type: eachIsString, eachIsObject, etc.

See the docs for a full list of APIs.

## Add Your Own Plugins
plugin(mod)
mod has all the classes you need: [TODO]
for simple types

your function is called with a Context

Basic type example:
``` js
const {plugin} = require("cm");

plugin(function(mod) {
    const {TypeCheck} = mod;

    // creates isFoo, isNotFoo, and isOptFoo
    // isFoo() throws if the value passed to it is not
    // the string "foo"
    new TypeCheck("Foo", function(value) {
        return value === "foo";
    })
})
```

Basic attribute example
``` js
const cm = require("cm");
const {plugin} = cm;

plugin(function(mod) {
    const {TypeCheck, AttrCheck} = mod;

    // isDrink() looks for an object with a 'drink' property
    new TypeCheck("Drink", function(value) {
        return typeof value === "object" &&
            value.hasOwnProperty("drink");
    })

    // isDrink().hasType() sees if the drink is your preferred type
    new AttrCheck("Drink", "Type", function(obj, wantValue) {
        return obj.drink === wantValue;
    })
})

cm.isDrink({drink: "beer"}).hasType("beer"); // good
cm.isDrink(42); // TypeError: isDrink() failed due to value: 42
cm.isDrink({drink: "beer"}).hasType("wine"); // TypeError: TypeError: hasType() failed due to value: { drink: 'beer' }
```

Advanced example
``` js
```

## Other Stuff
* config
    * config.plugin(plugin) - takes a plugin function or the name of module to require()


## Type Index
* [Boolean](https://apowers313.github.io/checkmight/boolean.html): isBoolean / isNotBoolean / isOptBoolean
* [Date](https://apowers313.github.io/checkmight/date.html): isDate / isNotDate / isOptDate
* [False](https://apowers313.github.io/checkmight/false.html): isFalse / isNotFalse / isOptFalse
* [Function](https://apowers313.github.io/checkmight/function.html): isFunction / isNotFunction / isOptFunction
* [Null](https://apowers313.github.io/checkmight/null.html): isNull / isNotNull / isOptNull
* [Number](https://apowers313.github.io/checkmight/number.html): isNumber / isNotNumber / isOptNumber
* [Object](https://apowers313.github.io/checkmight/object.html): isObject / isNotObject / isOptObject
* [Promise](https://apowers313.github.io/checkmight/promise.html): isPromise / isNotPromise / isOptPromise
* [RegExp](https://apowers313.github.io/checkmight/regexp.html): isRegExp / isNotRegExp / isOptRegExp
* [String](https://apowers313.github.io/checkmight/string.html): isString / isNotString / isOptString
* [True](https://apowers313.github.io/checkmight/true.html): isTrue / isNotTrue / isOptTrue
* [Undefined](https://apowers313.github.io/checkmight/undefined.html): isUndefined / isNotUndefined / isOptUndefined


## Attribute Index
* [Boolean](#user-content-boolean)
* [Date](#user-content-date)
* [False](#user-content-false)
* [Function](#user-content-function)
    * [doesReturn](#user-content-isfunctiondoesreturn)
* [Null](#user-content-null)
* [Number](#user-content-number)
    * [hasValue](#user-content-isnumberhasvalue)
* [Object](#user-content-object)
* [Promise](#user-content-promise)
    * [doesReject](#user-content-ispromisedoesreject)
    * [doesResolve](#user-content-ispromisedoesresolve)
* [RegExp](#user-content-regexp)
* [String](#user-content-string)
    * [hasMinLength](#user-content-isstringhasminlength)
* [True](#user-content-true)
* [Undefined](#user-content-undefined)

