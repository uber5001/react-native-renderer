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
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var di_1 = require('angular2/di');
var view_listener_1 = require('angular2/src/core/compiler/view_listener');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var view_1 = require('angular2/src/render/dom/view/view');
var debug_element_1 = require('./debug_element');
var NG_ID_PROPERTY = 'ngid';
var INSPECT_GLOBAL_NAME = 'ngProbe';
var NG_ID_SEPARATOR_RE = lang_1.RegExpWrapper.create('#');
var NG_ID_SEPARATOR = '#';
// Need to keep the views in a global Map so that multiple angular apps are supported
var _allIdsByView = lang_1.CONST_EXPR(collection_1.MapWrapper.create());
var _allViewsById = lang_1.CONST_EXPR(collection_1.MapWrapper.create());
var _nextId = 0;
function _setElementId(element, indices) {
    if (lang_1.isPresent(element)) {
        dom_adapter_1.DOM.setData(element, NG_ID_PROPERTY, collection_1.ListWrapper.join(indices, NG_ID_SEPARATOR));
    }
}
function _getElementId(element) {
    var elId = dom_adapter_1.DOM.getData(element, NG_ID_PROPERTY);
    if (lang_1.isPresent(elId)) {
        return collection_1.ListWrapper.map(lang_1.StringWrapper.split(elId, NG_ID_SEPARATOR_RE), function (partStr) { return lang_1.NumberWrapper.parseInt(partStr, 10); });
    }
    else {
        return null;
    }
}
function inspectDomElement(element) {
    var elId = _getElementId(element);
    if (lang_1.isPresent(elId)) {
        var view = collection_1.MapWrapper.get(_allViewsById, elId[0]);
        if (lang_1.isPresent(view)) {
            return new debug_element_1.DebugElement(view, elId[1]);
        }
    }
    return null;
}
exports.inspectDomElement = inspectDomElement;
var DebugElementViewListener = (function () {
    function DebugElementViewListener() {
        dom_adapter_1.DOM.setGlobalVar(INSPECT_GLOBAL_NAME, inspectDomElement);
    }
    DebugElementViewListener.prototype.viewCreated = function (view) {
        var viewId = _nextId++;
        collection_1.MapWrapper.set(_allViewsById, viewId, view);
        collection_1.MapWrapper.set(_allIdsByView, view, viewId);
        var renderView = view_1.resolveInternalDomView(view.render);
        for (var i = 0; i < renderView.boundElements.length; i++) {
            _setElementId(renderView.boundElements[i], [viewId, i]);
        }
    };
    DebugElementViewListener.prototype.viewDestroyed = function (view) {
        var viewId = collection_1.MapWrapper.get(_allIdsByView, view);
        collection_1.MapWrapper.delete(_allIdsByView, view);
        collection_1.MapWrapper.delete(_allViewsById, viewId);
    };
    DebugElementViewListener = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DebugElementViewListener);
    return DebugElementViewListener;
})();
exports.DebugElementViewListener = DebugElementViewListener;
exports.ELEMENT_PROBE_CONFIG = [
    DebugElementViewListener,
    di_1.bind(view_listener_1.AppViewListener).toAlias(DebugElementViewListener),
];
//# sourceMappingURL=debug_element_view_listener.js.map