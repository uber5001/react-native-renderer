var test_lib_1 = require('angular2/test_lib');
var native_shadow_dom_strategy_1 = require('angular2/src/render/dom/shadow_dom/native_shadow_dom_strategy');
var url_resolver_1 = require('angular2/src/services/url_resolver');
var style_url_resolver_1 = require('angular2/src/render/dom/shadow_dom/style_url_resolver');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
function main() {
    var strategy;
    test_lib_1.describe('NativeShadowDomStrategy', function () {
        test_lib_1.beforeEach(function () {
            var urlResolver = new url_resolver_1.UrlResolver();
            var styleUrlResolver = new style_url_resolver_1.StyleUrlResolver(urlResolver);
            strategy = new native_shadow_dom_strategy_1.NativeShadowDomStrategy(styleUrlResolver);
        });
        if (dom_adapter_1.DOM.supportsNativeShadowDOM()) {
            test_lib_1.it('should use the native shadow root', function () {
                var host = test_lib_1.el('<div><span>original content</span></div>');
                test_lib_1.expect(strategy.prepareShadowRoot(host)).toBe(dom_adapter_1.DOM.getShadowRoot(host));
            });
        }
        test_lib_1.it('should rewrite style urls', function () {
            var styleElement = test_lib_1.el('<style>.foo {background-image: url("img.jpg");}</style>');
            strategy.processStyleElement('someComponent', 'http://base', styleElement);
            test_lib_1.expect(styleElement)
                .toHaveText(".foo {" + "background-image: url('http://base/img.jpg');" + "}");
        });
        test_lib_1.it('should not inline import rules', function () {
            var styleElement = test_lib_1.el('<style>@import "other.css";</style>');
            strategy.processStyleElement('someComponent', 'http://base', styleElement);
            test_lib_1.expect(styleElement).toHaveText("@import 'http://base/other.css';");
        });
    });
}
exports.main = main;
//# sourceMappingURL=native_shadow_dom_strategy_spec.js.map