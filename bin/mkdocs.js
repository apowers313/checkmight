const {inspect} = require("util");
const fs = require("fs");
const TEMPLATE_FILE = "template/README-template.md";
const URL_ROOT = "https://apowers313.github.io/checkmight/";
// const URL_ROOT = "";
const OUTPUT_FOLDER = "docs";

let print = function(fd, str) {
    fs.writeSync(fd, `${str}\n`, "utf8");
};
let warn = console.error;

function makeDocs(mod) {
    console.log("making checkmight docs...");

    // get all types
    let {TypeCheck} = mod;
    let typeList = [... TypeCheck.typeMap.values()];
    let flatList = flattenTypes(typeList);
    console.log("flatList", inspect(flatList, {showHidden: false, depth: null}));

    createIndex(`${OUTPUT_FOLDER}/index.md`, flatList);
    createIndex("README.md", flatList);
    createDocs(flatList);
}

function flattenTypes(typeList) {
    let flatList = [];
    typeList.forEach((type) => {
        let typeObj = {
            typeName: type.name,
            typeDoc: type.documentation,
            attrs: [],
            does: [],
            examples: [],
        };

        // TODO: type examples
        type.examples.forEach((ex) => {
            typeObj.examples.push(`${ex.runTest() ? "+" : "-"} ${ex.toString()}`);
        });

        type.attrs.forEach((value, key) => {
            let attrObj = {
                parentType: type,
                attrName: key,
                examples: [],
            };

            // TODO: attr desc
            // TODO: attr examples
            // type.attrs.examples.forEach((ex) => {
            //     attrObj.examples.push(`${ex.runTest() ? "+" : "-"} ${ex.toString()}`);
            //     typeObj.attrs.push(attrObj);
            // });
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

        typeObj.attrs = typeObj.attrs.sort(attrSort);
        typeObj.does = typeObj.does.sort(doesSort);
        flatList.push(typeObj);
    });

    flatList = flatList.sort(typeSort);
    return flatList;
}

function createIndex(filename, idx) {
    let fd = fs.openSync(filename, "w");
    let template = getTemplateFile();
    print(fd, template);
    print(fd, "");
    writeTypeIndex(fd, idx);
    writeAttrIndex(fd, idx);
}

function getTemplateFile() {
    return fs.readFileSync(TEMPLATE_FILE, "utf8");
}

function writeTypeIndex(fd, idx) {
    print(fd, "");
    print(fd, "## Type Index");
    idx.forEach((type) => {
        print(fd, `* [${type.typeName}](${URL_ROOT}${type.typeName.toLowerCase()}.html): is${type.typeName} / isNot${type.typeName} / isOpt${type.typeName}`);
    });
    print(fd, "");
}

function writeAttrIndex(fd, idx) {
    print(fd, "");
    print(fd, "## Attribute Index");
    idx.forEach((t) => {
        print(fd, `* [${t.typeName}](#user-content-${t.typeName.toLowerCase()})`);
        t.attrs.forEach((a) => {
            print(fd, `    * [has${a.attrName}](#user-content-is${t.typeName.toLowerCase()}has${a.attrName.toLowerCase()})`);
        });
        t.does.forEach((d) => {
            print(fd, `    * [does${d.doesName}](#user-content-is${t.typeName.toLowerCase()}does${d.doesName.toLowerCase()})`);
        });
    });
    print(fd, "");
}

function createDocs(idx) {
    idx.forEach((t) => {
        let fd = fs.openSync(`${OUTPUT_FOLDER}/${t.typeName.toLowerCase()}.md`, "w");
        print(fd, `## ${t.typeName}`);

        // print type documentation
        if (t.typeDoc) {
            print(fd, `**Description:** ${t.typeDoc}`);
        } else {
            warn(`No documentation for type: ${t.typeName}`);
        }

        if (t.examples.length) {
            print(fd, "");
            print(fd, "**Examples:**");
            print(fd, "``` diff");
            print(fd, t.examples.join("\n"));
            print(fd, "```");
        } else {
            warn(`No examples for type: ${t.typeName}`);
        }

        t.does.forEach((d) => {
            print(fd, "");
            print(fd, `### is${t.typeName}().does${d.doesName}()`);
        });
        t.attrs.forEach((a) => {
            print(fd, "");
            print(fd, `### is${t.typeName}().has${a.attrName}()`);
            print(fd, "");
            // if (t.attrs.examples.length) {
            //     print("**Examples:**");
            //     print(a.examples.join("\n"));
            // } else {
            //     warn(`No examples for attribute is${t.typeName}.has${a.attrName}`);
            // }
        });
        print(fd, "");
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

require("..").plugin(makeDocs);
