const cm = require("..");
const {assert} = require("chai");

describe("config", function() {
    it("is object", function() {
        assert.isObject(cm.config);
    });
});
