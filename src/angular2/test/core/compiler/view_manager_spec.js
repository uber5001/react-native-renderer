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
var view_ref_1 = require('angular2/src/core/compiler/view_ref');
var element_ref_1 = require('angular2/src/core/compiler/element_ref');
var api_1 = require('angular2/src/render/api');
var element_binder_1 = require('angular2/src/core/compiler/element_binder');
var element_injector_1 = require('angular2/src/core/compiler/element_injector');
var directive_resolver_1 = require('angular2/src/core/compiler/directive_resolver');
var annotations_1 = require('angular2/annotations');
var view_manager_1 = require('angular2/src/core/compiler/view_manager');
var view_manager_utils_1 = require('angular2/src/core/compiler/view_manager_utils');
var view_listener_1 = require('angular2/src/core/compiler/view_listener');
var view_pool_1 = require('angular2/src/core/compiler/view_pool');
function main() {
    // TODO(tbosch): add missing tests
    test_lib_1.describe('AppViewManager', function () {
        var renderer;
        var utils;
        var viewListener;
        var viewPool;
        var manager;
        var directiveResolver;
        var createdViews;
        var createdRenderViews;
        function wrapPv(protoView) { return new view_ref_1.ProtoViewRef(protoView); }
        function wrapView(view) { return new view_ref_1.ViewRef(view); }
        function elementRef(parentView, boundElementIndex) {
            return new element_ref_1.ElementRef(parentView, boundElementIndex);
        }
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
            var staticChildComponentCount = 0;
            for (var i = 0; i < binders.length; i++) {
                if (binders[i].hasStaticComponent()) {
                    staticChildComponentCount++;
                }
            }
            var res = new view_1.AppProtoView(new MockProtoViewRef(staticChildComponentCount), null, null);
            res.elementBinders = binders;
            return res;
        }
        function createElementInjector() {
            return test_lib_1.SpyObject.stub(new SpyElementInjector(), {
                'isExportingComponent': false,
                'isExportingElement': false,
                'getEventEmitterAccessors': [],
                'getComponent': null
            }, {});
        }
        function createView(pv, renderViewRef) {
            if (pv === void 0) { pv = null; }
            if (renderViewRef === void 0) { renderViewRef = null; }
            if (lang_1.isBlank(pv)) {
                pv = createProtoView();
            }
            if (lang_1.isBlank(renderViewRef)) {
                renderViewRef = new api_1.RenderViewRef();
            }
            var view = new view_1.AppView(renderer, pv, collection_1.MapWrapper.create());
            view.render = renderViewRef;
            var elementInjectors = collection_1.ListWrapper.createFixedSize(pv.elementBinders.length);
            for (var i = 0; i < pv.elementBinders.length; i++) {
                elementInjectors[i] = createElementInjector();
            }
            view.init(null, elementInjectors, [], collection_1.ListWrapper.createFixedSize(pv.elementBinders.length), collection_1.ListWrapper.createFixedSize(pv.elementBinders.length));
            return view;
        }
        test_lib_1.beforeEach(function () {
            directiveResolver = new directive_resolver_1.DirectiveResolver();
            renderer = new SpyRenderer();
            utils = new SpyAppViewManagerUtils();
            viewListener = new SpyAppViewListener();
            viewPool = new SpyAppViewPool();
            manager = new view_manager_1.AppViewManager(viewPool, viewListener, utils, renderer);
            createdViews = [];
            createdRenderViews = [];
            utils.spy('createView')
                .andCallFake(function (proto, renderViewRef, _a, _b) {
                var view = createView(proto, renderViewRef);
                collection_1.ListWrapper.push(createdViews, view);
                return view;
            });
            utils.spy('attachComponentView')
                .andCallFake(function (hostView, elementIndex, childView) {
                hostView.componentChildViews[elementIndex] = childView;
            });
            utils.spy('attachViewInContainer')
                .andCallFake(function (parentView, elementIndex, _a, _b, atIndex, childView) {
                var viewContainer = parentView.viewContainers[elementIndex];
                if (lang_1.isBlank(viewContainer)) {
                    viewContainer = new view_1.AppViewContainer();
                    parentView.viewContainers[elementIndex] = viewContainer;
                }
                collection_1.ListWrapper.insert(viewContainer.views, atIndex, childView);
            });
            renderer.spy('createRootHostView')
                .andCallFake(function (_b, _c) {
                var rv = new api_1.RenderViewRef();
                collection_1.ListWrapper.push(createdRenderViews, rv);
                return rv;
            });
            renderer.spy('createView')
                .andCallFake(function (_a) {
                var rv = new api_1.RenderViewRef();
                collection_1.ListWrapper.push(createdRenderViews, rv);
                return rv;
            });
            viewPool.spy('returnView').andReturn(true);
        });
        test_lib_1.describe('createDynamicComponentView', function () {
            test_lib_1.describe('basic functionality', function () {
                var hostView, componentProtoView;
                test_lib_1.beforeEach(function () {
                    hostView = createView(createProtoView([createComponentElBinder(null)]));
                    componentProtoView = createProtoView();
                });
                test_lib_1.it('should create the view', function () {
                    test_lib_1.expect(view_ref_1.internalView(manager.createDynamicComponentView(elementRef(wrapView(hostView), 0), wrapPv(componentProtoView), null, null)))
                        .toBe(createdViews[0]);
                    test_lib_1.expect(createdViews[0].proto).toBe(componentProtoView);
                    test_lib_1.expect(viewListener.spy('viewCreated')).toHaveBeenCalledWith(createdViews[0]);
                });
                test_lib_1.it('should get the view from the pool', function () {
                    var createdView;
                    viewPool.spy('getView').andCallFake(function (protoView) {
                        createdView = createView(protoView);
                        return createdView;
                    });
                    test_lib_1.expect(view_ref_1.internalView(manager.createDynamicComponentView(elementRef(wrapView(hostView), 0), wrapPv(componentProtoView), null, null)))
                        .toBe(createdView);
                    test_lib_1.expect(utils.spy('createView')).not.toHaveBeenCalled();
                    test_lib_1.expect(renderer.spy('createView')).not.toHaveBeenCalled();
                    test_lib_1.expect(viewListener.spy('viewCreated')).not.toHaveBeenCalled();
                });
                test_lib_1.it('should attach the view', function () {
                    manager.createDynamicComponentView(elementRef(wrapView(hostView), 0), wrapPv(componentProtoView), null, null);
                    test_lib_1.expect(utils.spy('attachComponentView'))
                        .toHaveBeenCalledWith(hostView, 0, createdViews[0]);
                    test_lib_1.expect(renderer.spy('attachComponentView'))
                        .toHaveBeenCalledWith(hostView.render, 0, createdViews[0].render);
                });
                test_lib_1.it('should hydrate the dynamic component', function () {
                    var injector = new di_1.Injector([], null, false);
                    var componentBinding = di_1.bind(SomeComponent).toClass(SomeComponent);
                    manager.createDynamicComponentView(elementRef(wrapView(hostView), 0), wrapPv(componentProtoView), componentBinding, injector);
                    test_lib_1.expect(utils.spy('hydrateDynamicComponentInElementInjector'))
                        .toHaveBeenCalledWith(hostView, 0, componentBinding, injector);
                });
                test_lib_1.it('should hydrate the view', function () {
                    manager.createDynamicComponentView(elementRef(wrapView(hostView), 0), wrapPv(componentProtoView), null, null);
                    test_lib_1.expect(utils.spy('hydrateComponentView')).toHaveBeenCalledWith(hostView, 0);
                    test_lib_1.expect(renderer.spy('hydrateView')).toHaveBeenCalledWith(createdViews[0].render);
                });
                test_lib_1.it('should create and set the render view', function () {
                    manager.createDynamicComponentView(elementRef(wrapView(hostView), 0), wrapPv(componentProtoView), null, null);
                    test_lib_1.expect(renderer.spy('createView')).toHaveBeenCalledWith(componentProtoView.render);
                    test_lib_1.expect(createdViews[0].render).toBe(createdRenderViews[0]);
                });
                test_lib_1.it('should set the event dispatcher', function () {
                    manager.createDynamicComponentView(elementRef(wrapView(hostView), 0), wrapPv(componentProtoView), null, null);
                    var cmpView = createdViews[0];
                    test_lib_1.expect(renderer.spy('setEventDispatcher')).toHaveBeenCalledWith(cmpView.render, cmpView);
                });
            });
            test_lib_1.describe('error cases', function () {
                test_lib_1.it('should not allow to use non component indices', function () {
                    var hostView = createView(createProtoView([createEmptyElBinder()]));
                    var componentProtoView = createProtoView();
                    test_lib_1.expect(function () { return manager.createDynamicComponentView(elementRef(wrapView(hostView), 0), wrapPv(componentProtoView), null, null); })
                        .toThrowError('There is no dynamic component directive at element 0');
                });
                test_lib_1.it('should not allow to use static component indices', function () {
                    var hostView = createView(createProtoView([createComponentElBinder(createProtoView())]));
                    var componentProtoView = createProtoView();
                    test_lib_1.expect(function () { return manager.createDynamicComponentView(elementRef(wrapView(hostView), 0), wrapPv(componentProtoView), null, null); })
                        .toThrowError('There is no dynamic component directive at element 0');
                });
            });
            test_lib_1.describe('recursively destroy dynamic child component views', function () {
                // TODO
            });
        });
        test_lib_1.describe('static child components', function () {
            test_lib_1.describe('recursively create when not cached', function () {
                var hostView, componentProtoView, nestedProtoView;
                test_lib_1.beforeEach(function () {
                    hostView = createView(createProtoView([createComponentElBinder(null)]));
                    nestedProtoView = createProtoView();
                    componentProtoView = createProtoView([createComponentElBinder(nestedProtoView)]);
                });
                test_lib_1.it('should create the view', function () {
                    manager.createDynamicComponentView(elementRef(wrapView(hostView), 0), wrapPv(componentProtoView), null, null);
                    test_lib_1.expect(createdViews[0].proto).toBe(componentProtoView);
                    test_lib_1.expect(createdViews[1].proto).toBe(nestedProtoView);
                });
                test_lib_1.it('should hydrate the view', function () {
                    manager.createDynamicComponentView(elementRef(wrapView(hostView), 0), wrapPv(componentProtoView), null, null);
                    test_lib_1.expect(utils.spy('hydrateComponentView')).toHaveBeenCalledWith(createdViews[0], 0);
                    test_lib_1.expect(renderer.spy('hydrateView')).toHaveBeenCalledWith(createdViews[0].render);
                });
                test_lib_1.it('should set the render view', function () {
                    manager.createDynamicComponentView(elementRef(wrapView(hostView), 0), wrapPv(componentProtoView), null, null);
                    test_lib_1.expect(createdViews[1].render).toBe(createdRenderViews[1]);
                });
                test_lib_1.it('should set the event dispatcher', function () {
                    manager.createDynamicComponentView(elementRef(wrapView(hostView), 0), wrapPv(componentProtoView), null, null);
                    var cmpView = createdViews[1];
                    test_lib_1.expect(renderer.spy('setEventDispatcher')).toHaveBeenCalledWith(cmpView.render, cmpView);
                });
            });
            test_lib_1.describe('recursively hydrate when getting from from the cache', function () {
                // TODO(tbosch): implement this
            });
            test_lib_1.describe('recursively dehydrate', function () {
                // TODO(tbosch): implement this
            });
        });
        test_lib_1.describe('createFreeHostView', function () {
            // Note: We don't add tests for recursion or viewpool here as we assume that
            // this is using the same mechanism as the other methods...
            test_lib_1.describe('basic functionality', function () {
                var parentHostView, parentView, hostProtoView;
                test_lib_1.beforeEach(function () {
                    parentHostView = createView(createProtoView([createComponentElBinder(null)]));
                    parentView = createView();
                    utils.attachComponentView(parentHostView, 0, parentView);
                    hostProtoView = createProtoView([createComponentElBinder(null)]);
                });
                test_lib_1.it('should create the view', function () {
                    test_lib_1.expect(view_ref_1.internalView(manager.createFreeHostView(elementRef(wrapView(parentHostView), 0), wrapPv(hostProtoView), null)))
                        .toBe(createdViews[0]);
                    test_lib_1.expect(createdViews[0].proto).toBe(hostProtoView);
                    test_lib_1.expect(viewListener.spy('viewCreated')).toHaveBeenCalledWith(createdViews[0]);
                });
                test_lib_1.it('should attachAndHydrate the view', function () {
                    var injector = new di_1.Injector([], null, false);
                    manager.createFreeHostView(elementRef(wrapView(parentHostView), 0), wrapPv(hostProtoView), injector);
                    test_lib_1.expect(utils.spy('attachAndHydrateFreeHostView'))
                        .toHaveBeenCalledWith(parentHostView, 0, createdViews[0], injector);
                    test_lib_1.expect(renderer.spy('hydrateView')).toHaveBeenCalledWith(createdViews[0].render);
                });
                test_lib_1.it('should create and set the render view', function () {
                    manager.createFreeHostView(elementRef(wrapView(parentHostView), 0), wrapPv(hostProtoView), null);
                    test_lib_1.expect(renderer.spy('createView')).toHaveBeenCalledWith(hostProtoView.render);
                    test_lib_1.expect(createdViews[0].render).toBe(createdRenderViews[0]);
                });
                test_lib_1.it('should set the event dispatcher', function () {
                    manager.createFreeHostView(elementRef(wrapView(parentHostView), 0), wrapPv(hostProtoView), null);
                    var cmpView = createdViews[0];
                    test_lib_1.expect(renderer.spy('setEventDispatcher')).toHaveBeenCalledWith(cmpView.render, cmpView);
                });
            });
        });
        test_lib_1.describe('destroyFreeHostView', function () {
            test_lib_1.describe('basic functionality', function () {
                var parentHostView, parentView, hostProtoView, hostView, hostRenderViewRef;
                test_lib_1.beforeEach(function () {
                    parentHostView = createView(createProtoView([createComponentElBinder(null)]));
                    parentView = createView();
                    utils.attachComponentView(parentHostView, 0, parentView);
                    hostProtoView = createProtoView([createComponentElBinder(null)]);
                    hostView = view_ref_1.internalView(manager.createFreeHostView(elementRef(wrapView(parentHostView), 0), wrapPv(hostProtoView), null));
                    hostRenderViewRef = hostView.render;
                });
                test_lib_1.it('should detach', function () {
                    manager.destroyFreeHostView(elementRef(wrapView(parentHostView), 0), wrapView(hostView));
                    test_lib_1.expect(utils.spy('detachFreeHostView')).toHaveBeenCalledWith(parentView, hostView);
                });
                test_lib_1.it('should dehydrate', function () {
                    manager.destroyFreeHostView(elementRef(wrapView(parentHostView), 0), wrapView(hostView));
                    test_lib_1.expect(utils.spy('dehydrateView')).toHaveBeenCalledWith(hostView);
                    test_lib_1.expect(renderer.spy('dehydrateView')).toHaveBeenCalledWith(hostView.render);
                });
                test_lib_1.it('should detach the render view', function () {
                    manager.destroyFreeHostView(elementRef(wrapView(parentHostView), 0), wrapView(hostView));
                    test_lib_1.expect(renderer.spy('detachFreeHostView'))
                        .toHaveBeenCalledWith(parentView.render, hostRenderViewRef);
                });
                test_lib_1.it('should return the view to the pool', function () {
                    manager.destroyFreeHostView(elementRef(wrapView(parentHostView), 0), wrapView(hostView));
                    test_lib_1.expect(viewPool.spy('returnView')).toHaveBeenCalledWith(hostView);
                    test_lib_1.expect(renderer.spy('destroyView')).not.toHaveBeenCalled();
                });
                test_lib_1.it('should destroy the view if the pool is full', function () {
                    viewPool.spy('returnView').andReturn(false);
                    manager.destroyFreeHostView(elementRef(wrapView(parentHostView), 0), wrapView(hostView));
                    test_lib_1.expect(renderer.spy('destroyView')).toHaveBeenCalledWith(hostView.render);
                    test_lib_1.expect(viewListener.spy('viewDestroyed')).toHaveBeenCalledWith(hostView);
                });
            });
            test_lib_1.describe('recursively destroy inPlaceHostViews', function () {
                // TODO
            });
        });
        test_lib_1.describe('createRootHostView', function () {
            var hostProtoView;
            test_lib_1.beforeEach(function () { hostProtoView = createProtoView([createComponentElBinder(null)]); });
            test_lib_1.it('should create the view', function () {
                test_lib_1.expect(view_ref_1.internalView(manager.createRootHostView(wrapPv(hostProtoView), null, null)))
                    .toBe(createdViews[0]);
                test_lib_1.expect(createdViews[0].proto).toBe(hostProtoView);
                test_lib_1.expect(viewListener.spy('viewCreated')).toHaveBeenCalledWith(createdViews[0]);
            });
            test_lib_1.it('should hydrate the view', function () {
                var injector = new di_1.Injector([], null, false);
                manager.createRootHostView(wrapPv(hostProtoView), null, injector);
                test_lib_1.expect(utils.spy('hydrateRootHostView')).toHaveBeenCalledWith(createdViews[0], injector);
                test_lib_1.expect(renderer.spy('hydrateView')).toHaveBeenCalledWith(createdViews[0].render);
            });
            test_lib_1.it('should create and set the render view using the component selector', function () {
                manager.createRootHostView(wrapPv(hostProtoView), null, null);
                test_lib_1.expect(renderer.spy('createRootHostView'))
                    .toHaveBeenCalledWith(hostProtoView.render, 'someComponent');
                test_lib_1.expect(createdViews[0].render).toBe(createdRenderViews[0]);
            });
            test_lib_1.it('should allow to override the selector', function () {
                var selector = 'someOtherSelector';
                manager.createRootHostView(wrapPv(hostProtoView), selector, null);
                test_lib_1.expect(renderer.spy('createRootHostView'))
                    .toHaveBeenCalledWith(hostProtoView.render, selector);
            });
            test_lib_1.it('should set the event dispatcher', function () {
                manager.createRootHostView(wrapPv(hostProtoView), null, null);
                var cmpView = createdViews[0];
                test_lib_1.expect(renderer.spy('setEventDispatcher')).toHaveBeenCalledWith(cmpView.render, cmpView);
            });
        });
        test_lib_1.describe('destroyRootHostView', function () {
            var hostProtoView, hostView, hostRenderViewRef;
            test_lib_1.beforeEach(function () {
                hostProtoView = createProtoView([createComponentElBinder(null)]);
                hostView = view_ref_1.internalView(manager.createRootHostView(wrapPv(hostProtoView), null, null));
                hostRenderViewRef = hostView.render;
            });
            test_lib_1.it('should dehydrate', function () {
                manager.destroyRootHostView(wrapView(hostView));
                test_lib_1.expect(utils.spy('dehydrateView')).toHaveBeenCalledWith(hostView);
                test_lib_1.expect(renderer.spy('dehydrateView')).toHaveBeenCalledWith(hostView.render);
            });
            test_lib_1.it('should destroy the render view', function () {
                manager.destroyRootHostView(wrapView(hostView));
                test_lib_1.expect(renderer.spy('destroyView')).toHaveBeenCalledWith(hostRenderViewRef);
                test_lib_1.expect(viewListener.spy('viewDestroyed')).toHaveBeenCalledWith(hostView);
            });
            test_lib_1.it('should not return the view to the pool', function () {
                manager.destroyRootHostView(wrapView(hostView));
                test_lib_1.expect(viewPool.spy('returnView')).not.toHaveBeenCalled();
            });
        });
        test_lib_1.describe('createViewInContainer', function () {
            test_lib_1.describe('basic functionality', function () {
                var parentView, childProtoView;
                test_lib_1.beforeEach(function () {
                    parentView = createView(createProtoView([createEmptyElBinder()]));
                    childProtoView = createProtoView();
                });
                test_lib_1.it('should create a ViewContainerRef if not yet existing', function () {
                    manager.createViewInContainer(elementRef(wrapView(parentView), 0), 0, wrapPv(childProtoView), null);
                    test_lib_1.expect(parentView.viewContainers[0]).toBeTruthy();
                });
                test_lib_1.it('should create the view', function () {
                    test_lib_1.expect(view_ref_1.internalView(manager.createViewInContainer(elementRef(wrapView(parentView), 0), 0, wrapPv(childProtoView), null)))
                        .toBe(createdViews[0]);
                    test_lib_1.expect(createdViews[0].proto).toBe(childProtoView);
                    test_lib_1.expect(viewListener.spy('viewCreated')).toHaveBeenCalledWith(createdViews[0]);
                });
                test_lib_1.it('should attach the view', function () {
                    var contextView = createView();
                    manager.createViewInContainer(elementRef(wrapView(parentView), 0), 0, wrapPv(childProtoView), elementRef(wrapView(contextView), 1), null);
                    test_lib_1.expect(utils.spy('attachViewInContainer'))
                        .toHaveBeenCalledWith(parentView, 0, contextView, 1, 0, createdViews[0]);
                    test_lib_1.expect(renderer.spy('attachViewInContainer'))
                        .toHaveBeenCalledWith(parentView.render, 0, 0, createdViews[0].render);
                });
                test_lib_1.it('should hydrate the view', function () {
                    var injector = new di_1.Injector([], null, false);
                    var contextView = createView();
                    manager.createViewInContainer(elementRef(wrapView(parentView), 0), 0, wrapPv(childProtoView), elementRef(wrapView(contextView), 1), injector);
                    test_lib_1.expect(utils.spy('hydrateViewInContainer'))
                        .toHaveBeenCalledWith(parentView, 0, contextView, 1, 0, injector);
                    test_lib_1.expect(renderer.spy('hydrateView')).toHaveBeenCalledWith(createdViews[0].render);
                });
                test_lib_1.it('should create and set the render view', function () {
                    manager.createViewInContainer(elementRef(wrapView(parentView), 0), 0, wrapPv(childProtoView), null, null);
                    test_lib_1.expect(renderer.spy('createView')).toHaveBeenCalledWith(childProtoView.render);
                    test_lib_1.expect(createdViews[0].render).toBe(createdRenderViews[0]);
                });
                test_lib_1.it('should set the event dispatcher', function () {
                    manager.createViewInContainer(elementRef(wrapView(parentView), 0), 0, wrapPv(childProtoView), null, null);
                    var childView = createdViews[0];
                    test_lib_1.expect(renderer.spy('setEventDispatcher'))
                        .toHaveBeenCalledWith(childView.render, childView);
                });
            });
        });
        test_lib_1.describe('destroyViewInContainer', function () {
            test_lib_1.describe('basic functionality', function () {
                var parentView, childProtoView, childView;
                test_lib_1.beforeEach(function () {
                    parentView = createView(createProtoView([createEmptyElBinder()]));
                    childProtoView = createProtoView();
                    childView = view_ref_1.internalView(manager.createViewInContainer(elementRef(wrapView(parentView), 0), 0, wrapPv(childProtoView), null));
                });
                test_lib_1.it('should dehydrate', function () {
                    manager.destroyViewInContainer(elementRef(wrapView(parentView), 0), 0);
                    test_lib_1.expect(utils.spy('dehydrateView'))
                        .toHaveBeenCalledWith(parentView.viewContainers[0].views[0]);
                    test_lib_1.expect(renderer.spy('dehydrateView')).toHaveBeenCalledWith(childView.render);
                });
                test_lib_1.it('should detach', function () {
                    manager.destroyViewInContainer(elementRef(wrapView(parentView), 0), 0);
                    test_lib_1.expect(utils.spy('detachViewInContainer')).toHaveBeenCalledWith(parentView, 0, 0);
                    test_lib_1.expect(renderer.spy('detachViewInContainer'))
                        .toHaveBeenCalledWith(parentView.render, 0, 0, childView.render);
                });
                test_lib_1.it('should return the view to the pool', function () {
                    manager.destroyViewInContainer(elementRef(wrapView(parentView), 0), 0);
                    test_lib_1.expect(viewPool.spy('returnView')).toHaveBeenCalledWith(childView);
                });
            });
            test_lib_1.describe('recursively destroy views in ViewContainers', function () {
                var parentView, childProtoView, childView;
                test_lib_1.beforeEach(function () {
                    parentView = createView(createProtoView([createEmptyElBinder()]));
                    childProtoView = createProtoView();
                    childView = view_ref_1.internalView(manager.createViewInContainer(elementRef(wrapView(parentView), 0), 0, wrapPv(childProtoView), null));
                });
                test_lib_1.it('should dehydrate', function () {
                    manager.destroyRootHostView(wrapView(parentView));
                    test_lib_1.expect(utils.spy('dehydrateView'))
                        .toHaveBeenCalledWith(parentView.viewContainers[0].views[0]);
                    test_lib_1.expect(renderer.spy('dehydrateView')).toHaveBeenCalledWith(childView.render);
                });
                test_lib_1.it('should detach', function () {
                    manager.destroyRootHostView(wrapView(parentView));
                    test_lib_1.expect(utils.spy('detachViewInContainer')).toHaveBeenCalledWith(parentView, 0, 0);
                    test_lib_1.expect(renderer.spy('detachViewInContainer'))
                        .toHaveBeenCalledWith(parentView.render, 0, 0, childView.render);
                });
                test_lib_1.it('should return the view to the pool', function () {
                    manager.destroyRootHostView(wrapView(parentView));
                    test_lib_1.expect(viewPool.spy('returnView')).toHaveBeenCalledWith(childView);
                });
            });
        });
        test_lib_1.describe('attachViewInContainer', function () {
        });
        test_lib_1.describe('detachViewInContainer', function () {
        });
    });
}
exports.main = main;
var MockProtoViewRef = (function (_super) {
    __extends(MockProtoViewRef, _super);
    function MockProtoViewRef(nestedComponentCount) {
        _super.call(this);
        this.nestedComponentCount = nestedComponentCount;
    }
    return MockProtoViewRef;
})(api_1.RenderProtoViewRef);
var SomeComponent = (function () {
    function SomeComponent() {
    }
    SomeComponent = __decorate([
        annotations_1.Component({ selector: 'someComponent' }), 
        __metadata('design:paramtypes', [])
    ], SomeComponent);
    return SomeComponent;
})();
var SpyRenderer = (function (_super) {
    __extends(SpyRenderer, _super);
    function SpyRenderer() {
        _super.call(this, api_1.Renderer);
    }
    SpyRenderer.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyRenderer = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(api_1.Renderer), 
        __metadata('design:paramtypes', [])
    ], SpyRenderer);
    return SpyRenderer;
})(test_lib_1.SpyObject);
var SpyAppViewPool = (function (_super) {
    __extends(SpyAppViewPool, _super);
    function SpyAppViewPool() {
        _super.call(this, view_pool_1.AppViewPool);
    }
    SpyAppViewPool.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyAppViewPool = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(view_pool_1.AppViewPool), 
        __metadata('design:paramtypes', [])
    ], SpyAppViewPool);
    return SpyAppViewPool;
})(test_lib_1.SpyObject);
var SpyAppViewManagerUtils = (function (_super) {
    __extends(SpyAppViewManagerUtils, _super);
    function SpyAppViewManagerUtils() {
        _super.call(this, view_manager_utils_1.AppViewManagerUtils);
    }
    SpyAppViewManagerUtils.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyAppViewManagerUtils = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(view_manager_utils_1.AppViewManagerUtils), 
        __metadata('design:paramtypes', [])
    ], SpyAppViewManagerUtils);
    return SpyAppViewManagerUtils;
})(test_lib_1.SpyObject);
var SpyAppViewListener = (function (_super) {
    __extends(SpyAppViewListener, _super);
    function SpyAppViewListener() {
        _super.call(this, view_listener_1.AppViewListener);
    }
    SpyAppViewListener.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyAppViewListener = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(view_listener_1.AppViewListener), 
        __metadata('design:paramtypes', [])
    ], SpyAppViewListener);
    return SpyAppViewListener;
})(test_lib_1.SpyObject);
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
//# sourceMappingURL=view_manager_spec.js.map