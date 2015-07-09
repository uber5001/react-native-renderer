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
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var content_tag_1 = require('angular2/src/render/dom/shadow_dom/content_tag');
var light_dom_1 = require('angular2/src/render/dom/shadow_dom/light_dom');
var view_1 = require('angular2/src/render/dom/view/view');
var view_container_1 = require('angular2/src/render/dom/view/view_container');
var FakeView = (function (_super) {
    __extends(FakeView, _super);
    function FakeView(containers) {
        var _this = this;
        if (containers === void 0) { containers = null; }
        _super.call(this, view_1.DomView);
        this.boundElements = [];
        this.contentTags = [];
        this.viewContainers = [];
        if (lang_1.isPresent(containers)) {
            collection_1.ListWrapper.forEach(containers, function (c) {
                var boundElement = null;
                var contentTag = null;
                var vc = null;
                if (c instanceof FakeContentTag) {
                    contentTag = c;
                    boundElement = c.contentStartElement;
                }
                if (c instanceof FakeViewContainer) {
                    vc = c;
                    boundElement = c.templateElement;
                }
                collection_1.ListWrapper.push(_this.contentTags, contentTag);
                collection_1.ListWrapper.push(_this.viewContainers, vc);
                collection_1.ListWrapper.push(_this.boundElements, boundElement);
            });
        }
    }
    FakeView.prototype.noSuchMethod = function (i) { _super.prototype.noSuchMethod.call(this, i); };
    FakeView = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(view_1.DomView), 
        __metadata('design:paramtypes', [Object])
    ], FakeView);
    return FakeView;
})(test_lib_1.SpyObject);
var FakeViewContainer = (function (_super) {
    __extends(FakeViewContainer, _super);
    function FakeViewContainer(templateEl, nodes, views) {
        if (nodes === void 0) { nodes = null; }
        if (views === void 0) { views = null; }
        _super.call(this, view_container_1.DomViewContainer);
        this.templateElement = templateEl;
        this._nodes = nodes;
        this._contentTagContainers = views;
    }
    FakeViewContainer.prototype.nodes = function () { return this._nodes; };
    FakeViewContainer.prototype.contentTagContainers = function () { return this._contentTagContainers; };
    FakeViewContainer.prototype.noSuchMethod = function (i) { _super.prototype.noSuchMethod.call(this, i); };
    FakeViewContainer = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(view_container_1.DomViewContainer), 
        __metadata('design:paramtypes', [Object, Object, Object])
    ], FakeViewContainer);
    return FakeViewContainer;
})(test_lib_1.SpyObject);
var FakeContentTag = (function (_super) {
    __extends(FakeContentTag, _super);
    function FakeContentTag(contentEl, select, nodes) {
        if (select === void 0) { select = ''; }
        if (nodes === void 0) { nodes = null; }
        _super.call(this, content_tag_1.Content);
        this.contentStartElement = contentEl;
        this.select = select;
        this._nodes = nodes;
    }
    FakeContentTag.prototype.insert = function (nodes) { this._nodes = nodes; };
    FakeContentTag.prototype.nodes = function () { return this._nodes; };
    FakeContentTag.prototype.noSuchMethod = function (i) { _super.prototype.noSuchMethod.call(this, i); };
    FakeContentTag = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(content_tag_1.Content), 
        __metadata('design:paramtypes', [Object, Object, Object])
    ], FakeContentTag);
    return FakeContentTag;
})(test_lib_1.SpyObject);
function createLightDom(hostView, shadowView, el) {
    var lightDom = new light_dom_1.LightDom(hostView, el);
    lightDom.attachShadowDomView(shadowView);
    return lightDom;
}
function main() {
    test_lib_1.describe('LightDom', function () {
        var lightDomView;
        test_lib_1.beforeEach(function () { lightDomView = new FakeView(); });
        test_lib_1.describe("contentTags", function () {
            test_lib_1.it("should collect content tags from element injectors", function () {
                var tag = new FakeContentTag(test_lib_1.el('<script></script>'));
                var shadowDomView = new FakeView([tag]);
                var lightDom = createLightDom(lightDomView, shadowDomView, test_lib_1.el("<div></div>"));
                test_lib_1.expect(lightDom.contentTags()).toEqual([tag]);
            });
            test_lib_1.it("should collect content tags from ViewContainers", function () {
                var tag = new FakeContentTag(test_lib_1.el('<script></script>'));
                var vc = new FakeViewContainer(null, null, [new FakeView([tag])]);
                var shadowDomView = new FakeView([vc]);
                var lightDom = createLightDom(lightDomView, shadowDomView, test_lib_1.el("<div></div>"));
                test_lib_1.expect(lightDom.contentTags()).toEqual([tag]);
            });
        });
        test_lib_1.describe("expandedDomNodes", function () {
            test_lib_1.it("should contain root nodes", function () {
                var lightDomEl = test_lib_1.el("<div><a></a></div>");
                var lightDom = createLightDom(lightDomView, new FakeView(), lightDomEl);
                test_lib_1.expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
            });
            test_lib_1.it("should include view container nodes", function () {
                var lightDomEl = test_lib_1.el("<div><template></template></div>");
                var lightDom = createLightDom(new FakeView([new FakeViewContainer(dom_adapter_1.DOM.firstChild(lightDomEl), [test_lib_1.el('<a></a>')] // light DOM nodes of view container
                    )]), null, lightDomEl);
                test_lib_1.expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
            });
            test_lib_1.it("should include content nodes", function () {
                var lightDomEl = test_lib_1.el("<div><content></content></div>");
                var lightDom = createLightDom(new FakeView([new FakeContentTag(dom_adapter_1.DOM.firstChild(lightDomEl), '', [test_lib_1.el('<a></a>')] // light DOM nodes of content tag
                    )]), null, lightDomEl);
                test_lib_1.expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
            });
            test_lib_1.it("should work when the element injector array contains nulls", function () {
                var lightDomEl = test_lib_1.el("<div><a></a></div>");
                var lightDomView = new FakeView();
                var lightDom = createLightDom(lightDomView, new FakeView(), lightDomEl);
                test_lib_1.expect(toHtml(lightDom.expandedDomNodes())).toEqual(["<a></a>"]);
            });
        });
        test_lib_1.describe("redistribute", function () {
            test_lib_1.it("should redistribute nodes between content tags with select property set", function () {
                var contentA = new FakeContentTag(null, "a");
                var contentB = new FakeContentTag(null, "b");
                var lightDomEl = test_lib_1.el("<div><a>1</a><b>2</b><a>3</a></div>");
                var lightDom = createLightDom(lightDomView, new FakeView([contentA, contentB]), lightDomEl);
                lightDom.redistribute();
                test_lib_1.expect(toHtml(contentA.nodes())).toEqual(["<a>1</a>", "<a>3</a>"]);
                test_lib_1.expect(toHtml(contentB.nodes())).toEqual(["<b>2</b>"]);
            });
            test_lib_1.it("should support wildcard content tags", function () {
                var wildcard = new FakeContentTag(null, '');
                var contentB = new FakeContentTag(null, "b");
                var lightDomEl = test_lib_1.el("<div><a>1</a><b>2</b><a>3</a></div>");
                var lightDom = createLightDom(lightDomView, new FakeView([wildcard, contentB]), lightDomEl);
                lightDom.redistribute();
                test_lib_1.expect(toHtml(wildcard.nodes())).toEqual(["<a>1</a>", "<b>2</b>", "<a>3</a>"]);
                test_lib_1.expect(toHtml(contentB.nodes())).toEqual([]);
            });
            test_lib_1.it("should remove all nodes if there are no content tags", function () {
                var lightDomEl = test_lib_1.el("<div><a>1</a><b>2</b><a>3</a></div>");
                var lightDom = createLightDom(lightDomView, new FakeView([]), lightDomEl);
                lightDom.redistribute();
                test_lib_1.expect(dom_adapter_1.DOM.childNodes(lightDomEl).length).toBe(0);
            });
            test_lib_1.it("should remove all not projected nodes", function () {
                var lightDomEl = test_lib_1.el("<div><a>1</a><b>2</b><a>3</a></div>");
                var bNode = dom_adapter_1.DOM.childNodes(lightDomEl)[1];
                var lightDom = createLightDom(lightDomView, new FakeView([new FakeContentTag(null, "a")]), lightDomEl);
                lightDom.redistribute();
                test_lib_1.expect(bNode.parentNode).toBe(null);
            });
        });
    });
}
exports.main = main;
function toHtml(nodes) {
    if (lang_1.isBlank(nodes))
        return [];
    return collection_1.ListWrapper.map(nodes, test_lib_1.stringifyElement);
}
//# sourceMappingURL=light_dom_spec.js.map