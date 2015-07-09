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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var test_lib_1 = require('angular2/test_lib');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var compiler_1 = require('angular2/src/core/compiler/compiler');
var view_1 = require('angular2/src/core/compiler/view');
var element_binder_1 = require('angular2/src/core/compiler/element_binder');
var directive_resolver_1 = require('angular2/src/core/compiler/directive_resolver');
var annotations_1 = require('angular2/annotations');
var viewAnn = require('angular2/src/core/annotations_impl/view');
var view_ref_1 = require('angular2/src/core/compiler/view_ref');
var element_injector_1 = require('angular2/src/core/compiler/element_injector');
var template_resolver_1 = require('angular2/src/core/compiler/template_resolver');
var component_url_mapper_1 = require('angular2/src/core/compiler/component_url_mapper');
var proto_view_factory_1 = require('angular2/src/core/compiler/proto_view_factory');
var url_resolver_1 = require('angular2/src/services/url_resolver');
var renderApi = require('angular2/src/render/api');
// TODO(tbosch): Spys don't support named modules...
var api_1 = require('angular2/src/render/api');
function main() {
    test_lib_1.describe('compiler', function () {
        var directiveResolver, tplResolver, renderCompiler, protoViewFactory, cmpUrlMapper, renderCompileRequests;
        test_lib_1.beforeEach(function () {
            directiveResolver = new directive_resolver_1.DirectiveResolver();
            tplResolver = new FakeTemplateResolver();
            cmpUrlMapper = new component_url_mapper_1.RuntimeComponentUrlMapper();
            renderCompiler = new SpyRenderCompiler();
        });
        function createCompiler(renderCompileResults, protoViewFactoryResults) {
            var urlResolver = new FakeUrlResolver();
            renderCompileRequests = [];
            renderCompiler.spy('compile').andCallFake(function (template) {
                collection_1.ListWrapper.push(renderCompileRequests, template);
                return async_1.PromiseWrapper.resolve(collection_1.ListWrapper.removeAt(renderCompileResults, 0));
            });
            protoViewFactory = new FakeProtoViewFactory(protoViewFactoryResults);
            return new compiler_1.Compiler(directiveResolver, new compiler_1.CompilerCache(), tplResolver, cmpUrlMapper, urlResolver, renderCompiler, protoViewFactory);
        }
        test_lib_1.describe('serialize template', function () {
            function captureTemplate(template) {
                tplResolver.setView(MainComponent, template);
                var compiler = createCompiler([createRenderProtoView()], [[createProtoView()]]);
                return compiler.compile(MainComponent)
                    .then(function (_) {
                    test_lib_1.expect(renderCompileRequests.length).toBe(1);
                    return renderCompileRequests[0];
                });
            }
            function captureDirective(directive) {
                return captureTemplate(new viewAnn.View({ template: '<div></div>', directives: [directive] }))
                    .then(function (renderTpl) {
                    test_lib_1.expect(renderTpl.directives.length).toBe(1);
                    return renderTpl.directives[0];
                });
            }
            test_lib_1.it('should fill the componentId', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureTemplate(new viewAnn.View({ template: '<div></div>' }))
                    .then(function (renderTpl) {
                    test_lib_1.expect(renderTpl.componentId).toEqual(lang_1.stringify(MainComponent));
                    async.done();
                });
            }));
            test_lib_1.it('should fill inline template', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureTemplate(new viewAnn.View({ template: '<div></div>' }))
                    .then(function (renderTpl) {
                    test_lib_1.expect(renderTpl.template).toEqual('<div></div>');
                    async.done();
                });
            }));
            test_lib_1.it('should fill absUrl given inline templates', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                cmpUrlMapper.setComponentUrl(MainComponent, '/mainComponent');
                captureTemplate(new viewAnn.View({ template: '<div></div>' }))
                    .then(function (renderTpl) {
                    test_lib_1.expect(renderTpl.absUrl).toEqual('http://www.app.com/mainComponent');
                    async.done();
                });
            }));
            test_lib_1.it('should not fill absUrl given no inline template or template url', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                cmpUrlMapper.setComponentUrl(MainComponent, '/mainComponent');
                captureTemplate(new viewAnn.View({ template: null, templateUrl: null }))
                    .then(function (renderTpl) {
                    test_lib_1.expect(renderTpl.absUrl).toBe(null);
                    async.done();
                });
            }));
            test_lib_1.it('should fill absUrl given url template', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                cmpUrlMapper.setComponentUrl(MainComponent, '/mainComponent');
                captureTemplate(new viewAnn.View({ templateUrl: '/someTemplate' }))
                    .then(function (renderTpl) {
                    test_lib_1.expect(renderTpl.absUrl).toEqual('http://www.app.com/mainComponent/someTemplate');
                    async.done();
                });
            }));
            test_lib_1.it('should fill directive.id', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(MainComponent)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.id).toEqual(lang_1.stringify(MainComponent));
                    async.done();
                });
            }));
            test_lib_1.it('should fill directive.selector', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(MainComponent)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.selector).toEqual('main-comp');
                    async.done();
                });
            }));
            test_lib_1.it('should fill directive.type for components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(MainComponent)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.type).toEqual(renderApi.DirectiveMetadata.COMPONENT_TYPE);
                    async.done();
                });
            }));
            test_lib_1.it('should fill directive.type for dynamic components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(SomeDynamicComponentDirective)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.type).toEqual(renderApi.DirectiveMetadata.COMPONENT_TYPE);
                    async.done();
                });
            }));
            test_lib_1.it('should fill directive.type for decorator directives', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(SomeDirective)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.type).toEqual(renderApi.DirectiveMetadata.DIRECTIVE_TYPE);
                    async.done();
                });
            }));
            test_lib_1.it('should set directive.compileChildren to false for other directives', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(MainComponent)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.compileChildren).toEqual(true);
                    async.done();
                });
            }));
            test_lib_1.it('should set directive.compileChildren to true for decorator directives', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(SomeDirective)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.compileChildren).toEqual(true);
                    async.done();
                });
            }));
            test_lib_1.it('should set directive.compileChildren to false for decorator directives', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(IgnoreChildrenDirective)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.compileChildren).toEqual(false);
                    async.done();
                });
            }));
            test_lib_1.it('should set directive.hostListeners', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(DirectiveWithEvents)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.hostListeners)
                        .toEqual(collection_1.MapWrapper.createFromStringMap({ 'someEvent': 'someAction' }));
                    async.done();
                });
            }));
            test_lib_1.it('should set directive.hostProperties', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(DirectiveWithProperties)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.hostProperties)
                        .toEqual(collection_1.MapWrapper.createFromStringMap({ 'someField': 'someProp' }));
                    async.done();
                });
            }));
            test_lib_1.it('should set directive.bind', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(DirectiveWithBind)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.properties).toEqual(['a: b']);
                    async.done();
                });
            }));
            test_lib_1.it('should read @Attribute', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                captureDirective(DirectiveWithAttributes)
                    .then(function (renderDir) {
                    test_lib_1.expect(renderDir.readAttributes).toEqual(['someAttr']);
                    async.done();
                });
            }));
        });
        test_lib_1.describe('call ProtoViewFactory', function () {
            test_lib_1.it('should pass the render protoView', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
                var renderProtoView = createRenderProtoView();
                var expectedProtoView = createProtoView();
                var compiler = createCompiler([renderProtoView], [[expectedProtoView]]);
                compiler.compile(MainComponent)
                    .then(function (_) {
                    var request = protoViewFactory.requests[0];
                    test_lib_1.expect(request[1]).toBe(renderProtoView);
                    async.done();
                });
            }));
            test_lib_1.it('should pass the component binding', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
                var compiler = createCompiler([createRenderProtoView()], [[createProtoView()]]);
                compiler.compile(MainComponent)
                    .then(function (_) {
                    var request = protoViewFactory.requests[0];
                    test_lib_1.expect(request[0].key.token).toBe(MainComponent);
                    async.done();
                });
            }));
            test_lib_1.it('should pass the directive bindings', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>', directives: [SomeDirective] }));
                var compiler = createCompiler([createRenderProtoView()], [[createProtoView()]]);
                compiler.compile(MainComponent)
                    .then(function (_) {
                    var request = protoViewFactory.requests[0];
                    var binding = request[2][0];
                    test_lib_1.expect(binding.key.token).toBe(SomeDirective);
                    async.done();
                });
            }));
            test_lib_1.it('should use the protoView of the ProtoViewFactory', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
                var renderProtoView = createRenderProtoView();
                var expectedProtoView = createProtoView();
                var compiler = createCompiler([renderProtoView], [[expectedProtoView]]);
                compiler.compile(MainComponent)
                    .then(function (protoViewRef) {
                    test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef)).toBe(expectedProtoView);
                    async.done();
                });
            }));
        });
        test_lib_1.it('should load nested components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            tplResolver.setView(NestedComponent, new viewAnn.View({ template: '<div></div>' }));
            var mainProtoView = createProtoView([createComponentElementBinder(directiveResolver, NestedComponent)]);
            var nestedProtoView = createProtoView();
            var compiler = createCompiler([
                createRenderProtoView([createRenderComponentElementBinder(0)]),
                createRenderProtoView()
            ], [[mainProtoView], [nestedProtoView]]);
            compiler.compile(MainComponent)
                .then(function (protoViewRef) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef)).toBe(mainProtoView);
                test_lib_1.expect(mainProtoView.elementBinders[0].nestedProtoView).toBe(nestedProtoView);
                async.done();
            });
        }));
        test_lib_1.it('should load nested components in viewcontainers', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            tplResolver.setView(NestedComponent, new viewAnn.View({ template: '<div></div>' }));
            var mainProtoView = createProtoView([createViewportElementBinder(null)]);
            var viewportProtoView = createProtoView([createComponentElementBinder(directiveResolver, NestedComponent)]);
            var nestedProtoView = createProtoView();
            var compiler = createCompiler([
                createRenderProtoView([createRenderViewportElementBinder(createRenderProtoView([createRenderComponentElementBinder(0)], renderApi.ProtoViewDto.EMBEDDED_VIEW_TYPE))]),
                createRenderProtoView()
            ], [[mainProtoView, viewportProtoView], [nestedProtoView]]);
            compiler.compile(MainComponent)
                .then(function (protoViewRef) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef)).toBe(mainProtoView);
                test_lib_1.expect(viewportProtoView.elementBinders[0].nestedProtoView).toBe(nestedProtoView);
                async.done();
            });
        }));
        test_lib_1.it('should cache compiled components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            var renderProtoView = createRenderProtoView();
            var expectedProtoView = createProtoView();
            var compiler = createCompiler([renderProtoView], [[expectedProtoView]]);
            compiler.compile(MainComponent)
                .then(function (protoViewRef) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef)).toBe(expectedProtoView);
                return compiler.compile(MainComponent);
            })
                .then(function (protoViewRef) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef)).toBe(expectedProtoView);
                async.done();
            });
        }));
        test_lib_1.it('should re-use components being compiled', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            var renderProtoViewCompleter = async_1.PromiseWrapper.completer();
            var expectedProtoView = createProtoView();
            var compiler = createCompiler([renderProtoViewCompleter.promise], [[expectedProtoView]]);
            renderProtoViewCompleter.resolve(createRenderProtoView());
            async_1.PromiseWrapper.all([compiler.compile(MainComponent), compiler.compile(MainComponent)])
                .then(function (protoViewRefs) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRefs[0])).toBe(expectedProtoView);
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRefs[1])).toBe(expectedProtoView);
                async.done();
            });
        }));
        test_lib_1.it('should allow recursive components', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            var mainProtoView = createProtoView([createComponentElementBinder(directiveResolver, MainComponent)]);
            var compiler = createCompiler([createRenderProtoView([createRenderComponentElementBinder(0)])], [[mainProtoView]]);
            compiler.compile(MainComponent)
                .then(function (protoViewRef) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef)).toBe(mainProtoView);
                test_lib_1.expect(mainProtoView.elementBinders[0].nestedProtoView).toBe(mainProtoView);
                async.done();
            });
        }));
        test_lib_1.it('should create host proto views', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            renderCompiler.spy('compileHost')
                .andCallFake(function (componentId) {
                return async_1.PromiseWrapper.resolve(createRenderProtoView([createRenderComponentElementBinder(0)], renderApi.ProtoViewDto.HOST_VIEW_TYPE));
            });
            tplResolver.setView(MainComponent, new viewAnn.View({ template: '<div></div>' }));
            var rootProtoView = createProtoView([createComponentElementBinder(directiveResolver, MainComponent)]);
            var mainProtoView = createProtoView();
            var compiler = createCompiler([createRenderProtoView()], [[rootProtoView], [mainProtoView]]);
            compiler.compileInHost(MainComponent)
                .then(function (protoViewRef) {
                test_lib_1.expect(view_ref_1.internalProtoView(protoViewRef)).toBe(rootProtoView);
                test_lib_1.expect(rootProtoView.elementBinders[0].nestedProtoView).toBe(mainProtoView);
                async.done();
            });
        }));
        test_lib_1.it('should throw for non component types', function () {
            var compiler = createCompiler([], []);
            test_lib_1.expect(function () { return compiler.compile(SomeDirective); })
                .toThrowError("Could not load '" + lang_1.stringify(SomeDirective) + "' because it is not a component.");
        });
    });
}
exports.main = main;
function createDirectiveBinding(directiveResolver, type) {
    var annotation = directiveResolver.resolve(type);
    return element_injector_1.DirectiveBinding.createFromType(type, annotation);
}
function createProtoView(elementBinders) {
    if (elementBinders === void 0) { elementBinders = null; }
    var pv = new view_1.AppProtoView(null, null, collection_1.MapWrapper.create());
    if (lang_1.isBlank(elementBinders)) {
        elementBinders = [];
    }
    pv.elementBinders = elementBinders;
    return pv;
}
function createComponentElementBinder(directiveResolver, type) {
    var binding = createDirectiveBinding(directiveResolver, type);
    return new element_binder_1.ElementBinder(0, null, 0, null, binding);
}
function createViewportElementBinder(nestedProtoView) {
    var elBinder = new element_binder_1.ElementBinder(0, null, 0, null, null);
    elBinder.nestedProtoView = nestedProtoView;
    return elBinder;
}
function createRenderProtoView(elementBinders, type) {
    if (elementBinders === void 0) { elementBinders = null; }
    if (type === void 0) { type = null; }
    if (lang_1.isBlank(type)) {
        type = renderApi.ProtoViewDto.COMPONENT_VIEW_TYPE;
    }
    if (lang_1.isBlank(elementBinders)) {
        elementBinders = [];
    }
    return new renderApi.ProtoViewDto({ elementBinders: elementBinders, type: type });
}
function createRenderComponentElementBinder(directiveIndex) {
    return new renderApi.ElementBinder({ directives: [new renderApi.DirectiveBinder({ directiveIndex: directiveIndex })] });
}
function createRenderViewportElementBinder(nestedProtoView) {
    return new renderApi.ElementBinder({ nestedProtoView: nestedProtoView });
}
var MainComponent = (function () {
    function MainComponent() {
    }
    MainComponent = __decorate([
        annotations_1.Component({ selector: 'main-comp' }), 
        __metadata('design:paramtypes', [])
    ], MainComponent);
    return MainComponent;
})();
var NestedComponent = (function () {
    function NestedComponent() {
    }
    NestedComponent = __decorate([
        annotations_1.Component(), 
        __metadata('design:paramtypes', [])
    ], NestedComponent);
    return NestedComponent;
})();
var RecursiveComponent = (function () {
    function RecursiveComponent() {
    }
    return RecursiveComponent;
})();
var SomeDynamicComponentDirective = (function () {
    function SomeDynamicComponentDirective() {
    }
    SomeDynamicComponentDirective = __decorate([
        annotations_1.Component(), 
        __metadata('design:paramtypes', [])
    ], SomeDynamicComponentDirective);
    return SomeDynamicComponentDirective;
})();
var SomeDirective = (function () {
    function SomeDirective() {
    }
    SomeDirective = __decorate([
        annotations_1.Directive(), 
        __metadata('design:paramtypes', [])
    ], SomeDirective);
    return SomeDirective;
})();
var IgnoreChildrenDirective = (function () {
    function IgnoreChildrenDirective() {
    }
    IgnoreChildrenDirective = __decorate([
        annotations_1.Directive({ compileChildren: false }), 
        __metadata('design:paramtypes', [])
    ], IgnoreChildrenDirective);
    return IgnoreChildrenDirective;
})();
var DirectiveWithEvents = (function () {
    function DirectiveWithEvents() {
    }
    DirectiveWithEvents = __decorate([
        annotations_1.Directive({ hostListeners: { 'someEvent': 'someAction' } }), 
        __metadata('design:paramtypes', [])
    ], DirectiveWithEvents);
    return DirectiveWithEvents;
})();
var DirectiveWithProperties = (function () {
    function DirectiveWithProperties() {
    }
    DirectiveWithProperties = __decorate([
        annotations_1.Directive({ hostProperties: { 'someField': 'someProp' } }), 
        __metadata('design:paramtypes', [])
    ], DirectiveWithProperties);
    return DirectiveWithProperties;
})();
var DirectiveWithBind = (function () {
    function DirectiveWithBind() {
    }
    DirectiveWithBind = __decorate([
        annotations_1.Directive({ properties: ['a: b'] }), 
        __metadata('design:paramtypes', [])
    ], DirectiveWithBind);
    return DirectiveWithBind;
})();
var DirectiveWithAttributes = (function () {
    function DirectiveWithAttributes(someAttr) {
    }
    DirectiveWithAttributes = __decorate([
        annotations_1.Directive(),
        __param(0, annotations_1.Attribute('someAttr')), 
        __metadata('design:paramtypes', [String])
    ], DirectiveWithAttributes);
    return DirectiveWithAttributes;
})();
var SpyRenderCompiler = (function (_super) {
    __extends(SpyRenderCompiler, _super);
    function SpyRenderCompiler() {
        _super.call(this, api_1.RenderCompiler);
    }
    SpyRenderCompiler.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyRenderCompiler = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(api_1.RenderCompiler), 
        __metadata('design:paramtypes', [])
    ], SpyRenderCompiler);
    return SpyRenderCompiler;
})(test_lib_1.SpyObject);
var FakeUrlResolver = (function (_super) {
    __extends(FakeUrlResolver, _super);
    function FakeUrlResolver() {
        _super.call(this);
    }
    FakeUrlResolver.prototype.resolve = function (baseUrl, url) {
        if (baseUrl === null && url == './') {
            return 'http://www.app.com';
        }
        return baseUrl + url;
    };
    return FakeUrlResolver;
})(url_resolver_1.UrlResolver);
var FakeTemplateResolver = (function (_super) {
    __extends(FakeTemplateResolver, _super);
    function FakeTemplateResolver() {
        _super.call(this);
        this._cmpTemplates = collection_1.MapWrapper.create();
    }
    FakeTemplateResolver.prototype.resolve = function (component) {
        var template = collection_1.MapWrapper.get(this._cmpTemplates, component);
        if (lang_1.isBlank(template)) {
            // dynamic component
            return null;
        }
        return template;
    };
    FakeTemplateResolver.prototype.setView = function (component, template) {
        collection_1.MapWrapper.set(this._cmpTemplates, component, template);
    };
    return FakeTemplateResolver;
})(template_resolver_1.TemplateResolver);
var FakeProtoViewFactory = (function (_super) {
    __extends(FakeProtoViewFactory, _super);
    function FakeProtoViewFactory(results) {
        _super.call(this, null);
        this.results = results;
        this.requests = [];
    }
    FakeProtoViewFactory.prototype.createAppProtoViews = function (componentBinding, renderProtoView, directives) {
        collection_1.ListWrapper.push(this.requests, [componentBinding, renderProtoView, directives]);
        return collection_1.ListWrapper.removeAt(this.results, 0);
    };
    return FakeProtoViewFactory;
})(proto_view_factory_1.ProtoViewFactory);
//# sourceMappingURL=compiler_spec.js.map