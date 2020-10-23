const {plugin} = require("..");
const {inspect} = require("util");

// TODO: parse command line arguments, get output file name
let print = console.log;

let textEntry = new Map();

function makeDocs(mod) {
    console.log("making checkmight docs...");
    // TODO: open output file
    // TODO: read template file

    // get all types
    let {TypeCheck} = mod;
    let typeList = [... TypeCheck.typeMap.values()];
    let flatList = flattenTypes(typeList);
    console.log("flatList", inspect(flatList, {showHidden: false, depth: null}));

    // TODO: iterate type examples
    // TODO: iterate attributes / does examples

    printTypeIndex(flatList.map((t) => t.typeName));
    printAttrIndex(flatList);
    printBody(flatList);
}

function flattenTypes(typeList) {
    let flatList = [];
    typeList.forEach((type) => {
        let typeObj = {
            typeName: type.name,
            attrs: [],
            does: [],
            examples: [],
        };

        // TODO: type desc

        type.attrs.forEach((value, key) => {
            let attrObj = {
                parentType: type,
                attrName: key,
                examples: [],
            };

            // TODO: attr desc
            // TODO: attr examples
            typeObj.attrs.push(attrObj);
        });

        type.does.forEach((value, key) => {
            let doesObj = {
                parentType: type,
                doesName: key,
                examples: [],
            };

            // TODO: does desc
            // TODO: does examples
            typeObj.does.push(doesObj);
        });

        // TODO: type examples
        typeObj.attrs = typeObj.attrs.sort(attrSort);
        typeObj.does = typeObj.does.sort(doesSort);
        flatList.push(typeObj);
    });

    flatList = flatList.sort(typeSort);
    return flatList;
}

function printTypeIndex(idx) {
    print("");
    print("## Type Index");
    idx.forEach((v) => {
        print(`* [${v}](#${v}): is${v} / isNot${v} / isOpt${v}`);
    });
    print("");
}

function printAttrIndex(idx) {
    print("");
    print("## Attribute Index");
    idx.forEach((t) => {
        print(`* [${t.typeName}](#${t.typeName})`);
        t.attrs.forEach((a) => {
            print(`    * [${a.attrName}](#${t.typeName}-${a.attrName})`);
        });
        t.does.forEach((d) => {
            print(`    * [${d.descName}](#${t.typeName}-${d.descName})`);
        });
    });
    print("");
}

function printBody(idx) {
    idx.forEach((t) => {
        print("");
        print(`## ${t.typeName}()`);
        t.does.forEach((d) => {
            print("");
            print(`### ${t}().${d}()`);
        });
        t.attrs.forEach((a) => {
            print("");
            print(`### ${t}().${a}()`);
        });
        print("");
    });
    // TODO: print type name
    // TODO: print type description
    // TODO: print type example
    // TODO: print attribute name
    // TODO: print attribute description
    // TODO: print attribute example
    // TODO: print does name
    // TODO: print does description
    // TODO: print does example
}

function printType() {}
function printAttr() {}
function printDoes() {}

function objSort(key, o1, o2) {
    let s1 = o1[key].toUpperCase();
    let s2 = o2[key].toUpperCase();

    // do comparison
    if (s1 < s2) {
        return -1;
    }

    if (s1 > s2) {
        return 1;
    }

    return 0;
}

const typeSort = objSort.bind(null, "typeName");
const attrSort = objSort.bind(null, "attrName");
const doesSort = objSort.bind(null, "doesName");

// function stringSort(s1, s2) {
//     // ignore case
//     s1 = s1.toUpperCase();
//     s2 = s2.toUpperCase();

//     // do comparison
//     if (s1 < s2) {
//         return -1;
//     }

//     if (s1 > s2) {
//         return 1;
//     }

//     return 0;
// }

plugin(makeDocs);
