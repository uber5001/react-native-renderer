var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var test_lib_1 = require('angular2/test_lib');
var change_detection_1 = require('angular2/change_detection');
var DummyChangeDetector = (function (_super) {
    __extends(DummyChangeDetector, _super);
    function DummyChangeDetector() {
        _super.apply(this, arguments);
    }
    return DummyChangeDetector;
})(change_detection_1.ProtoChangeDetector);
function main() {
    test_lib_1.describe("PreGeneratedChangeDetection", function () {
        var proto;
        var def;
        test_lib_1.beforeEach(function () {
            proto = new DummyChangeDetector();
            def = new change_detection_1.ChangeDetectorDefinition('id', null, [], [], []);
        });
        test_lib_1.it("should return a proto change detector when one is available", function () {
            var map = { 'id': function (registry) { return proto; } };
            var cd = new change_detection_1.PreGeneratedChangeDetection(null, map);
            test_lib_1.expect(cd.createProtoChangeDetector(def)).toBe(proto);
        });
        test_lib_1.it("should delegate to dynamic change detection otherwise", function () {
            var cd = new change_detection_1.PreGeneratedChangeDetection(null, {});
            test_lib_1.expect(cd.createProtoChangeDetector(def)).toBeAnInstanceOf(change_detection_1.DynamicProtoChangeDetector);
        });
    });
}
exports.main = main;
//# sourceMappingURL=change_detection_spec.js.map