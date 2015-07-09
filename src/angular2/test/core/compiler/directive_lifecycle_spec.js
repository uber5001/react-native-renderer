var test_lib_1 = require('angular2/test_lib');
var annotations_1 = require('angular2/src/core/annotations_impl/annotations');
var element_injector_1 = require('angular2/src/core/compiler/element_injector');
function main() {
    test_lib_1.describe('Create DirectiveMetadata', function () {
        test_lib_1.describe('lifecycle', function () {
            function metadata(type, annotation) {
                return element_injector_1.DirectiveBinding.createFromType(type, annotation).metadata;
            }
            test_lib_1.describe("onChange", function () {
                test_lib_1.it("should be true when the directive has the onChange method", function () {
                    test_lib_1.expect(metadata(DirectiveWithOnChangeMethod, new annotations_1.Directive({})).callOnChange).toBe(true);
                });
                test_lib_1.it("should be true when the lifecycle includes onChange", function () {
                    test_lib_1.expect(metadata(DirectiveNoHooks, new annotations_1.Directive({ lifecycle: [annotations_1.onChange] })).callOnChange)
                        .toBe(true);
                });
                test_lib_1.it("should be false otherwise", function () { test_lib_1.expect(metadata(DirectiveNoHooks, new annotations_1.Directive()).callOnChange).toBe(false); });
                test_lib_1.it("should be false when empty lifecycle", function () {
                    test_lib_1.expect(metadata(DirectiveWithOnChangeMethod, new annotations_1.Directive({ lifecycle: [] })).callOnChange)
                        .toBe(false);
                });
            });
            test_lib_1.describe("onDestroy", function () {
                test_lib_1.it("should be true when the directive has the onDestroy method", function () {
                    test_lib_1.expect(metadata(DirectiveWithOnDestroyMethod, new annotations_1.Directive({})).callOnDestroy)
                        .toBe(true);
                });
                test_lib_1.it("should be true when the lifecycle includes onDestroy", function () {
                    test_lib_1.expect(metadata(DirectiveNoHooks, new annotations_1.Directive({ lifecycle: [annotations_1.onDestroy] })).callOnDestroy)
                        .toBe(true);
                });
                test_lib_1.it("should be false otherwise", function () {
                    test_lib_1.expect(metadata(DirectiveNoHooks, new annotations_1.Directive()).callOnDestroy).toBe(false);
                });
            });
            test_lib_1.describe("onInit", function () {
                test_lib_1.it("should be true when the directive has the onInit method", function () {
                    test_lib_1.expect(metadata(DirectiveWithOnInitMethod, new annotations_1.Directive({})).callOnInit).toBe(true);
                });
                test_lib_1.it("should be true when the lifecycle includes onDestroy", function () {
                    test_lib_1.expect(metadata(DirectiveNoHooks, new annotations_1.Directive({ lifecycle: [annotations_1.onInit] })).callOnInit)
                        .toBe(true);
                });
                test_lib_1.it("should be false otherwise", function () { test_lib_1.expect(metadata(DirectiveNoHooks, new annotations_1.Directive()).callOnInit).toBe(false); });
            });
            test_lib_1.describe("onCheck", function () {
                test_lib_1.it("should be true when the directive has the onCheck method", function () {
                    test_lib_1.expect(metadata(DirectiveWithOnCheckMethod, new annotations_1.Directive({})).callOnCheck).toBe(true);
                });
                test_lib_1.it("should be true when the lifecycle includes onCheck", function () {
                    test_lib_1.expect(metadata(DirectiveNoHooks, new annotations_1.Directive({ lifecycle: [annotations_1.onCheck] })).callOnCheck)
                        .toBe(true);
                });
                test_lib_1.it("should be false otherwise", function () { test_lib_1.expect(metadata(DirectiveNoHooks, new annotations_1.Directive()).callOnCheck).toBe(false); });
            });
            test_lib_1.describe("onAllChangesDone", function () {
                test_lib_1.it("should be true when the directive has the onAllChangesDone method", function () {
                    test_lib_1.expect(metadata(DirectiveWithOnAllChangesDoneMethod, new annotations_1.Directive({})).callOnAllChangesDone)
                        .toBe(true);
                });
                test_lib_1.it("should be true when the lifecycle includes onAllChangesDone", function () {
                    test_lib_1.expect(metadata(DirectiveNoHooks, new annotations_1.Directive({ lifecycle: [annotations_1.onAllChangesDone] }))
                        .callOnAllChangesDone)
                        .toBe(true);
                });
                test_lib_1.it("should be false otherwise", function () {
                    test_lib_1.expect(metadata(DirectiveNoHooks, new annotations_1.Directive()).callOnAllChangesDone).toBe(false);
                });
            });
        });
    });
}
exports.main = main;
var DirectiveNoHooks = (function () {
    function DirectiveNoHooks() {
    }
    return DirectiveNoHooks;
})();
var DirectiveWithOnChangeMethod = (function () {
    function DirectiveWithOnChangeMethod() {
    }
    DirectiveWithOnChangeMethod.prototype.onChange = function (_) { };
    return DirectiveWithOnChangeMethod;
})();
var DirectiveWithOnInitMethod = (function () {
    function DirectiveWithOnInitMethod() {
    }
    DirectiveWithOnInitMethod.prototype.onInit = function () { };
    return DirectiveWithOnInitMethod;
})();
var DirectiveWithOnCheckMethod = (function () {
    function DirectiveWithOnCheckMethod() {
    }
    DirectiveWithOnCheckMethod.prototype.onCheck = function () { };
    return DirectiveWithOnCheckMethod;
})();
var DirectiveWithOnDestroyMethod = (function () {
    function DirectiveWithOnDestroyMethod() {
    }
    DirectiveWithOnDestroyMethod.prototype.onDestroy = function (_) { };
    return DirectiveWithOnDestroyMethod;
})();
var DirectiveWithOnAllChangesDoneMethod = (function () {
    function DirectiveWithOnAllChangesDoneMethod() {
    }
    DirectiveWithOnAllChangesDoneMethod.prototype.onAllChangesDone = function () { };
    return DirectiveWithOnAllChangesDoneMethod;
})();
//# sourceMappingURL=directive_lifecycle_spec.js.map