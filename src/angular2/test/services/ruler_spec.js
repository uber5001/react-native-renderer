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
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var element_ref_1 = require('angular2/src/core/compiler/element_ref');
var ruler_1 = require('angular2/src/services/ruler');
var rectangle_mock_1 = require('./rectangle_mock');
var lang_1 = require('angular2/src/facade/lang');
function assertDimensions(rect, left, right, top, bottom, width, height) {
    test_lib_1.expect(rect.left).toEqual(left);
    test_lib_1.expect(rect.right).toEqual(right);
    test_lib_1.expect(rect.top).toEqual(top);
    test_lib_1.expect(rect.bottom).toEqual(bottom);
    test_lib_1.expect(rect.width).toEqual(width);
    test_lib_1.expect(rect.height).toEqual(height);
}
function main() {
    test_lib_1.describe('ruler service', function () {
        test_lib_1.it('should allow measuring ElementRefs', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var ruler = new ruler_1.Ruler(test_lib_1.SpyObject.stub(new SpyDomAdapter(), { 'getBoundingClientRect': rectangle_mock_1.createRectangle(10, 20, 200, 100) }));
            var elRef = new SpyElementRef();
            ruler.measure(elRef).then(function (rect) {
                assertDimensions(rect, 10, 210, 20, 120, 200, 100);
                async.done();
            });
        }));
        test_lib_1.it('should return 0 for all rectangle values while measuring elements in a document fragment', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var ruler = new ruler_1.Ruler(dom_adapter_1.DOM);
            var elRef = new SpyElementRef();
            elRef.domElement = dom_adapter_1.DOM.createElement('div');
            ruler.measure(elRef).then(function (rect) {
                // here we are using an element created in a doc fragment so all the measures will come
                // back as 0
                assertDimensions(rect, 0, 0, 0, 0, 0, 0);
                async.done();
            });
        }));
    });
}
exports.main = main;
var SpyElementRef = (function (_super) {
    __extends(SpyElementRef, _super);
    function SpyElementRef() {
        _super.call(this, element_ref_1.ElementRef);
    }
    SpyElementRef.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyElementRef = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(element_ref_1.ElementRef), 
        __metadata('design:paramtypes', [])
    ], SpyElementRef);
    return SpyElementRef;
})(test_lib_1.SpyObject);
var SpyDomAdapter = (function (_super) {
    __extends(SpyDomAdapter, _super);
    function SpyDomAdapter() {
        _super.call(this, dom_adapter_1.DomAdapter);
    }
    SpyDomAdapter.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyDomAdapter = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(dom_adapter_1.DomAdapter), 
        __metadata('design:paramtypes', [])
    ], SpyDomAdapter);
    return SpyDomAdapter;
})(test_lib_1.SpyObject);
//# sourceMappingURL=ruler_spec.js.map