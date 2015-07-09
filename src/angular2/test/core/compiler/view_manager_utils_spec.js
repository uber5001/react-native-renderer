var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
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
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var view_1 = require('angular2/src/core/compiler/view');
var change_detection_1 = require('angular2/change_detection');
var element_binder_1 = require('angular2/src/core/compiler/element_binder');
var element_injector_1 = require('angular2/src/core/compiler/element_injector');
var directive_resolver_1 = require('angular2/src/core/compiler/directive_resolver');
var annotations_1 = require('angular2/annotations');
var view_manager_utils_1 = require('angular2/src/core/compiler/view_manager_utils');
function main() {
    // TODO(tbosch): add more tests here!
    test_lib_1.describe('AppViewManagerUtils', function () {
        var directiveResolver;
        var utils;
        function createInjector() { return new di_1.Injector([], null, false); }
        function createDirectiveBinding(type) {
            var annotation = directiveResolver.resolve(type);
            return element_injector_1.DirectiveBinding.createFromType(type, annotation);
        }
        function createEmptyElBinder() { return new element_binder_1.ElementBinder(0, null, 0, null, null); }
        function createComponentElBinder(nestedProtoView) {
            if (nestedProtoView === void 0) { nestedProtoView = null; }
            var binding = createDirectiveBinding(SomeComponent);
            var binder = new element_binder_1.ElementBinder(0, null, 0, null, binding);
            binder.nestedProtoView = nestedProtoView;
            return binder;
        }
        function createProtoView(binders) {
            if (binders === void 0) { binders = null; }
            if (lang_1.isBlank(binders)) {
                binders = [];
            }
            var res = new view_1.AppProtoView(null, null, null);
            res.elementBinders = binders;
            return res;
        }
        function createElementInjector() {
            var host = new SpyElementInjector();
            return test_lib_1.SpyObject.stub(new SpyElementInjector(), {
                'isExportingComponent': false,
                'isExportingElement': false,
                'getEventEmitterAccessors': [],
                'getHostActionAccessors': [],
                'getComponent': null,
                'getDynamicallyLoadedComponent': null,
                'getHost': host
            }, {});
        }
        function createView(pv) {
            if (pv === void 0) { pv = null; }
            if (lang_1.isBlank(pv)) {
                pv = createProtoView();
            }
            var view = new view_1.AppView(null, pv, collection_1.MapWrapper.create());
            var elementInjectors = collection_1.ListWrapper.createFixedSize(pv.elementBinders.length);
            var preBuiltObjects = collection_1.ListWrapper.createFixedSize(pv.elementBinders.length);
            for (var i = 0; i < pv.elementBinders.length; i++) {
                elementInjectors[i] = createElementInjector();
                preBuiltObjects[i] = new SpyPreBuiltObjects();
            }
            view.init(new SpyChangeDetector(), elementInjectors, elementInjectors, preBuiltObjects, collection_1.ListWrapper.createFixedSize(pv.elementBinders.length));
            return view;
        }
        test_lib_1.beforeEach(function () {
            directiveResolver = new directive_resolver_1.DirectiveResolver();
            utils = new view_manager_utils_1.AppViewManagerUtils(directiveResolver);
        });
        test_lib_1.describe('hydrateDynamicComponentInElementInjector', function () {
            test_lib_1.it('should not allow to overwrite an existing component', function () {
                var hostView = createView(createProtoView([createComponentElBinder(createProtoView())]));
                var componentBinding = di_1.bind(SomeComponent).toClass(SomeComponent);
                test_lib_1.SpyObject.stub(hostView.elementInjectors[0], { 'getDynamicallyLoadedComponent': new SomeComponent() });
                test_lib_1.expect(function () { return utils.hydrateDynamicComponentInElementInjector(hostView, 0, componentBinding, null); })
                    .toThrowError('There already is a dynamic component loaded at element 0');
            });
        });
        test_lib_1.describe("hydrateComponentView", function () {
            test_lib_1.it("should hydrate the change detector after hydrating element injectors", function () {
                var log = new test_lib_1.Log();
                var componentView = createView(createProtoView([createEmptyElBinder()]));
                var hostView = createView(createProtoView([createComponentElBinder(createProtoView())]));
                hostView.componentChildViews = [componentView];
                var spyEi = componentView.elementInjectors[0];
                spyEi.spy('hydrate').andCallFake(log.fn('hydrate'));
                var spyCd = componentView.changeDetector;
                spyCd.spy('hydrate').andCallFake(log.fn('hydrateCD'));
                utils.hydrateComponentView(hostView, 0);
                test_lib_1.expect(log.result())
                    .toEqual('hydrate; hydrateCD');
            });
        });
        test_lib_1.describe('shared hydrate functionality', function () {
            test_lib_1.it("should set up event listeners", function () {
                var dir = new Object();
                var hostPv = createProtoView([createComponentElBinder(null), createEmptyElBinder()]);
                var hostView = createView(hostPv);
                var spyEventAccessor1 = test_lib_1.SpyObject.stub({ "subscribe": null });
                test_lib_1.SpyObject.stub(hostView.elementInjectors[0], {
                    'getHostActionAccessors': [],
                    'getEventEmitterAccessors': [[spyEventAccessor1]],
                    'getDirectiveAtIndex': dir
                });
                var spyEventAccessor2 = test_lib_1.SpyObject.stub({ "subscribe": null });
                test_lib_1.SpyObject.stub(hostView.elementInjectors[1], {
                    'getHostActionAccessors': [],
                    'getEventEmitterAccessors': [[spyEventAccessor2]],
                    'getDirectiveAtIndex': dir
                });
                var shadowView = createView();
                utils.attachComponentView(hostView, 0, shadowView);
                utils.hydrateRootHostView(hostView, createInjector());
                test_lib_1.expect(spyEventAccessor1.spy('subscribe')).toHaveBeenCalledWith(hostView, 0, dir);
                test_lib_1.expect(spyEventAccessor2.spy('subscribe')).toHaveBeenCalledWith(hostView, 1, dir);
            });
            test_lib_1.it("should set up host action listeners", function () {
                var dir = new Object();
                var hostPv = createProtoView([createComponentElBinder(null), createEmptyElBinder()]);
                var hostView = createView(hostPv);
                var spyActionAccessor1 = test_lib_1.SpyObject.stub({ "subscribe": null });
                test_lib_1.SpyObject.stub(hostView.elementInjectors[0], {
                    'getHostActionAccessors': [[spyActionAccessor1]],
                    'getEventEmitterAccessors': [],
                    'getDirectiveAtIndex': dir
                });
                var spyActionAccessor2 = test_lib_1.SpyObject.stub({ "subscribe": null });
                test_lib_1.SpyObject.stub(hostView.elementInjectors[1], {
                    'getHostActionAccessors': [[spyActionAccessor2]],
                    'getEventEmitterAccessors': [],
                    'getDirectiveAtIndex': dir
                });
                var shadowView = createView();
                utils.attachComponentView(hostView, 0, shadowView);
                utils.hydrateRootHostView(hostView, createInjector());
                test_lib_1.expect(spyActionAccessor1.spy('subscribe')).toHaveBeenCalledWith(hostView, 0, dir);
                test_lib_1.expect(spyActionAccessor2.spy('subscribe')).toHaveBeenCalledWith(hostView, 1, dir);
            });
        });
        test_lib_1.describe('attachViewInContainer', function () {
            var parentView, contextView, childView;
            function createViews() {
                var parentPv = createProtoView([createEmptyElBinder()]);
                parentView = createView(parentPv);
                var contextPv = createProtoView([createEmptyElBinder()]);
                contextView = createView(contextPv);
                var childPv = createProtoView([createEmptyElBinder()]);
                childView = createView(childPv);
            }
            test_lib_1.it('should link the views rootElementInjectors after the elementInjector at the given context', function () {
                createViews();
                utils.attachViewInContainer(parentView, 0, contextView, 0, 0, childView);
                test_lib_1.expect(childView.rootElementInjectors[0].spy('linkAfter'))
                    .toHaveBeenCalledWith(contextView.elementInjectors[0], null);
            });
        });
        test_lib_1.describe('hydrateViewInContainer', function () {
            var parentView, contextView, childView;
            function createViews() {
                var parentPv = createProtoView([createEmptyElBinder()]);
                parentView = createView(parentPv);
                var contextPv = createProtoView([createEmptyElBinder()]);
                contextView = createView(contextPv);
                var childPv = createProtoView([createEmptyElBinder()]);
                childView = createView(childPv);
                utils.attachViewInContainer(parentView, 0, contextView, 0, 0, childView);
            }
            test_lib_1.it("should instantiate the elementInjectors with the host of the context's elementInjector", function () {
                createViews();
                utils.hydrateViewInContainer(parentView, 0, contextView, 0, 0, null);
                test_lib_1.expect(childView.rootElementInjectors[0].spy('hydrate'))
                    .toHaveBeenCalledWith(null, contextView.elementInjectors[0].getHost(), childView.preBuiltObjects[0]);
            });
        });
        test_lib_1.describe('hydrateRootHostView', function () {
            var hostView;
            function createViews() {
                var hostPv = createProtoView([createComponentElBinder()]);
                hostView = createView(hostPv);
            }
            test_lib_1.it("should instantiate the elementInjectors with the given injector and an empty host element injector", function () {
                var injector = createInjector();
                createViews();
                utils.hydrateRootHostView(hostView, injector);
                test_lib_1.expect(hostView.rootElementInjectors[0].spy('hydrate'))
                    .toHaveBeenCalledWith(injector, null, hostView.preBuiltObjects[0]);
            });
        });
    });
}
exports.main = main;
var SomeComponent = (function () {
    function SomeComponent() {
    }
    SomeComponent = __decorate([
        annotations_1.Component({ selector: 'someComponent' }), 
        __metadata('design:paramtypes', [])
    ], SomeComponent);
    return SomeComponent;
})();
var SpyElementInjector = (function (_super) {
    __extends(SpyElementInjector, _super);
    function SpyElementInjector() {
        _super.call(this, element_injector_1.ElementInjector);
    }
    SpyElementInjector.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyElementInjector = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(element_injector_1.ElementInjector), 
        __metadata('design:paramtypes', [])
    ], SpyElementInjector);
    return SpyElementInjector;
})(test_lib_1.SpyObject);
var SpyChangeDetector = (function (_super) {
    __extends(SpyChangeDetector, _super);
    function SpyChangeDetector() {
        _super.call(this, change_detection_1.ChangeDetector);
    }
    SpyChangeDetector.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyChangeDetector = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(change_detection_1.ChangeDetector), 
        __metadata('design:paramtypes', [])
    ], SpyChangeDetector);
    return SpyChangeDetector;
})(test_lib_1.SpyObject);
var SpyPreBuiltObjects = (function (_super) {
    __extends(SpyPreBuiltObjects, _super);
    function SpyPreBuiltObjects() {
        _super.call(this, element_injector_1.PreBuiltObjects);
    }
    SpyPreBuiltObjects.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyPreBuiltObjects = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(element_injector_1.PreBuiltObjects), 
        __metadata('design:paramtypes', [])
    ], SpyPreBuiltObjects);
    return SpyPreBuiltObjects;
})(test_lib_1.SpyObject);
//# sourceMappingURL=view_manager_utils_spec.js.map