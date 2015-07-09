var test_lib_1 = require('angular2/test_lib');
var pipe_registry_1 = require('angular2/src/change_detection/pipes/pipe_registry');
var pipe_1 = require('angular2/src/change_detection/pipes/pipe');
function main() {
    test_lib_1.describe("pipe registry", function () {
        var firstPipe = new pipe_1.Pipe();
        var secondPipe = new pipe_1.Pipe();
        test_lib_1.it("should return the first pipe supporting the data type", function () {
            var r = new pipe_registry_1.PipeRegistry({ "type": [new PipeFactory(false, firstPipe), new PipeFactory(true, secondPipe)] });
            test_lib_1.expect(r.get("type", "some object", null)).toBe(secondPipe);
        });
        test_lib_1.it("should throw when no matching type", function () {
            var r = new pipe_registry_1.PipeRegistry({});
            test_lib_1.expect(function () { return r.get("unknown", "some object", null); })
                .toThrowError("Cannot find 'unknown' pipe supporting object 'some object'");
        });
        test_lib_1.it("should throw when no matching pipe", function () {
            var r = new pipe_registry_1.PipeRegistry({ "type": [] });
            test_lib_1.expect(function () { return r.get("type", "some object", null); })
                .toThrowError("Cannot find 'type' pipe supporting object 'some object'");
        });
    });
}
exports.main = main;
var PipeFactory = (function () {
    function PipeFactory(shouldSupport, pipe) {
        this.shouldSupport = shouldSupport;
        this.pipe = pipe;
    }
    PipeFactory.prototype.supports = function (obj) { return this.shouldSupport; };
    PipeFactory.prototype.create = function (cdRef) { return this.pipe; };
    return PipeFactory;
})();
//# sourceMappingURL=pipe_registry_spec.js.map