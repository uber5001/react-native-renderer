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
var test_lib_1 = require('angular2/test_lib');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var test_bed_1 = require('angular2/src/test_lib/test_bed');
var angular2_1 = require('angular2/angular2');
var ng_if_1 = require('angular2/src/directives/ng_if');
function main() {
    test_lib_1.describe('if directive', function () {
        test_lib_1.it('should work in a template attribute', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var html = '<div><copy-me template="ng-if booleanCondition">hello</copy-me></div>';
            tb.createView(TestComponent, { html: html })
                .then(function (view) {
                view.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(1);
                test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('hello');
                async.done();
            });
        }));
        test_lib_1.it('should work in a template element', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var html = '<div><template [ng-if]="booleanCondition"><copy-me>hello2</copy-me></template></div>';
            tb.createView(TestComponent, { html: html })
                .then(function (view) {
                view.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(1);
                test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('hello2');
                async.done();
            });
        }));
        test_lib_1.it('should toggle node when condition changes', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var html = '<div><copy-me template="ng-if booleanCondition">hello</copy-me></div>';
            tb.createView(TestComponent, { html: html })
                .then(function (view) {
                view.context.booleanCondition = false;
                view.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(0);
                test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('');
                view.context.booleanCondition = true;
                view.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(1);
                test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('hello');
                view.context.booleanCondition = false;
                view.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(0);
                test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('');
                async.done();
            });
        }));
        test_lib_1.it('should handle nested if correctly', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var html = '<div><template [ng-if]="booleanCondition"><copy-me *ng-if="nestedBooleanCondition">hello</copy-me></template></div>';
            tb.createView(TestComponent, { html: html })
                .then(function (view) {
                view.context.booleanCondition = false;
                view.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(0);
                test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('');
                view.context.booleanCondition = true;
                view.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(1);
                test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('hello');
                view.context.nestedBooleanCondition = false;
                view.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(0);
                test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('');
                view.context.nestedBooleanCondition = true;
                view.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(1);
                test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('hello');
                view.context.booleanCondition = false;
                view.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(0);
                test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('');
                async.done();
            });
        }));
        test_lib_1.it('should update several nodes with if', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var html = '<div>' +
                '<copy-me template="ng-if numberCondition + 1 >= 2">helloNumber</copy-me>' +
                '<copy-me template="ng-if stringCondition == \'foo\'">helloString</copy-me>' +
                '<copy-me template="ng-if functionCondition(stringCondition, numberCondition)">helloFunction</copy-me>' +
                '</div>';
            tb.createView(TestComponent, { html: html })
                .then(function (view) {
                view.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(3);
                test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0]))
                    .toEqual('helloNumberhelloStringhelloFunction');
                view.context.numberCondition = 0;
                view.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(1);
                test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('helloString');
                view.context.numberCondition = 1;
                view.context.stringCondition = "bar";
                view.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(1);
                test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('helloNumber');
                async.done();
            });
        }));
        if (!test_lib_1.IS_DARTIUM) {
            test_lib_1.it('should not add the element twice if the condition goes from true to true (JS)', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var html = '<div><copy-me template="ng-if numberCondition">hello</copy-me></div>';
                tb.createView(TestComponent, { html: html })
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(1);
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('hello');
                    view.context.numberCondition = 2;
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(1);
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('hello');
                    async.done();
                });
            }));
            test_lib_1.it('should not recreate the element if the condition goes from true to true (JS)', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var html = '<div><copy-me template="ng-if numberCondition">hello</copy-me></div>';
                tb.createView(TestComponent, { html: html })
                    .then(function (view) {
                    view.detectChanges();
                    dom_adapter_1.DOM.addClass(view.rootNodes[0].childNodes[1], "foo");
                    view.context.numberCondition = 2;
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.hasClass(view.rootNodes[0].childNodes[1], "foo")).toBe(true);
                    async.done();
                });
            }));
        }
        if (test_lib_1.IS_DARTIUM) {
            test_lib_1.it('should not create the element if the condition is not a boolean (DART)', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var html = '<div><copy-me template="ng-if numberCondition">hello</copy-me></div>';
                tb.createView(TestComponent, { html: html })
                    .then(function (view) {
                    test_lib_1.expect(function () { return view.detectChanges(); }).toThrowError();
                    test_lib_1.expect(dom_adapter_1.DOM.querySelectorAll(view.rootNodes[0], 'copy-me').length).toEqual(0);
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('');
                    async.done();
                });
            }));
        }
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
        this.booleanCondition = true;
        this.nestedBooleanCondition = true;
        this.numberCondition = 1;
        this.stringCondition = "foo";
        this.functionCondition = function (s, n) { return s == "foo" && n == 1; };
    }
    TestComponent = __decorate([
        angular2_1.Component({ selector: 'test-cmp' }),
        angular2_1.View({ directives: [ng_if_1.NgIf] }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
})();
//# sourceMappingURL=ng_if_spec.js.map