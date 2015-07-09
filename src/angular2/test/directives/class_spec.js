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
var collection_1 = require('angular2/src/facade/collection');
var angular2_1 = require('angular2/angular2');
var test_bed_1 = require('angular2/src/test_lib/test_bed');
var class_1 = require('angular2/src/directives/class');
function main() {
    test_lib_1.describe('binding to CSS class list', function () {
        test_lib_1.it('should add classes specified in an object literal', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var template = '<div [class]="{foo: true, bar: false}"></div>';
            tb.createView(TestComponent, { html: template })
                .then(function (view) {
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('ng-binding foo');
                async.done();
            });
        }));
        test_lib_1.it('should add and remove classes based on changes in object literal values', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var template = '<div [class]="{foo: condition, bar: !condition}"></div>';
            tb.createView(TestComponent, { html: template })
                .then(function (view) {
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('ng-binding foo');
                view.context.condition = false;
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('ng-binding bar');
                async.done();
            });
        }));
        test_lib_1.it('should add and remove classes based on changes to the expression object', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var template = '<div [class]="expr"></div>';
            tb.createView(TestComponent, { html: template })
                .then(function (view) {
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('ng-binding foo');
                collection_1.StringMapWrapper.set(view.context.expr, 'bar', true);
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('ng-binding foo bar');
                collection_1.StringMapWrapper.set(view.context.expr, 'baz', true);
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('ng-binding foo bar baz');
                collection_1.StringMapWrapper.delete(view.context.expr, 'bar');
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('ng-binding foo baz');
                async.done();
            });
        }));
        test_lib_1.it('should retain existing classes when expression evaluates to null', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var template = '<div [class]="expr"></div>';
            tb.createView(TestComponent, { html: template })
                .then(function (view) {
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('ng-binding foo');
                view.context.expr = null;
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('ng-binding foo');
                view.context.expr = {
                    'foo': false,
                    'bar': true
                };
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('ng-binding bar');
                async.done();
            });
        }));
        test_lib_1.it('should co-operate with the class attribute', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var template = '<div [class]="expr" class="init foo"></div>';
            tb.createView(TestComponent, { html: template })
                .then(function (view) {
                collection_1.StringMapWrapper.set(view.context.expr, 'bar', true);
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('init foo ng-binding bar');
                collection_1.StringMapWrapper.set(view.context.expr, 'foo', false);
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('init ng-binding bar');
                async.done();
            });
        }));
        test_lib_1.it('should co-operate with the class attribute and class.name binding', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var template = '<div class="init foo" [class]="expr" [class.baz]="condition"></div>';
            tb.createView(TestComponent, { html: template })
                .then(function (view) {
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('init foo ng-binding baz');
                collection_1.StringMapWrapper.set(view.context.expr, 'bar', true);
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('init foo ng-binding baz bar');
                collection_1.StringMapWrapper.set(view.context.expr, 'foo', false);
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('init ng-binding baz bar');
                view.context.condition = false;
                view.detectChanges();
                test_lib_1.expect(view.rootNodes[0].className).toEqual('init ng-binding bar');
                async.done();
            });
        }));
    });
}
exports.main = main;
var TestComponent = (function () {
    function TestComponent() {
        this.condition = true;
        this.expr = { 'foo': true, 'bar': false };
    }
    TestComponent = __decorate([
        angular2_1.Component({ selector: 'test-cmp' }),
        angular2_1.View({ directives: [class_1.CSSClass] }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
})();
//# sourceMappingURL=class_spec.js.map