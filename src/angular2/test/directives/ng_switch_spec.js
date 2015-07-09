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
var ng_switch_1 = require('angular2/src/directives/ng_switch');
var test_bed_1 = require('angular2/src/test_lib/test_bed');
function main() {
    test_lib_1.describe('switch', function () {
        test_lib_1.describe('switch value changes', function () {
            test_lib_1.it('should switch amongst when values', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var template = '<div>' +
                    '<ul [ng-switch]="switchValue">' +
                    '<template [ng-switch-when]="\'a\'"><li>when a</li></template>' +
                    '<template [ng-switch-when]="\'b\'"><li>when b</li></template>' +
                    '</ul></div>';
                tb.createView(TestComponent, { html: template })
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('');
                    view.context.switchValue = 'a';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('when a');
                    view.context.switchValue = 'b';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('when b');
                    async.done();
                });
            }));
            test_lib_1.it('should switch amongst when values with fallback to default', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var template = '<div>' +
                    '<ul [ng-switch]="switchValue">' +
                    '<li template="ng-switch-when \'a\'">when a</li>' +
                    '<li template="ng-switch-default">when default</li>' +
                    '</ul></div>';
                tb.createView(TestComponent, { html: template })
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('when default');
                    view.context.switchValue = 'a';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('when a');
                    view.context.switchValue = 'b';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('when default');
                    async.done();
                });
            }));
            test_lib_1.it('should support multiple whens with the same value', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var template = '<div>' +
                    '<ul [ng-switch]="switchValue">' +
                    '<template [ng-switch-when]="\'a\'"><li>when a1;</li></template>' +
                    '<template [ng-switch-when]="\'b\'"><li>when b1;</li></template>' +
                    '<template [ng-switch-when]="\'a\'"><li>when a2;</li></template>' +
                    '<template [ng-switch-when]="\'b\'"><li>when b2;</li></template>' +
                    '<template [ng-switch-default]><li>when default1;</li></template>' +
                    '<template [ng-switch-default]><li>when default2;</li></template>' +
                    '</ul></div>';
                tb.createView(TestComponent, { html: template })
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('when default1;when default2;');
                    view.context.switchValue = 'a';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('when a1;when a2;');
                    view.context.switchValue = 'b';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('when b1;when b2;');
                    async.done();
                });
            }));
        });
        test_lib_1.describe('when values changes', function () {
            test_lib_1.it('should switch amongst when values', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var template = '<div>' +
                    '<ul [ng-switch]="switchValue">' +
                    '<template [ng-switch-when]="when1"><li>when 1;</li></template>' +
                    '<template [ng-switch-when]="when2"><li>when 2;</li></template>' +
                    '<template [ng-switch-default]><li>when default;</li></template>' +
                    '</ul></div>';
                tb.createView(TestComponent, { html: template })
                    .then(function (view) {
                    view.context.when1 = 'a';
                    view.context.when2 = 'b';
                    view.context.switchValue = 'a';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('when 1;');
                    view.context.switchValue = 'b';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('when 2;');
                    view.context.switchValue = 'c';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('when default;');
                    view.context.when1 = 'c';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('when 1;');
                    view.context.when1 = 'd';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getText(view.rootNodes[0])).toEqual('when default;');
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
        this.switchValue = null;
        this.when1 = null;
        this.when2 = null;
    }
    TestComponent = __decorate([
        angular2_1.Component({ selector: 'test-cmp' }),
        angular2_1.View({ directives: [ng_switch_1.NgSwitch, ng_switch_1.NgSwitchWhen, ng_switch_1.NgSwitchDefault] }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
})();
//# sourceMappingURL=ng_switch_spec.js.map