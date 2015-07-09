var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/facade/lang');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var collection_1 = require('angular2/src/facade/collection');
var async_1 = require('angular2/src/facade/async');
var xhr_1 = require('angular2/src/services/xhr');
var emulated_scoped_shadow_dom_strategy_1 = require('angular2/src/render/dom/shadow_dom/emulated_scoped_shadow_dom_strategy');
var util_1 = require('angular2/src/render/dom/shadow_dom/util');
var url_resolver_1 = require('angular2/src/services/url_resolver');
var style_url_resolver_1 = require('angular2/src/render/dom/shadow_dom/style_url_resolver');
var style_inliner_1 = require('angular2/src/render/dom/shadow_dom/style_inliner');
function main() {
    test_lib_1.describe('EmulatedScopedShadowDomStrategy', function () {
        var xhr, styleHost, strategy;
        test_lib_1.beforeEach(function () {
            var urlResolver = new url_resolver_1.UrlResolver();
            var styleUrlResolver = new style_url_resolver_1.StyleUrlResolver(urlResolver);
            xhr = new FakeXHR();
            var styleInliner = new style_inliner_1.StyleInliner(xhr, styleUrlResolver, urlResolver);
            styleHost = test_lib_1.el('<div></div>');
            strategy = new emulated_scoped_shadow_dom_strategy_1.EmulatedScopedShadowDomStrategy(styleInliner, styleUrlResolver, styleHost);
            util_1.resetShadowDomCache();
        });
        test_lib_1.it('should use the host element as shadow root', function () {
            var host = test_lib_1.el('<div><span>original content</span></div>');
            test_lib_1.expect(strategy.prepareShadowRoot(host)).toBe(host);
        });
        test_lib_1.it('should rewrite style urls', function () {
            var styleElement = test_lib_1.el('<style>.foo {background-image: url("img.jpg");}</style>');
            strategy.processStyleElement('someComponent', 'http://base', styleElement);
            test_lib_1.expect(test_lib_1.normalizeCSS(dom_adapter_1.DOM.getText(styleElement)))
                .toEqual(".foo[_ngcontent-0] { background-image:url(http://base/img.jpg); }");
        });
        test_lib_1.it('should scope styles', function () {
            var styleElement = test_lib_1.el('<style>.foo {} :host {}</style>');
            strategy.processStyleElement('someComponent', 'http://base', styleElement);
            test_lib_1.expect(styleElement).toHaveText(".foo[_ngcontent-0] {\n\n}\n\n[_nghost-0] {\n\n}");
        });
        test_lib_1.it('should inline @import rules', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            xhr.reply('http://base/one.css', '.one {}');
            var styleElement = test_lib_1.el('<style>@import "one.css";</style>');
            var stylePromise = strategy.processStyleElement('someComponent', 'http://base', styleElement);
            test_lib_1.expect(stylePromise).toBePromise();
            test_lib_1.expect(styleElement).toHaveText('');
            stylePromise.then(function (_) {
                test_lib_1.expect(styleElement).toHaveText('.one[_ngcontent-0] {\n\n}');
                async.done();
            });
        }));
        test_lib_1.it('should return the same style given the same component', function () {
            var styleElement = test_lib_1.el('<style>.foo {} :host {}</style>');
            strategy.processStyleElement('someComponent', 'http://base', styleElement);
            var styleElement2 = test_lib_1.el('<style>.foo {} :host {}</style>');
            strategy.processStyleElement('someComponent', 'http://base', styleElement2);
            test_lib_1.expect(dom_adapter_1.DOM.getText(styleElement)).toEqual(dom_adapter_1.DOM.getText(styleElement2));
        });
        test_lib_1.it('should return different styles given different components', function () {
            var styleElement = test_lib_1.el('<style>.foo {} :host {}</style>');
            strategy.processStyleElement('someComponent1', 'http://base', styleElement);
            var styleElement2 = test_lib_1.el('<style>.foo {} :host {}</style>');
            strategy.processStyleElement('someComponent2', 'http://base', styleElement2);
            test_lib_1.expect(dom_adapter_1.DOM.getText(styleElement)).not.toEqual(dom_adapter_1.DOM.getText(styleElement2));
        });
        test_lib_1.it('should move the style element to the style host', function () {
            var compileElement = test_lib_1.el('<div><style>.one {}</style></div>');
            var styleElement = dom_adapter_1.DOM.firstChild(compileElement);
            strategy.processStyleElement('someComponent', 'http://base', styleElement);
            test_lib_1.expect(compileElement).toHaveText('');
            test_lib_1.expect(styleHost).toHaveText('.one[_ngcontent-0] {\n\n}');
        });
        test_lib_1.it('should add an attribute to component elements', function () {
            var element = test_lib_1.el('<div></div>');
            strategy.processElement(null, 'elComponent', element);
            test_lib_1.expect(dom_adapter_1.DOM.getAttribute(element, '_nghost-0')).toEqual('');
        });
        test_lib_1.it('should add an attribute to the content elements', function () {
            var element = test_lib_1.el('<div></div>');
            strategy.processElement('hostComponent', null, element);
            test_lib_1.expect(dom_adapter_1.DOM.getAttribute(element, '_ngcontent-0')).toEqual('');
        });
    });
}
exports.main = main;
var FakeXHR = (function (_super) {
    __extends(FakeXHR, _super);
    function FakeXHR() {
        _super.call(this);
        this._responses = collection_1.MapWrapper.create();
    }
    FakeXHR.prototype.get = function (url) {
        var response = collection_1.MapWrapper.get(this._responses, url);
        if (lang_1.isBlank(response)) {
            return async_1.PromiseWrapper.reject('xhr error', null);
        }
        return async_1.PromiseWrapper.resolve(response);
    };
    FakeXHR.prototype.reply = function (url, response) { collection_1.MapWrapper.set(this._responses, url, response); };
    return FakeXHR;
})(xhr_1.XHR);
//# sourceMappingURL=emulated_scoped_shadow_dom_strategy_spec.js.map