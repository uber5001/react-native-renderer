var test_lib_1 = require('angular2/test_lib');
var forms_1 = require('angular2/forms');
var DummyControlValueAccessor = (function () {
    function DummyControlValueAccessor() {
    }
    DummyControlValueAccessor.prototype.registerOnChange = function (fn) { };
    DummyControlValueAccessor.prototype.writeValue = function (obj) { this.writtenValue = obj; };
    return DummyControlValueAccessor;
})();
function main() {
    test_lib_1.describe("Form Directives", function () {
        test_lib_1.describe("FormModelDirective", function () {
            var form;
            var formModel;
            var loginControlDir;
            test_lib_1.beforeEach(function () {
                form = new forms_1.FormModelDirective();
                formModel = new forms_1.ControlGroup({ "login": new forms_1.Control(null) });
                form.form = formModel;
                loginControlDir = new forms_1.ControlNameDirective(form);
                loginControlDir.name = "login";
                loginControlDir.valueAccessor = new DummyControlValueAccessor();
            });
            test_lib_1.describe("addControl", function () {
                test_lib_1.it("should throw when no control found", function () {
                    var dir = new forms_1.ControlNameDirective(form);
                    dir.name = "invalidName";
                    test_lib_1.expect(function () { return form.addControl(dir); })
                        .toThrowError(new RegExp("Cannot find control 'invalidName'"));
                });
                test_lib_1.it("should throw when no value accessor", function () {
                    var dir = new forms_1.ControlNameDirective(form);
                    dir.name = "login";
                    test_lib_1.expect(function () { return form.addControl(dir); })
                        .toThrowError(new RegExp("No value accessor for 'login'"));
                });
                test_lib_1.it("should set up validator", function () {
                    loginControlDir.validator = forms_1.Validators.required;
                    test_lib_1.expect(formModel.find(["login"]).valid).toBe(true);
                    // this will add the required validator and recalculate the validity
                    form.addControl(loginControlDir);
                    test_lib_1.expect(formModel.find(["login"]).valid).toBe(false);
                });
                test_lib_1.it("should write value to the DOM", function () {
                    formModel.find(["login"]).value = "initValue";
                    form.addControl(loginControlDir);
                    test_lib_1.expect(loginControlDir.valueAccessor.writtenValue).toEqual("initValue");
                });
                test_lib_1.it("should add the directive to the list of directives included in the form", function () {
                    form.addControl(loginControlDir);
                    test_lib_1.expect(form.directives).toEqual([loginControlDir]);
                });
            });
            test_lib_1.describe("removeControl", function () {
                test_lib_1.it("should remove the directive to the list of directives included in the form", function () {
                    form.addControl(loginControlDir);
                    form.removeControl(loginControlDir);
                    test_lib_1.expect(form.directives).toEqual([]);
                });
            });
            test_lib_1.describe("onChange", function () {
                test_lib_1.it("should update dom values of all the directives", function () {
                    form.addControl(loginControlDir);
                    formModel.find(["login"]).value = "new value";
                    form.onChange(null);
                    test_lib_1.expect(loginControlDir.valueAccessor.writtenValue).toEqual("new value");
                });
            });
        });
        test_lib_1.describe("TemplateDrivenFormDirective", function () {
            var form;
            var formModel;
            var loginControlDir;
            var personControlGroupDir;
            test_lib_1.beforeEach(function () {
                form = new forms_1.TemplateDrivenFormDirective();
                formModel = form.form;
                personControlGroupDir = new forms_1.ControlGroupDirective(form);
                personControlGroupDir.name = "person";
                loginControlDir = new forms_1.ControlNameDirective(personControlGroupDir);
                loginControlDir.name = "login";
                loginControlDir.valueAccessor = new DummyControlValueAccessor();
            });
            test_lib_1.describe("addControl & addControlGroup", function () {
                test_lib_1.it("should create a control with the given name", test_lib_1.fakeAsync(function () {
                    form.addControlGroup(personControlGroupDir);
                    form.addControl(loginControlDir);
                    test_lib_1.flushMicrotasks();
                    test_lib_1.expect(formModel.find(["person", "login"])).not.toBeNull;
                }));
                // should update the form's value and validity
            });
            test_lib_1.describe("removeControl & removeControlGroup", function () {
                test_lib_1.it("should remove control", test_lib_1.fakeAsync(function () {
                    form.addControlGroup(personControlGroupDir);
                    form.addControl(loginControlDir);
                    form.removeControlGroup(personControlGroupDir);
                    form.removeControl(loginControlDir);
                    test_lib_1.flushMicrotasks();
                    test_lib_1.expect(formModel.find(["person"])).toBeNull();
                    test_lib_1.expect(formModel.find(["person", "login"])).toBeNull();
                }));
                // should update the form's value and validity
            });
        });
        test_lib_1.describe("FormControlDirective", function () {
            var controlDir;
            var control;
            test_lib_1.beforeEach(function () {
                controlDir = new forms_1.FormControlDirective();
                controlDir.valueAccessor = new DummyControlValueAccessor();
                control = new forms_1.Control(null);
                controlDir.control = control;
            });
            test_lib_1.it("should set up validator", function () {
                controlDir.validator = forms_1.Validators.required;
                test_lib_1.expect(control.valid).toBe(true);
                // this will add the required validator and recalculate the validity
                controlDir.onChange(null);
                test_lib_1.expect(control.valid).toBe(false);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=directives_spec.js.map