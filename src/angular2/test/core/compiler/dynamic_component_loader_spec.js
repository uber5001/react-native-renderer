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
var test_bed_1 = require('angular2/src/test_lib/test_bed');
var di_1 = require('angular2/di');
var annotations_1 = require('angular2/annotations');
var viewAnn = require('angular2/src/core/annotations_impl/view');
var dynamic_component_loader_1 = require('angular2/src/core/compiler/dynamic_component_loader');
var element_ref_1 = require('angular2/src/core/compiler/element_ref');
var ng_if_1 = require('angular2/src/directives/ng_if');
var dom_renderer_1 = require('angular2/src/render/dom/dom_renderer');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var view_manager_1 = require('angular2/src/core/compiler/view_manager');
function main() {
    test_lib_1.describe('DynamicComponentLoader', function () {
        test_lib_1.describe("loading into existing location", function () {
            test_lib_1.it('should work', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<dynamic-comp #dynamic></dynamic-comp>',
                    directives: [DynamicComp]
                }));
                tb.createView(MyComp).then(function (view) {
                    var dynamicComponent = view.rawView.locals.get("dynamic");
                    test_lib_1.expect(dynamicComponent).toBeAnInstanceOf(DynamicComp);
                    dynamicComponent.done.then(function (_) {
                        view.detectChanges();
                        test_lib_1.expect(view.rootNodes).toHaveText('hello');
                        async.done();
                    });
                });
            }));
            test_lib_1.it('should inject dependencies of the dynamically-loaded component', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<dynamic-comp #dynamic></dynamic-comp>',
                    directives: [DynamicComp]
                }));
                tb.createView(MyComp).then(function (view) {
                    var dynamicComponent = view.rawView.locals.get("dynamic");
                    dynamicComponent.done.then(function (ref) {
                        test_lib_1.expect(ref.instance.dynamicallyCreatedComponentService)
                            .toBeAnInstanceOf(DynamicallyCreatedComponentService);
                        async.done();
                    });
                });
            }));
            test_lib_1.it('should allow to destroy and create them via viewcontainer directives', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<div><dynamic-comp #dynamic template="ng-if: ctxBoolProp"></dynamic-comp></div>',
                    directives: [DynamicComp, ng_if_1.NgIf]
                }));
                tb.createView(MyComp).then(function (view) {
                    view.context.ctxBoolProp = true;
                    view.detectChanges();
                    var dynamicComponent = view.rawView.viewContainers[0].views[0].locals.get("dynamic");
                    dynamicComponent.done.then(function (_) {
                        view.detectChanges();
                        test_lib_1.expect(view.rootNodes).toHaveText('hello');
                        view.context.ctxBoolProp = false;
                        view.detectChanges();
                        test_lib_1.expect(view.rawView.viewContainers[0].views.length)
                            .toBe(0);
                        test_lib_1.expect(view.rootNodes).toHaveText('');
                        view.context.ctxBoolProp = true;
                        view.detectChanges();
                        var dynamicComponent = view.rawView.viewContainers[0].views[0].locals.get("dynamic");
                        return dynamicComponent.done;
                    })
                        .then(function (_) {
                        view.detectChanges();
                        test_lib_1.expect(view.rootNodes).toHaveText('hello');
                        async.done();
                    });
                });
            }));
        });
        test_lib_1.describe("loading next to an existing location", function () {
            test_lib_1.it('should work', test_lib_1.inject([dynamic_component_loader_1.DynamicComponentLoader, test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (loader, tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<div><location #loc></location></div>', directives: [Location] }));
                tb.createView(MyComp).then(function (view) {
                    var location = view.rawView.locals.get("loc");
                    loader.loadNextToExistingLocation(DynamicallyLoaded, location.elementRef)
                        .then(function (ref) {
                        test_lib_1.expect(view.rootNodes).toHaveText("Location;DynamicallyLoaded;");
                        async.done();
                    });
                });
            }));
            test_lib_1.it('should return a disposable component ref', test_lib_1.inject([dynamic_component_loader_1.DynamicComponentLoader, test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (loader, tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<div><location #loc></location></div>', directives: [Location] }));
                tb.createView(MyComp).then(function (view) {
                    var location = view.rawView.locals.get("loc");
                    loader.loadNextToExistingLocation(DynamicallyLoaded, location.elementRef)
                        .then(function (ref) {
                        loader.loadNextToExistingLocation(DynamicallyLoaded2, location.elementRef)
                            .then(function (ref2) {
                            test_lib_1.expect(view.rootNodes)
                                .toHaveText("Location;DynamicallyLoaded;DynamicallyLoaded2;");
                            ref2.dispose();
                            test_lib_1.expect(view.rootNodes)
                                .toHaveText("Location;DynamicallyLoaded;");
                            async.done();
                        });
                    });
                });
            }));
            test_lib_1.it('should update host properties', test_lib_1.inject([dynamic_component_loader_1.DynamicComponentLoader, test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (loader, tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<div><location #loc></location></div>', directives: [Location] }));
                tb.createView(MyComp).then(function (view) {
                    var location = view.rawView.locals.get("loc");
                    loader.loadNextToExistingLocation(DynamicallyLoadedWithHostProps, location.elementRef)
                        .then(function (ref) {
                        ref.instance.id = "new value";
                        view.detectChanges();
                        var newlyInsertedElement = dom_adapter_1.DOM.childNodesAsList(view.rootNodes[0])[1];
                        test_lib_1.expect(newlyInsertedElement.id)
                            .toEqual("new value");
                        async.done();
                    });
                });
            }));
        });
        test_lib_1.describe('loading into a new location', function () {
            test_lib_1.it('should allow to create, update and destroy components', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<imp-ng-cmp #impview></imp-ng-cmp>',
                    directives: [ImperativeViewComponentUsingNgComponent]
                }));
                tb.createView(MyComp).then(function (view) {
                    var userViewComponent = view.rawView.locals.get("impview");
                    userViewComponent.done.then(function (childComponentRef) {
                        view.detectChanges();
                        test_lib_1.expect(view.rootNodes).toHaveText('hello');
                        childComponentRef.instance.ctxProp = 'new';
                        view.detectChanges();
                        test_lib_1.expect(view.rootNodes).toHaveText('new');
                        childComponentRef.dispose();
                        test_lib_1.expect(view.rootNodes).toHaveText('');
                        async.done();
                    });
                });
            }));
        });
        test_lib_1.describe('loadAsRoot', function () {
            test_lib_1.it('should allow to create, update and destroy components', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter, dynamic_component_loader_1.DynamicComponentLoader, dom_renderer_1.DOCUMENT_TOKEN, di_1.Injector], function (tb, async, dcl, doc, injector) {
                var rootEl = test_lib_1.el('<child-cmp></child-cmp>');
                dom_adapter_1.DOM.appendChild(doc.body, rootEl);
                dcl.loadAsRoot(ChildComp, null, injector)
                    .then(function (componentRef) {
                    var view = new test_bed_1.ViewProxy(componentRef);
                    test_lib_1.expect(rootEl.parentNode).toBe(doc.body);
                    view.detectChanges();
                    test_lib_1.expect(rootEl).toHaveText('hello');
                    componentRef.instance.ctxProp = 'new';
                    view.detectChanges();
                    test_lib_1.expect(rootEl).toHaveText('new');
                    componentRef.dispose();
                    test_lib_1.expect(rootEl).toHaveText('');
                    test_lib_1.expect(rootEl.parentNode).toBe(doc.body);
                    async.done();
                });
            }));
        });
    });
}
exports.main = main;
var ImperativeViewComponentUsingNgComponent = (function () {
    function ImperativeViewComponentUsingNgComponent(self, dynamicComponentLoader, viewManager, renderer) {
        var div = test_lib_1.el('<div id="impHost"></div>');
        var shadowViewRef = viewManager.getComponentView(self);
        renderer.setComponentViewRootNodes(shadowViewRef.render, [div]);
        this.done = dynamicComponentLoader.loadIntoNewLocation(ChildComp, self, null)
            .then(function (componentRef) {
            var element = renderer.getHostElement(componentRef.hostView.render);
            dom_adapter_1.DOM.appendChild(div, element);
            return componentRef;
        });
    }
    ImperativeViewComponentUsingNgComponent = __decorate([
        annotations_1.Component({ selector: 'imp-ng-cmp' }),
        annotations_1.View({ template: '' }), 
        __metadata('design:paramtypes', [element_ref_1.ElementRef, dynamic_component_loader_1.DynamicComponentLoader, view_manager_1.AppViewManager, dom_renderer_1.DomRenderer])
    ], ImperativeViewComponentUsingNgComponent);
    return ImperativeViewComponentUsingNgComponent;
})();
var ChildComp = (function () {
    function ChildComp() {
        this.ctxProp = 'hello';
    }
    ChildComp = __decorate([
        annotations_1.Component({
            selector: 'child-cmp',
        }),
        annotations_1.View({ template: '{{ctxProp}}' }), 
        __metadata('design:paramtypes', [])
    ], ChildComp);
    return ChildComp;
})();
var DynamicallyCreatedComponentService = (function () {
    function DynamicallyCreatedComponentService() {
    }
    return DynamicallyCreatedComponentService;
})();
var DynamicComp = (function () {
    function DynamicComp(loader, location) {
        this.done = loader.loadIntoExistingLocation(DynamicallyCreatedCmp, location);
    }
    DynamicComp = __decorate([
        annotations_1.Component({ selector: 'dynamic-comp' }), 
        __metadata('design:paramtypes', [dynamic_component_loader_1.DynamicComponentLoader, element_ref_1.ElementRef])
    ], DynamicComp);
    return DynamicComp;
})();
var DynamicallyCreatedCmp = (function () {
    function DynamicallyCreatedCmp(a) {
        this.greeting = "hello";
        this.dynamicallyCreatedComponentService = a;
    }
    DynamicallyCreatedCmp = __decorate([
        annotations_1.Component({ selector: 'hello-cmp', appInjector: [DynamicallyCreatedComponentService] }),
        annotations_1.View({ template: "{{greeting}}" }), 
        __metadata('design:paramtypes', [DynamicallyCreatedComponentService])
    ], DynamicallyCreatedCmp);
    return DynamicallyCreatedCmp;
})();
var DynamicallyLoaded = (function () {
    function DynamicallyLoaded() {
    }
    DynamicallyLoaded = __decorate([
        annotations_1.Component({ selector: 'dummy' }),
        annotations_1.View({ template: "DynamicallyLoaded;" }), 
        __metadata('design:paramtypes', [])
    ], DynamicallyLoaded);
    return DynamicallyLoaded;
})();
var DynamicallyLoaded2 = (function () {
    function DynamicallyLoaded2() {
    }
    DynamicallyLoaded2 = __decorate([
        annotations_1.Component({ selector: 'dummy' }),
        annotations_1.View({ template: "DynamicallyLoaded2;" }), 
        __metadata('design:paramtypes', [])
    ], DynamicallyLoaded2);
    return DynamicallyLoaded2;
})();
var DynamicallyLoadedWithHostProps = (function () {
    function DynamicallyLoadedWithHostProps() {
        this.id = "default";
    }
    DynamicallyLoadedWithHostProps = __decorate([
        annotations_1.Component({ selector: 'dummy', hostProperties: { 'id': 'id' } }),
        annotations_1.View({ template: "DynamicallyLoadedWithHostProps;" }), 
        __metadata('design:paramtypes', [])
    ], DynamicallyLoadedWithHostProps);
    return DynamicallyLoadedWithHostProps;
})();
var Location = (function () {
    function Location(elementRef) {
        this.elementRef = elementRef;
    }
    Location = __decorate([
        annotations_1.Component({ selector: 'location' }),
        annotations_1.View({ template: "Location;" }), 
        __metadata('design:paramtypes', [element_ref_1.ElementRef])
    ], Location);
    return Location;
})();
var MyComp = (function () {
    function MyComp() {
        this.ctxBoolProp = false;
    }
    MyComp = __decorate([
        annotations_1.Component({ selector: 'my-comp' }),
        annotations_1.View({ directives: [] }), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
//# sourceMappingURL=dynamic_component_loader_spec.js.map