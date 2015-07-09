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
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var view_1 = require('angular2/src/core/compiler/view');
var view_ref_1 = require('angular2/src/core/compiler/view_ref');
var element_ref_1 = require('angular2/src/core/compiler/element_ref');
var view_container_ref_1 = require('angular2/src/core/compiler/view_container_ref');
var view_manager_1 = require('angular2/src/core/compiler/view_manager');
function main() {
    // TODO(tbosch): add missing tests
    test_lib_1.describe('ViewContainerRef', function () {
        var location;
        var view;
        var viewManager;
        function wrapView(view) { return new view_ref_1.ViewRef(view); }
        function createProtoView() { return new view_1.AppProtoView(null, null, null); }
        function createView() { return new view_1.AppView(null, createProtoView(), collection_1.MapWrapper.create()); }
        function createViewContainer() { return new view_container_ref_1.ViewContainerRef(viewManager, location); }
        test_lib_1.beforeEach(function () {
            viewManager = new AppViewManagerSpy();
            view = createView();
            view.viewContainers = [null];
            location = new element_ref_1.ElementRef(wrapView(view), 0);
        });
        test_lib_1.describe('length', function () {
            test_lib_1.it('should return a 0 length if there is no underlying ViewContainerRef', function () {
                var vc = createViewContainer();
                test_lib_1.expect(vc.length).toBe(0);
            });
            test_lib_1.it('should return the size of the underlying ViewContainerRef', function () {
                var vc = createViewContainer();
                view.viewContainers = [new view_1.AppViewContainer()];
                view.viewContainers[0].views = [createView()];
                test_lib_1.expect(vc.length).toBe(1);
            });
        });
        // TODO: add missing tests here!
    });
}
exports.main = main;
var AppViewManagerSpy = (function (_super) {
    __extends(AppViewManagerSpy, _super);
    function AppViewManagerSpy() {
        _super.call(this, view_manager_1.AppViewManager);
    }
    AppViewManagerSpy.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    AppViewManagerSpy = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(view_manager_1.AppViewManager), 
        __metadata('design:paramtypes', [])
    ], AppViewManagerSpy);
    return AppViewManagerSpy;
})(test_lib_1.SpyObject);
//# sourceMappingURL=view_container_ref_spec.js.map