var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/facade/lang');
var json_pipe_1 = require('angular2/src/change_detection/pipes/json_pipe');
function main() {
    test_lib_1.describe("JsonPipe", function () {
        var regNewLine = '\n';
        var canHasUndefined; // because Dart doesn't like undefined;
        var inceptionObj;
        var inceptionObjString;
        var catString;
        var pipe;
        function normalize(obj) { return lang_1.StringWrapper.replace(obj, regNewLine, ''); }
        test_lib_1.beforeEach(function () {
            inceptionObj = {
                dream: { dream: { dream: 'Limbo' } }
            };
            inceptionObjString = "{\n" + "  \"dream\": {\n" + "    \"dream\": {\n" +
                "      \"dream\": \"Limbo\"\n" + "    }\n" + "  }\n" + "}";
            catString = 'Inception Cat';
            pipe = new json_pipe_1.JsonPipe();
        });
        test_lib_1.describe("supports", function () {
            test_lib_1.it("should support objects", function () { test_lib_1.expect(pipe.supports(inceptionObj)).toBe(true); });
            test_lib_1.it("should support strings", function () { test_lib_1.expect(pipe.supports(catString)).toBe(true); });
            test_lib_1.it("should support null", function () { test_lib_1.expect(pipe.supports(null)).toBe(true); });
            test_lib_1.it("should support NaN", function () { test_lib_1.expect(pipe.supports(lang_1.NumberWrapper.NaN)).toBe(true); });
            if (!test_lib_1.IS_DARTIUM) {
                test_lib_1.it("should support undefined", function () { test_lib_1.expect(pipe.supports(canHasUndefined)).toBe(true); });
            }
        });
        test_lib_1.describe("transform", function () {
            test_lib_1.it("should return JSON-formatted string", function () { test_lib_1.expect(pipe.transform(inceptionObj)).toEqual(inceptionObjString); });
            test_lib_1.it("should return JSON-formatted string even when normalized", function () {
                var dream1 = normalize(pipe.transform(inceptionObj));
                var dream2 = normalize(inceptionObjString);
                test_lib_1.expect(dream1).toEqual(dream2);
            });
            test_lib_1.it("should return JSON-formatted string similar to Json.stringify", function () {
                var dream1 = normalize(pipe.transform(inceptionObj));
                var dream2 = normalize(lang_1.Json.stringify(inceptionObj));
                test_lib_1.expect(dream1).toEqual(dream2);
            });
            test_lib_1.it("should return same value when nothing has changed since the last call", function () {
                test_lib_1.expect(pipe.transform(inceptionObj)).toEqual(inceptionObjString);
                test_lib_1.expect(pipe.transform(inceptionObj)).toEqual(inceptionObjString);
            });
        });
        test_lib_1.describe("onDestroy", function () {
            test_lib_1.it("should do nothing when no latest value", function () { test_lib_1.expect(function () { return pipe.onDestroy(); }).not.toThrow(); });
        });
    });
}
exports.main = main;
//# sourceMappingURL=json_pipe_spec.js.map