var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var test_lib_1 = require('angular2/test_lib');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var compiler_1 = require('angular2/src/render/dom/compiler/compiler');
var api_1 = require('angular2/src/render/api');
var compile_step_factory_1 = require('angular2/src/render/dom/compiler/compile_step_factory');
var template_loader_1 = require('angular2/src/render/dom/compiler/template_loader');
var url_resolver_1 = require('angular2/src/services/url_resolver');
var proto_view_1 = require('angular2/src/render/dom/view/proto_view');
function runCompilerCommonTests() {
    test_lib_1.describe('DomCompiler', function () {
        var mockStepFactory;
        function createCompiler(processClosure, urlData) {
            if (urlData === void 0) { urlData = null; }
            if (lang_1.isBlank(urlData)) {
                urlData = collection_1.MapWrapper.create();
            }
            var tplLoader = new FakeTemplateLoader(urlData);
            mockStepFactory = new MockStepFactory([new MockStep(processClosure)]);
            return new compiler_1.DomCompiler(mockStepFactory, tplLoader);
        }
        test_lib_1.describe('compile', function () {
            test_lib_1.it('should run the steps and build the AppProtoView of the root element', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(function (parent, current, control) {
                    current.inheritedProtoView.bindVariable('b', 'a');
                });
                compiler.compile(new api_1.ViewDefinition({ componentId: 'someComponent', template: '<div></div>' }))
                    .then(function (protoView) {
                    test_lib_1.expect(protoView.variableBindings)
                        .toEqual(collection_1.MapWrapper.createFromStringMap({ 'a': 'b' }));
                    async.done();
                });
            }));
            test_lib_1.it('should run the steps and build the proto view', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(function (parent, current, control) {
                    current.inheritedProtoView.bindVariable('b', 'a');
                });
                var dirMetadata = new api_1.DirectiveMetadata({ id: 'id', selector: 'CUSTOM', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
                compiler.compileHost(dirMetadata)
                    .then(function (protoView) {
                    test_lib_1.expect(dom_adapter_1.DOM.tagName(proto_view_1.resolveInternalDomProtoView(protoView.render).element))
                        .toEqual('CUSTOM');
                    test_lib_1.expect(mockStepFactory.viewDef.directives).toEqual([dirMetadata]);
                    test_lib_1.expect(protoView.variableBindings)
                        .toEqual(collection_1.MapWrapper.createFromStringMap({ 'a': 'b' }));
                    async.done();
                });
            }));
            test_lib_1.it('should use the inline template and compile in sync', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(EMPTY_STEP);
                compiler.compile(new api_1.ViewDefinition({ componentId: 'someId', template: 'inline component' }))
                    .then(function (protoView) {
                    test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(proto_view_1.resolveInternalDomProtoView(protoView.render).element))
                        .toEqual('inline component');
                    async.done();
                });
            }));
            test_lib_1.it('should load url templates', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var urlData = collection_1.MapWrapper.createFromStringMap({ 'someUrl': 'url component' });
                var compiler = createCompiler(EMPTY_STEP, urlData);
                compiler.compile(new api_1.ViewDefinition({ componentId: 'someId', absUrl: 'someUrl' }))
                    .then(function (protoView) {
                    test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(proto_view_1.resolveInternalDomProtoView(protoView.render).element))
                        .toEqual('url component');
                    async.done();
                });
            }));
            test_lib_1.it('should report loading errors', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(EMPTY_STEP, collection_1.MapWrapper.create());
                async_1.PromiseWrapper.catchError(compiler.compile(new api_1.ViewDefinition({ componentId: 'someId', absUrl: 'someUrl' })), function (e) {
                    test_lib_1.expect(e.message).toContain("Failed to load the template \"someId\"");
                    async.done();
                    return null;
                });
            }));
            test_lib_1.it('should wait for async subtasks to be resolved', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var subTasksCompleted = false;
                var completer = async_1.PromiseWrapper.completer();
                var compiler = createCompiler(function (parent, current, control) {
                    collection_1.ListWrapper.push(mockStepFactory.subTaskPromises, completer.promise.then(function (_) { subTasksCompleted = true; }));
                });
                // It should always return a Promise because the subtask is async
                var pvPromise = compiler.compile(new api_1.ViewDefinition({ componentId: 'someId', template: 'some component' }));
                test_lib_1.expect(pvPromise).toBePromise();
                test_lib_1.expect(subTasksCompleted).toEqual(false);
                // The Promise should resolve after the subtask is ready
                completer.resolve(null);
                pvPromise.then(function (protoView) {
                    test_lib_1.expect(subTasksCompleted).toEqual(true);
                    async.done();
                });
            }));
            test_lib_1.it('should return ProtoViews of type COMPONENT_VIEW_TYPE', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(EMPTY_STEP);
                compiler.compile(new api_1.ViewDefinition({ componentId: 'someId', template: 'inline component' }))
                    .then(function (protoView) {
                    test_lib_1.expect(protoView.type).toEqual(api_1.ProtoViewDto.COMPONENT_VIEW_TYPE);
                    async.done();
                });
            }));
        });
        test_lib_1.describe('compileHost', function () {
            test_lib_1.it('should return ProtoViews of type HOST_VIEW_TYPE', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var compiler = createCompiler(EMPTY_STEP);
                compiler.compileHost(someComponent)
                    .then(function (protoView) {
                    test_lib_1.expect(protoView.type).toEqual(api_1.ProtoViewDto.HOST_VIEW_TYPE);
                    async.done();
                });
            }));
        });
    });
}
exports.runCompilerCommonTests = runCompilerCommonTests;
var MockStepFactory = (function (_super) {
    __extends(MockStepFactory, _super);
    function MockStepFactory(steps) {
        _super.call(this);
        this.steps = steps;
    }
    MockStepFactory.prototype.createSteps = function (viewDef, subTaskPromises) {
        this.viewDef = viewDef;
        this.subTaskPromises = subTaskPromises;
        collection_1.ListWrapper.forEach(this.subTaskPromises, function (p) { return collection_1.ListWrapper.push(subTaskPromises, p); });
        return this.steps;
    };
    return MockStepFactory;
})(compile_step_factory_1.CompileStepFactory);
var MockStep = (function () {
    function MockStep(process) {
        this.processClosure = process;
    }
    MockStep.prototype.process = function (parent, current, control) {
        this.processClosure(parent, current, control);
    };
    return MockStep;
})();
var EMPTY_STEP = function (parent, current, control) {
    if (lang_1.isPresent(parent)) {
        current.inheritedProtoView = parent.inheritedProtoView;
    }
};
var FakeTemplateLoader = (function (_super) {
    __extends(FakeTemplateLoader, _super);
    function FakeTemplateLoader(urlData) {
        _super.call(this, null, new url_resolver_1.UrlResolver());
        this._urlData = urlData;
    }
    FakeTemplateLoader.prototype.load = function (template) {
        if (lang_1.isPresent(template.template)) {
            return async_1.PromiseWrapper.resolve(dom_adapter_1.DOM.createTemplate(template.template));
        }
        if (lang_1.isPresent(template.absUrl)) {
            var content = collection_1.MapWrapper.get(this._urlData, template.absUrl);
            if (lang_1.isPresent(content)) {
                return async_1.PromiseWrapper.resolve(dom_adapter_1.DOM.createTemplate(content));
            }
        }
        return async_1.PromiseWrapper.reject('Load failed', null);
    };
    return FakeTemplateLoader;
})(template_loader_1.TemplateLoader);
var someComponent = new api_1.DirectiveMetadata({ selector: 'some-comp', id: 'someComponent', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
//# sourceMappingURL=compiler_common_tests.js.map