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
var lang_1 = require('angular2/src/facade/lang');
var view_pool_1 = require('angular2/src/core/compiler/view_pool');
var di_1 = require('angular2/di');
var annotations_1 = require('angular2/annotations');
var MyComp = (function () {
    function MyComp() {
    }
    MyComp = __decorate([
        annotations_1.Component({ selector: 'my-comp' }),
        annotations_1.View({ directives: [] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
function main() {
    test_lib_1.describe('element probe', function () {
        test_lib_1.beforeEachBindings(function () { return [di_1.bind(view_pool_1.APP_VIEW_POOL_CAPACITY).toValue(0)]; });
        test_lib_1.it('should return a TestElement from a dom element', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(MyComp, '<div some-dir></div>')
                .createAsync(MyComp)
                .then(function (rootTestComponent) {
                test_lib_1.expect(test_lib_1.inspectDomElement(rootTestComponent.domElement).componentInstance)
                    .toBeAnInstanceOf(MyComp);
                async.done();
            });
        }));
        test_lib_1.it('should clean up whent the view is destroyed', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(MyComp, '')
                .createAsync(MyComp)
                .then(function (rootTestComponent) {
                rootTestComponent.destroy();
                test_lib_1.expect(test_lib_1.inspectDomElement(rootTestComponent.domElement)).toBe(null);
                async.done();
            });
        }));
        if (!test_lib_1.IS_DARTIUM) {
            test_lib_1.it('should provide a global function to inspect elements', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
                tcb.overrideTemplate(MyComp, '')
                    .createAsync(MyComp)
                    .then(function (rootTestComponent) {
                    test_lib_1.expect(lang_1.global['ngProbe'](rootTestComponent.domElement).componentInstance)
                        .toBeAnInstanceOf(MyComp);
                    async.done();
                });
            }));
        }
    });
}
exports.main = main;
//# sourceMappingURL=debug_element_view_listener_spec.js.map