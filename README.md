[Work in progress, do not use]

# checkmight
The mighty type checking and validation library. Use it in your code for method guarding or in your test library as an assert library.

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

## Other Stuff
* config
    * config.plugin(plugin) - takes a plugin function or the name of module to require()