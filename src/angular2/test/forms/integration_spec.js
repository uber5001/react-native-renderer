var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var test_lib_1 = require('angular2/test_lib');
var test_bed_1 = require('angular2/src/test_lib/test_bed');
var directives_1 = require('angular2/directives');
var forms_1 = require('angular2/forms');
function main() {
    test_lib_1.describe("integration tests", function () {
        test_lib_1.it("should initialize DOM elements with the given form object", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var ctx = MyComp.create({ form: new forms_1.ControlGroup({ "login": new forms_1.Control("loginValue") }) });
            var t = "<div [form-model]=\"form\">\n                <input type=\"text\" control=\"login\">\n               </div>";
            tb.createView(MyComp, { context: ctx, html: t })
                .then(function (view) {
                view.detectChanges();
                var input = view.querySelector("input");
                test_lib_1.expect(input.value).toEqual("loginValue");
                async.done();
            });
        }));
        test_lib_1.it("should update the control group values on DOM change", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var form = new forms_1.ControlGroup({ "login": new forms_1.Control("oldValue") });
            var ctx = MyComp.create({ form: form });
            var t = "<div [form-model]=\"form\">\n                <input type=\"text\" control=\"login\">\n              </div>";
            tb.createView(MyComp, { context: ctx, html: t })
                .then(function (view) {
                view.detectChanges();
                var input = view.querySelector("input");
                input.value = "updatedValue";
                test_lib_1.dispatchEvent(input, "change");
                test_lib_1.expect(form.value).toEqual({ "login": "updatedValue" });
                async.done();
            });
        }));
        test_lib_1.it("should work with single controls", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var control = new forms_1.Control("loginValue");
            var ctx = MyComp.create({ form: control });
            var t = "<div><input type=\"text\" [form-control]=\"form\"></div>";
            tb.createView(MyComp, { context: ctx, html: t })
                .then(function (view) {
                view.detectChanges();
                var input = view.querySelector("input");
                test_lib_1.expect(input.value).toEqual("loginValue");
                input.value = "updatedValue";
                test_lib_1.dispatchEvent(input, "change");
                test_lib_1.expect(control.value).toEqual("updatedValue");
                async.done();
            });
        }));
        test_lib_1.it("should update DOM elements when rebinding the control group", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var form = new forms_1.ControlGroup({ "login": new forms_1.Control("oldValue") });
            var ctx = MyComp.create({ form: form });
            var t = "<div [form-model]=\"form\">\n                <input type=\"text\" control=\"login\">\n               </div>";
            tb.createView(MyComp, { context: ctx, html: t })
                .then(function (view) {
                view.detectChanges();
                ctx.form = new forms_1.ControlGroup({ "login": new forms_1.Control("newValue") });
                view.detectChanges();
                var input = view.querySelector("input");
                test_lib_1.expect(input.value).toEqual("newValue");
                async.done();
            });
        }));
        test_lib_1.describe("different control types", function () {
            test_lib_1.it("should support <input type=text>", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var ctx = MyComp.create({ form: new forms_1.ControlGroup({ "text": new forms_1.Control("old") }) });
                var t = "<div [form-model]=\"form\">\n                  <input type=\"text\" control=\"text\">\n                </div>";
                tb.createView(MyComp, { context: ctx, html: t })
                    .then(function (view) {
                    view.detectChanges();
                    var input = view.querySelector("input");
                    test_lib_1.expect(input.value).toEqual("old");
                    input.value = "new";
                    test_lib_1.dispatchEvent(input, "input");
                    test_lib_1.expect(ctx.form.value).toEqual({ "text": "new" });
                    async.done();
                });
            }));
            test_lib_1.it("should support <input> without type", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var ctx = MyComp.create({ form: new forms_1.ControlGroup({ "text": new forms_1.Control("old") }) });
                var t = "<div [form-model]=\"form\">\n                  <input control=\"text\">\n                </div>";
                tb.createView(MyComp, { context: ctx, html: t })
                    .then(function (view) {
                    view.detectChanges();
                    var input = view.querySelector("input");
                    test_lib_1.expect(input.value).toEqual("old");
                    input.value = "new";
                    test_lib_1.dispatchEvent(input, "input");
                    test_lib_1.expect(ctx.form.value).toEqual({ "text": "new" });
                    async.done();
                });
            }));
            test_lib_1.it("should support <textarea>", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var ctx = MyComp.create({ form: new forms_1.ControlGroup({ "text": new forms_1.Control('old') }) });
                var t = "<div [form-model]=\"form\">\n                  <textarea control=\"text\"></textarea>\n                </div>";
                tb.createView(MyComp, { context: ctx, html: t })
                    .then(function (view) {
                    view.detectChanges();
                    var textarea = view.querySelector("textarea");
                    test_lib_1.expect(textarea.value).toEqual("old");
                    textarea.value = "new";
                    test_lib_1.dispatchEvent(textarea, "input");
                    test_lib_1.expect(ctx.form.value).toEqual({ "text": 'new' });
                    async.done();
                });
            }));
            test_lib_1.it("should support <type=checkbox>", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var ctx = MyComp.create({ form: new forms_1.ControlGroup({ "checkbox": new forms_1.Control(true) }) });
                var t = "<div [form-model]=\"form\">\n                  <input type=\"checkbox\" control=\"checkbox\">\n                </div>";
                tb.createView(MyComp, { context: ctx, html: t })
                    .then(function (view) {
                    view.detectChanges();
                    var input = view.querySelector("input");
                    test_lib_1.expect(input.checked).toBe(true);
                    input.checked = false;
                    test_lib_1.dispatchEvent(input, "change");
                    test_lib_1.expect(ctx.form.value).toEqual({ "checkbox": false });
                    async.done();
                });
            }));
            test_lib_1.it("should support <select>", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var ctx = MyComp.create({ form: new forms_1.ControlGroup({ "city": new forms_1.Control("SF") }) });
                var t = "<div [form-model]=\"form\">\n                    <select control=\"city\">\n                      <option value=\"SF\"></option>\n                      <option value=\"NYC\"></option>\n                    </select>\n                  </div>";
                tb.createView(MyComp, { context: ctx, html: t })
                    .then(function (view) {
                    view.detectChanges();
                    var select = view.querySelector("select");
                    var sfOption = view.querySelector("option");
                    test_lib_1.expect(select.value).toEqual('SF');
                    test_lib_1.expect(sfOption.selected).toBe(true);
                    select.value = 'NYC';
                    test_lib_1.dispatchEvent(select, "change");
                    test_lib_1.expect(ctx.form.value).toEqual({ "city": 'NYC' });
                    test_lib_1.expect(sfOption.selected).toBe(false);
                    async.done();
                });
            }));
            test_lib_1.it("should support custom value accessors", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var ctx = MyComp.create({ form: new forms_1.ControlGroup({ "name": new forms_1.Control("aa") }) });
                var t = "<div [form-model]=\"form\">\n                  <input type=\"text\" control=\"name\" wrapped-value>\n                </div>";
                tb.createView(MyComp, { context: ctx, html: t })
                    .then(function (view) {
                    view.detectChanges();
                    var input = view.querySelector("input");
                    test_lib_1.expect(input.value).toEqual("!aa!");
                    input.value = "!bb!";
                    test_lib_1.dispatchEvent(input, "change");
                    test_lib_1.expect(ctx.form.value).toEqual({ "name": "bb" });
                    async.done();
                });
            }));
        });
        test_lib_1.describe("validations", function () {
            test_lib_1.it("should use validators defined in html", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var form = new forms_1.ControlGroup({ "login": new forms_1.Control("aa") });
                var ctx = MyComp.create({ form: form });
                var t = "<div [form-model]=\"form\">\n                  <input type=\"text\" control=\"login\" required>\n                 </div>";
                tb.createView(MyComp, { context: ctx, html: t })
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(form.valid).toEqual(true);
                    var input = view.querySelector("input");
                    input.value = "";
                    test_lib_1.dispatchEvent(input, "change");
                    test_lib_1.expect(form.valid).toEqual(false);
                    async.done();
                });
            }));
            test_lib_1.it("should use validators defined in the model", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var form = new forms_1.ControlGroup({ "login": new forms_1.Control("aa", forms_1.Validators.required) });
                var ctx = MyComp.create({ form: form });
                var t = "<div [form-model]=\"form\">\n                  <input type=\"text\" control=\"login\">\n                 </div>";
                tb.createView(MyComp, { context: ctx, html: t })
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(form.valid).toEqual(true);
                    var input = view.querySelector("input");
                    input.value = "";
                    test_lib_1.dispatchEvent(input, "change");
                    test_lib_1.expect(form.valid).toEqual(false);
                    async.done();
                });
            }));
        });
        test_lib_1.describe("nested forms", function () {
            test_lib_1.it("should init DOM with the given form object", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var form = new forms_1.ControlGroup({ "nested": new forms_1.ControlGroup({ "login": new forms_1.Control("value") }) });
                var ctx = MyComp.create({ form: form });
                var t = "<div [form-model]=\"form\">\n                  <div control-group=\"nested\">\n                    <input type=\"text\" control=\"login\">\n                  </div>\n              </div>";
                tb.createView(MyComp, { context: ctx, html: t })
                    .then(function (view) {
                    view.detectChanges();
                    var input = view.querySelector("input");
                    test_lib_1.expect(input.value).toEqual("value");
                    async.done();
                });
            }));
            test_lib_1.it("should update the control group values on DOM change", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var form = new forms_1.ControlGroup({ "nested": new forms_1.ControlGroup({ "login": new forms_1.Control("value") }) });
                var ctx = MyComp.create({ form: form });
                var t = "<div [form-model]=\"form\">\n                    <div control-group=\"nested\">\n                      <input type=\"text\" control=\"login\">\n                    </div>\n                </div>";
                tb.createView(MyComp, { context: ctx, html: t })
                    .then(function (view) {
                    view.detectChanges();
                    var input = view.querySelector("input");
                    input.value = "updatedValue";
                    test_lib_1.dispatchEvent(input, "change");
                    test_lib_1.expect(form.value).toEqual({ "nested": { "login": "updatedValue" } });
                    async.done();
                });
            }));
        });
        test_lib_1.describe("template-driven forms", function () {
            test_lib_1.it("should add new controls and control groups", test_lib_1.inject([test_bed_1.TestBed], test_lib_1.fakeAsync(function (tb) {
                var ctx = MyComp.create({ name: null });
                var t = "<div form>\n                     <div control-group=\"user\">\n                      <input type=\"text\" control=\"login\">\n                     </div>\n               </div>";
                tb.createView(MyComp, { context: ctx, html: t })
                    .then(function (view) {
                    view.detectChanges();
                    var form = view.rawView.elementInjectors[0].get(forms_1.TemplateDrivenFormDirective);
                    test_lib_1.expect(form.controls['user']).not.toBeDefined();
                    test_lib_1.flushMicrotasks();
                    test_lib_1.expect(form.controls['user']).toBeDefined();
                    test_lib_1.expect(form.controls['user'].controls['login']).toBeDefined();
                });
                test_lib_1.flushMicrotasks();
            })));
            test_lib_1.it("should remove controls", test_lib_1.inject([test_bed_1.TestBed], test_lib_1.fakeAsync(function (tb) {
                var ctx = MyComp.create({ name: 'show' });
                var t = "<div form>\n                    <div *ng-if=\"name == 'show'\">\n                      <input type=\"text\" control=\"login\">\n                    </div>\n                  </div>";
                tb.createView(MyComp, { context: ctx, html: t })
                    .then(function (view) {
                    view.detectChanges();
                    var form = view.rawView.elementInjectors[0].get(forms_1.TemplateDrivenFormDirective);
                    test_lib_1.flushMicrotasks();
                    test_lib_1.expect(form.controls['login']).toBeDefined();
                    ctx.name = 'hide';
                    view.detectChanges();
                    test_lib_1.flushMicrotasks();
                    test_lib_1.expect(form.controls['login']).not.toBeDefined();
                });
                test_lib_1.flushMicrotasks();
            })));
            test_lib_1.it("should remove control groups", test_lib_1.inject([test_bed_1.TestBed], test_lib_1.fakeAsync(function (tb) {
                var ctx = MyComp.create({ name: 'show' });
                var t = "<div form>\n                     <div *ng-if=\"name=='show'\" control-group=\"user\">\n                      <input type=\"text\" control=\"login\">\n                     </div>\n               </div>";
                tb.createView(MyComp, { context: ctx, html: t })
                    .then(function (view) {
                    view.detectChanges();
                    var form = view.rawView.elementInjectors[0].get(forms_1.TemplateDrivenFormDirective);
                    test_lib_1.flushMicrotasks();
                    test_lib_1.expect(form.controls['user']).toBeDefined();
                    ctx.name = 'hide';
                    view.detectChanges();
                    test_lib_1.flushMicrotasks();
                    test_lib_1.expect(form.controls['user']).not.toBeDefined();
                });
                test_lib_1.flushMicrotasks();
            })));
        });
    });
}
exports.main = main;
var WrappedValue = (function () {
    function WrappedValue(cd) {
        cd.valueAccessor = this;
    }
    WrappedValue.prototype.writeValue = function (value) { this.value = "!" + value + "!"; };
    WrappedValue.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    WrappedValue.prototype.handleOnChange = function (value) { this.onChange(value.substring(1, value.length - 1)); };
    WrappedValue = __decorate([
        angular2_1.Directive({
            selector: '[wrapped-value]',
            hostListeners: { 'change': 'handleOnChange($event.target.value)' },
            hostProperties: { 'value': 'value' }
        }), 
        __metadata('design:paramtypes', [forms_1.ControlDirective])
    ], WrappedValue);
    return WrappedValue;
})();
var MyComp = (function () {
    function MyComp() {
    }
    MyComp.create = function (_a) {
        var form = _a.form, name = _a.name;
        var mc = new MyComp();
        mc.form = form;
        mc.name = name;
        return mc;
    };
    MyComp = __decorate([
        angular2_1.Component({ selector: "my-comp" }),
        angular2_1.View({ directives: [forms_1.formDirectives, WrappedValue, forms_1.RequiredValidatorDirective, directives_1.NgIf] }), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
//# sourceMappingURL=integration_spec.js.map