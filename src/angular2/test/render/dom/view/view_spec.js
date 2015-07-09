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
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var proto_view_1 = require('angular2/src/render/dom/view/proto_view');
var element_binder_1 = require('angular2/src/render/dom/view/element_binder');
var view_1 = require('angular2/src/render/dom/view/view');
var light_dom_1 = require('angular2/src/render/dom/shadow_dom/light_dom');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
function main() {
    test_lib_1.describe('DomView', function () {
        function createProtoView(binders) {
            if (binders === void 0) { binders = null; }
            if (lang_1.isBlank(binders)) {
                binders = [];
            }
            var rootEl = test_lib_1.el('<div></div>');
            return new proto_view_1.DomProtoView({ element: rootEl, elementBinders: binders });
        }
        function createView(pv, boundElementCount) {
            if (pv === void 0) { pv = null; }
            if (boundElementCount === void 0) { boundElementCount = 0; }
            if (lang_1.isBlank(pv)) {
                pv = createProtoView();
            }
            var root = test_lib_1.el('<div><div></div></div>');
            var boundElements = [];
            for (var i = 0; i < boundElementCount; i++) {
                collection_1.ListWrapper.push(boundElements, test_lib_1.el('<span></span'));
            }
            return new view_1.DomView(pv, [dom_adapter_1.DOM.childNodes(root)[0]], [], boundElements, []);
        }
        test_lib_1.describe('getDirectParentLightDom', function () {
            test_lib_1.it('should return the LightDom of the direct parent', function () {
                var pv = createProtoView([new element_binder_1.ElementBinder(), new element_binder_1.ElementBinder({ parentIndex: 0, distanceToParent: 1 })]);
                var view = createView(pv, 2);
                view.lightDoms[0] = new SpyLightDom();
                view.lightDoms[1] = new SpyLightDom();
                test_lib_1.expect(view.getDirectParentLightDom(1)).toBe(view.lightDoms[0]);
            });
            test_lib_1.it('should return null if the direct parent is not bound', function () {
                var pv = createProtoView([
                    new element_binder_1.ElementBinder(),
                    new element_binder_1.ElementBinder(),
                    new element_binder_1.ElementBinder({ parentIndex: 0, distanceToParent: 2 })
                ]);
                var view = createView(pv, 3);
                view.lightDoms[0] = new SpyLightDom();
                view.lightDoms[1] = new SpyLightDom();
                view.lightDoms[2] = new SpyLightDom();
                test_lib_1.expect(view.getDirectParentLightDom(2)).toBe(null);
            });
        });
    });
}
exports.main = main;
var SpyLightDom = (function (_super) {
    __extends(SpyLightDom, _super);
    function SpyLightDom() {
        _super.call(this, light_dom_1.LightDom);
    }
    SpyLightDom.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyLightDom = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(light_dom_1.LightDom), 
        __metadata('design:paramtypes', [])
    ], SpyLightDom);
    return SpyLightDom;
})(test_lib_1.SpyObject);
//# sourceMappingURL=view_spec.js.map