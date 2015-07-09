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
var di_1 = require('angular2/di');
var annotations_1 = require('angular2/annotations');
var viewAnn = require('angular2/src/core/annotations_impl/view');
var ng_if_1 = require('angular2/src/directives/ng_if');
var ChildComp = (function () {
    function ChildComp() {
        this.childBinding = 'Child';
    }
    ChildComp = __decorate([
        annotations_1.Component({ selector: 'child-comp' }),
        annotations_1.View({ template: "<snap>Original {{childBinding}}</span>", directives: [] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ChildComp);
    return ChildComp;
})();
var MockChildComp = (function () {
    function MockChildComp() {
    }
    MockChildComp = __decorate([
        annotations_1.Component({ selector: 'child-comp' }),
        annotations_1.View({ template: "<span>Mock</span>" }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MockChildComp);
    return MockChildComp;
})();
var ParentComp = (function () {
    function ParentComp() {
    }
    ParentComp = __decorate([
        annotations_1.Component({ selector: 'parent-comp' }),
        annotations_1.View({ template: "Parent(<child-comp></child-comp>)", directives: [ChildComp] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ParentComp);
    return ParentComp;
})();
var MyIfComp = (function () {
    function MyIfComp() {
        this.showMore = false;
    }
    MyIfComp = __decorate([
        annotations_1.Component({ selector: 'my-if-comp' }),
        annotations_1.View({ template: "MyIf(<span *ng-if=\"showMore\">More</span>)", directives: [ng_if_1.NgIf] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyIfComp);
    return MyIfComp;
})();
function main() {
    test_lib_1.describe('test component builder', function () {
        test_lib_1.it('should instantiate a component with valid DOM', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(ChildComp).then(function (rootTestComponent) {
                rootTestComponent.detectChanges();
                test_lib_1.expect(rootTestComponent.domElement).toHaveText('Original Child');
                async.done();
            });
        }));
        test_lib_1.it('should allow changing members of the component', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(MyIfComp).then(function (rootTestComponent) {
                rootTestComponent.detectChanges();
                test_lib_1.expect(rootTestComponent.domElement).toHaveText('MyIf()');
                rootTestComponent.componentInstance.showMore = true;
                rootTestComponent.detectChanges();
                test_lib_1.expect(rootTestComponent.domElement).toHaveText('MyIf(More)');
                async.done();
            });
        }));
        test_lib_1.it('should override a template', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideTemplate(MockChildComp, '<span>Mock</span>')
                .createAsync(MockChildComp)
                .then(function (rootTestComponent) {
                rootTestComponent.detectChanges();
                test_lib_1.expect(rootTestComponent.domElement).toHaveText('Mock');
                async.done();
            });
        }));
        test_lib_1.it('should override a view', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideView(ChildComp, new viewAnn.View({ template: '<span>Modified {{childBinding}}</span>' }))
                .createAsync(ChildComp)
                .then(function (rootTestComponent) {
                rootTestComponent.detectChanges();
                test_lib_1.expect(rootTestComponent.domElement).toHaveText('Modified Child');
                async.done();
            });
        }));
        test_lib_1.it('should override component dependencies', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.overrideDirective(ParentComp, ChildComp, MockChildComp)
                .createAsync(ParentComp)
                .then(function (rootTestComponent) {
                rootTestComponent.detectChanges();
                test_lib_1.expect(rootTestComponent.domElement).toHaveText('Parent(Mock)');
                async.done();
            });
        }));
    });
}
exports.main = main;
//# sourceMappingURL=test_component_builder_spec.js.map