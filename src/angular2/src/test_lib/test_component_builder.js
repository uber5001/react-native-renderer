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
var di_1 = require('angular2/di');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var template_resolver_1 = require('angular2/src/core/compiler/template_resolver');
var view_ref_1 = require('angular2/src/core/compiler/view_ref');
var dynamic_component_loader_1 = require('angular2/src/core/compiler/dynamic_component_loader');
var utils_1 = require('./utils');
var dom_renderer_1 = require('angular2/src/render/dom/dom_renderer');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var debug_element_1 = require('angular2/src/debug/debug_element');
/**
 * @exportedAs angular2/test
 */
var RootTestComponent = (function (_super) {
    __extends(RootTestComponent, _super);
    function RootTestComponent(componentRef) {
        _super.call(this, view_ref_1.internalView(componentRef.hostView), 0);
        this._componentParentView = view_ref_1.internalView(componentRef.hostView);
        this._componentRef = componentRef;
    }
    RootTestComponent.prototype.detectChanges = function () {
        this._componentParentView.changeDetector.detectChanges();
        this._componentParentView.changeDetector.checkNoChanges();
    };
    RootTestComponent.prototype.destroy = function () { this._componentRef.dispose(); };
    return RootTestComponent;
})(debug_element_1.DebugElement);
exports.RootTestComponent = RootTestComponent;
var _nextRootElementId = 0;
/**
 * @exportedAs angular2/test
 *
 * Builds a RootTestComponent for use in component level tests.
 */
var TestComponentBuilder = (function () {
    function TestComponentBuilder(injector) {
        this._injector = injector;
        this._viewOverrides = collection_1.MapWrapper.create();
        this._directiveOverrides = collection_1.MapWrapper.create();
        this._templateOverrides = collection_1.MapWrapper.create();
    }
    TestComponentBuilder.prototype._clone = function () {
        var clone = new TestComponentBuilder(this._injector);
        clone._viewOverrides = collection_1.MapWrapper.clone(this._viewOverrides);
        clone._directiveOverrides = collection_1.MapWrapper.clone(this._directiveOverrides);
        clone._templateOverrides = collection_1.MapWrapper.clone(this._templateOverrides);
        return clone;
    };
    /**
     * Overrides only the html of a {@link Component}.
     * All the other propoerties of the component's {@link View} are preserved.
     *
     * @param {Type} component
     * @param {string} html
     *
     * @return {TestComponentBuilder}
     */
    TestComponentBuilder.prototype.overrideTemplate = function (componentType, template) {
        var clone = this._clone();
        collection_1.MapWrapper.set(clone._templateOverrides, componentType, template);
        return clone;
    };
    /**
     * Overrides a component's {@link View}.
     *
     * @param {Type} component
     * @param {view} View
     *
     * @return {TestComponentBuilder}
     */
    TestComponentBuilder.prototype.overrideView = function (componentType, view) {
        var clone = this._clone();
        collection_1.MapWrapper.set(clone._viewOverrides, componentType, view);
        return clone;
    };
    /**
     * Overrides the directives from the component {@link View}.
     *
     * @param {Type} component
     * @param {Type} from
     * @param {Type} to
     *
     * @return {TestComponentBuilder}
     */
    TestComponentBuilder.prototype.overrideDirective = function (componentType, from, to) {
        var clone = this._clone();
        var overridesForComponent = collection_1.MapWrapper.get(clone._directiveOverrides, componentType);
        if (!lang_1.isPresent(overridesForComponent)) {
            collection_1.MapWrapper.set(clone._directiveOverrides, componentType, collection_1.MapWrapper.create());
            overridesForComponent = collection_1.MapWrapper.get(clone._directiveOverrides, componentType);
        }
        collection_1.MapWrapper.set(overridesForComponent, from, to);
        return clone;
    };
    /**
     * Builds and returns a RootTestComponent.
     *
     * @return {Promise<RootTestComponent>}
     */
    TestComponentBuilder.prototype.createAsync = function (rootComponentType) {
        var mockTemplateResolver = this._injector.get(template_resolver_1.TemplateResolver);
        collection_1.MapWrapper.forEach(this._viewOverrides, function (view, type) { mockTemplateResolver.setView(type, view); });
        collection_1.MapWrapper.forEach(this._templateOverrides, function (template, type) {
            mockTemplateResolver.setInlineTemplate(type, template);
        });
        collection_1.MapWrapper.forEach(this._directiveOverrides, function (overrides, component) {
            collection_1.MapWrapper.forEach(overrides, function (to, from) {
                mockTemplateResolver.overrideViewDirective(component, from, to);
            });
        });
        var rootElId = "root" + _nextRootElementId++;
        var rootEl = utils_1.el("<div id=\"" + rootElId + "\"></div>");
        var doc = this._injector.get(dom_renderer_1.DOCUMENT_TOKEN);
        // TODO(juliemr): can/should this be optional?
        dom_adapter_1.DOM.appendChild(doc.body, rootEl);
        return this._injector.get(dynamic_component_loader_1.DynamicComponentLoader)
            .loadAsRoot(rootComponentType, "#" + rootElId, this._injector)
            .then(function (componentRef) { return new RootTestComponent(componentRef); });
    };
    TestComponentBuilder = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [di_1.Injector])
    ], TestComponentBuilder);
    return TestComponentBuilder;
})();
exports.TestComponentBuilder = TestComponentBuilder;
//# sourceMappingURL=test_component_builder.js.map