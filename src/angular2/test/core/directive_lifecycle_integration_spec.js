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
var test_bed_1 = require('angular2/src/test_lib/test_bed');
var angular2_1 = require('angular2/angular2');
var viewAnn = require('angular2/src/core/annotations_impl/view');
function main() {
    test_lib_1.describe('directive lifecycle integration spec', function () {
        var ctx;
        test_lib_1.beforeEach(function () { ctx = new MyComp(); });
        test_lib_1.it('should invoke lifecycle methods onChanges > onInit > onCheck', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            tb.overrideView(MyComp, new viewAnn.View({ template: '<div [field]="123" [lifecycle]></div>', directives: [LifecycleDir] }));
            tb.createView(MyComp, { context: ctx })
                .then(function (view) {
                var dir = view.rawView.elementInjectors[0].get(LifecycleDir);
                view.detectChanges();
                test_lib_1.expect(dir.log).toEqual(["onChanges", "onInit", "onCheck"]);
                view.detectChanges();
                test_lib_1.expect(dir.log).toEqual(["onChanges", "onInit", "onCheck", "onCheck"]);
                async.done();
            });
        }));
    });
}
exports.main = main;
var LifecycleDir = (function () {
    function LifecycleDir() {
        this.log = [];
    }
    LifecycleDir.prototype.onChange = function (_) { collection_1.ListWrapper.push(this.log, "onChanges"); };
    LifecycleDir.prototype.onInit = function () { collection_1.ListWrapper.push(this.log, "onInit"); };
    LifecycleDir.prototype.onCheck = function () { collection_1.ListWrapper.push(this.log, "onCheck"); };
    LifecycleDir = __decorate([
        angular2_1.Directive({ selector: "[lifecycle]", properties: ['field'], lifecycle: [angular2_1.onChange, angular2_1.onCheck, angular2_1.onInit] }), 
        __metadata('design:paramtypes', [])
    ], LifecycleDir);
    return LifecycleDir;
})();
var MyComp = (function () {
    function MyComp() {
    }
    MyComp = __decorate([
        angular2_1.Component({ selector: 'my-comp' }),
        angular2_1.View({ directives: [] }), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
//# sourceMappingURL=directive_lifecycle_integration_spec.js.map