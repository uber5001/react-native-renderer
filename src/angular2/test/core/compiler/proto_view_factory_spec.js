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
var change_detection_1 = require('angular2/change_detection');
var proto_view_factory_1 = require('angular2/src/core/compiler/proto_view_factory');
var annotations_1 = require('angular2/annotations');
var directive_resolver_1 = require('angular2/src/core/compiler/directive_resolver');
var element_injector_1 = require('angular2/src/core/compiler/element_injector');
var renderApi = require('angular2/src/render/api');
function main() {
    // TODO(tbosch): add missing tests
    test_lib_1.describe('ProtoViewFactory', function () {
        var changeDetection;
        var protoViewFactory;
        var directiveResolver;
        test_lib_1.beforeEach(function () {
            directiveResolver = new directive_resolver_1.DirectiveResolver();
            changeDetection = new ChangeDetectionSpy();
            protoViewFactory = new proto_view_factory_1.ProtoViewFactory(changeDetection);
        });
        function bindDirective(type) {
            return element_injector_1.DirectiveBinding.createFromType(type, directiveResolver.resolve(type));
        }
        test_lib_1.describe('getChangeDetectorDefinitions', function () {
            test_lib_1.it('should create a ChangeDetectorDefinition for the root render proto view', function () {
                var renderPv = createRenderProtoView();
                var defs = proto_view_factory_1.getChangeDetectorDefinitions(bindDirective(MainComponent).metadata, renderPv, []);
                test_lib_1.expect(defs.length).toBe(1);
                test_lib_1.expect(defs[0].id).toEqual(lang_1.stringify(MainComponent) + "_comp_0");
            });
        });
        test_lib_1.describe('createAppProtoViews', function () {
            test_lib_1.it('should create an AppProtoView for the root render proto view', function () {
                var renderPv = createRenderProtoView();
                var pvs = protoViewFactory.createAppProtoViews(bindDirective(MainComponent), renderPv, []);
                test_lib_1.expect(pvs.length).toBe(1);
                test_lib_1.expect(pvs[0].render).toBe(renderPv.render);
            });
        });
    });
}
exports.main = main;
function createRenderProtoView(elementBinders, type) {
    if (elementBinders === void 0) { elementBinders = null; }
    if (type === void 0) { type = null; }
    if (lang_1.isBlank(type)) {
        type = renderApi.ProtoViewDto.COMPONENT_VIEW_TYPE;
    }
    if (lang_1.isBlank(elementBinders)) {
        elementBinders = [];
    }
    return new renderApi.ProtoViewDto({ elementBinders: elementBinders, type: type, variableBindings: collection_1.MapWrapper.create() });
}
function createRenderComponentElementBinder(directiveIndex) {
    return new renderApi.ElementBinder({ directives: [new renderApi.DirectiveBinder({ directiveIndex: directiveIndex })] });
}
function createRenderViewportElementBinder(nestedProtoView) {
    return new renderApi.ElementBinder({ nestedProtoView: nestedProtoView });
}
var ChangeDetectionSpy = (function (_super) {
    __extends(ChangeDetectionSpy, _super);
    function ChangeDetectionSpy() {
        _super.call(this, change_detection_1.ChangeDetection);
    }
    ChangeDetectionSpy.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    ChangeDetectionSpy = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(change_detection_1.ChangeDetection), 
        __metadata('design:paramtypes', [])
    ], ChangeDetectionSpy);
    return ChangeDetectionSpy;
})(test_lib_1.SpyObject);
var MainComponent = (function () {
    function MainComponent() {
    }
    MainComponent = __decorate([
        annotations_1.Component({ selector: 'main-comp' }), 
        __metadata('design:paramtypes', [])
    ], MainComponent);
    return MainComponent;
})();
//# sourceMappingURL=proto_view_factory_spec.js.map