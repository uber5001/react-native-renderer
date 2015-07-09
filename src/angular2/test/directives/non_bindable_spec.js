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
var angular2_1 = require('angular2/angular2');
var element_ref_1 = require('angular2/src/core/compiler/element_ref');
var ng_non_bindable_1 = require('angular2/src/directives/ng_non_bindable');
var test_bed_1 = require('angular2/src/test_lib/test_bed');
function main() {
    test_lib_1.describe('non-bindable', function () {
        test_lib_1.it('should not interpolate children', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var template = '<div>{{text}}<span ng-non-bindable>{{text}}</span></div>';
            tb.createView(TestComponent, { html: template })
                .then(function (view) {
                view.detectChanges();
                test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('foo{{text}}');
                async.done();
            });
        }));
        test_lib_1.it('should ignore directives on child nodes', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var template = '<div ng-non-bindable><span id=child test-dec>{{text}}</span></div>';
            tb.createView(TestComponent, { html: template })
                .then(function (view) {
                view.detectChanges();
                var span = dom_adapter_1.DOM.querySelector(view.rootNodes[0], '#child');
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(span, 'compiled')).toBeFalsy();
                async.done();
            });
        }));
        test_lib_1.it('should trigger directives on the same node', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var template = '<div><span id=child ng-non-bindable test-dec>{{text}}</span></div>';
            tb.createView(TestComponent, { html: template })
                .then(function (view) {
                view.detectChanges();
                var span = dom_adapter_1.DOM.querySelector(view.rootNodes[0], '#child');
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(span, 'compiled')).toBeTruthy();
                async.done();
            });
        }));
    });
}
exports.main = main;
var TestDirective = (function () {
    function TestDirective(el) {
        dom_adapter_1.DOM.addClass(el.domElement, 'compiled');
    }
    TestDirective = __decorate([
        angular2_1.Directive({ selector: '[test-dec]' }), 
        __metadata('design:paramtypes', [element_ref_1.ElementRef])
    ], TestDirective);
    return TestDirective;
})();
var TestComponent = (function () {
    function TestComponent() {
        this.text = 'foo';
    }
    TestComponent = __decorate([
        angular2_1.Component({ selector: 'test-cmp' }),
        angular2_1.View({ directives: [ng_non_bindable_1.NgNonBindable, TestDirective] }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
})();
//# sourceMappingURL=non_bindable_spec.js.map