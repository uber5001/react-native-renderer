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
var di_1 = require('angular2/di');
var collection_1 = require('angular2/src/facade/collection');
var async_1 = require('angular2/src/facade/async');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var dom_renderer_1 = require('angular2/src/render/dom/dom_renderer');
var compiler_1 = require('angular2/src/render/dom/compiler/compiler');
var api_1 = require('angular2/src/render/api');
var view_1 = require('angular2/src/render/dom/view/view');
var test_lib_1 = require('angular2/test_lib');
var TestView = (function () {
    function TestView(viewRef) {
        this.viewRef = viewRef;
        this.rawView = view_1.resolveInternalDomView(viewRef);
        this.events = [];
    }
    return TestView;
})();
exports.TestView = TestView;
var LoggingEventDispatcher = (function () {
    function LoggingEventDispatcher(log) {
        this.log = log;
    }
    LoggingEventDispatcher.prototype.dispatchEvent = function (elementIndex, eventName, locals) {
        collection_1.ListWrapper.push(this.log, [elementIndex, eventName, locals]);
        return true;
    };
    return LoggingEventDispatcher;
})();
var DomTestbed = (function () {
    function DomTestbed(renderer, compiler, document) {
        this.renderer = renderer;
        this.compiler = compiler;
        this.rootEl = test_lib_1.el('<div id="root"></div>');
        var oldRoots = dom_adapter_1.DOM.querySelectorAll(document, '#root');
        for (var i = 0; i < oldRoots.length; i++) {
            dom_adapter_1.DOM.remove(oldRoots[i]);
        }
        dom_adapter_1.DOM.appendChild(dom_adapter_1.DOM.querySelector(document, 'body'), this.rootEl);
    }
    DomTestbed.prototype.compileAll = function (directivesOrViewDefinitions) {
        var _this = this;
        return async_1.PromiseWrapper.all(collection_1.ListWrapper.map(directivesOrViewDefinitions, function (entry) {
            if (entry instanceof api_1.DirectiveMetadata) {
                return _this.compiler.compileHost(entry);
            }
            else {
                return _this.compiler.compile(entry);
            }
        }));
    };
    DomTestbed.prototype._createTestView = function (viewRef) {
        var testView = new TestView(viewRef);
        this.renderer.setEventDispatcher(viewRef, new LoggingEventDispatcher(testView.events));
        return testView;
    };
    DomTestbed.prototype.createRootView = function (rootProtoView) {
        var viewRef = this.renderer.createRootHostView(rootProtoView.render, '#root');
        this.renderer.hydrateView(viewRef);
        return this._createTestView(viewRef);
    };
    DomTestbed.prototype.createComponentView = function (parentViewRef, boundElementIndex, componentProtoView) {
        var componentViewRef = this.renderer.createView(componentProtoView.render);
        this.renderer.attachComponentView(parentViewRef, boundElementIndex, componentViewRef);
        this.renderer.hydrateView(componentViewRef);
        return this._createTestView(componentViewRef);
    };
    DomTestbed.prototype.createRootViews = function (protoViews) {
        var views = [];
        var lastView = this.createRootView(protoViews[0]);
        collection_1.ListWrapper.push(views, lastView);
        for (var i = 1; i < protoViews.length; i++) {
            lastView = this.createComponentView(lastView.viewRef, 0, protoViews[i]);
            collection_1.ListWrapper.push(views, lastView);
        }
        return views;
    };
    DomTestbed.prototype.destroyComponentView = function (parentViewRef, boundElementIndex, componentView) {
        this.renderer.dehydrateView(componentView);
        this.renderer.detachComponentView(parentViewRef, boundElementIndex, componentView);
    };
    DomTestbed.prototype.createViewInContainer = function (parentViewRef, boundElementIndex, atIndex, protoView) {
        var viewRef = this.renderer.createView(protoView.render);
        this.renderer.attachViewInContainer(parentViewRef, boundElementIndex, atIndex, viewRef);
        this.renderer.hydrateView(viewRef);
        return this._createTestView(viewRef);
    };
    DomTestbed.prototype.destroyViewInContainer = function (parentViewRef, boundElementIndex, atIndex, viewRef) {
        this.renderer.dehydrateView(viewRef);
        this.renderer.detachViewInContainer(parentViewRef, boundElementIndex, atIndex, viewRef);
        this.renderer.destroyView(viewRef);
    };
    DomTestbed.prototype.triggerEvent = function (viewRef, boundElementIndex, eventName) {
        var element = view_1.resolveInternalDomView(viewRef).boundElements[boundElementIndex];
        test_lib_1.dispatchEvent(element, eventName);
    };
    DomTestbed = __decorate([
        di_1.Injectable(),
        __param(2, di_1.Inject(dom_renderer_1.DOCUMENT_TOKEN)), 
        __metadata('design:paramtypes', [dom_renderer_1.DomRenderer, compiler_1.DefaultDomCompiler, Object])
    ], DomTestbed);
    return DomTestbed;
})();
exports.DomTestbed = DomTestbed;
//# sourceMappingURL=dom_testbed.js.map