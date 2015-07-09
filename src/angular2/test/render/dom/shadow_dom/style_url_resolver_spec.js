var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var test_lib_1 = require('angular2/test_lib');
var style_url_resolver_1 = require('angular2/src/render/dom/shadow_dom/style_url_resolver');
var url_resolver_1 = require('angular2/src/services/url_resolver');
function main() {
    test_lib_1.describe('StyleUrlResolver', function () {
        test_lib_1.it('should resolve "url()" urls', function () {
            var styleUrlResolver = new style_url_resolver_1.StyleUrlResolver(new FakeUrlResolver());
            var css = "\n      .foo {\n        background-image: url(\"double.jpg\");\n        background-image: url('simple.jpg');\n        background-image: url(noquote.jpg);\n      }";
            var expectedCss = "\n      .foo {\n        background-image: url('base/double.jpg');\n        background-image: url('base/simple.jpg');\n        background-image: url('base/noquote.jpg');\n      }";
            var resolvedCss = styleUrlResolver.resolveUrls(css, 'base');
            test_lib_1.expect(resolvedCss).toEqual(expectedCss);
        });
        test_lib_1.it('should resolve "@import" urls', function () {
            var styleUrlResolver = new style_url_resolver_1.StyleUrlResolver(new FakeUrlResolver());
            var css = "\n      @import '1.css';\n      @import \"2.css\";\n      ";
            var expectedCss = "\n      @import 'base/1.css';\n      @import 'base/2.css';\n      ";
            var resolvedCss = styleUrlResolver.resolveUrls(css, 'base');
            test_lib_1.expect(resolvedCss).toEqual(expectedCss);
        });
        test_lib_1.it('should resolve "@import url()" urls', function () {
            var styleUrlResolver = new style_url_resolver_1.StyleUrlResolver(new FakeUrlResolver());
            var css = "\n      @import url('3.css');\n      @import url(\"4.css\");\n      @import url(5.css);\n      ";
            var expectedCss = "\n      @import url('base/3.css');\n      @import url('base/4.css');\n      @import url('base/5.css');\n      ";
            var resolvedCss = styleUrlResolver.resolveUrls(css, 'base');
            test_lib_1.expect(resolvedCss).toEqual(expectedCss);
        });
        test_lib_1.it('should support media query in "@import"', function () {
            var styleUrlResolver = new style_url_resolver_1.StyleUrlResolver(new FakeUrlResolver());
            var css = "\n      @import 'print.css' print;\n      @import url(print.css) print;\n      ";
            var expectedCss = "\n      @import 'base/print.css' print;\n      @import url('base/print.css') print;\n      ";
            var resolvedCss = styleUrlResolver.resolveUrls(css, 'base');
            test_lib_1.expect(resolvedCss).toEqual(expectedCss);
        });
    });
}
exports.main = main;
var FakeUrlResolver = (function (_super) {
    __extends(FakeUrlResolver, _super);
    function FakeUrlResolver() {
        _super.apply(this, arguments);
    }
    FakeUrlResolver.prototype.resolve = function (baseUrl, url) { return baseUrl + '/' + url; };
    return FakeUrlResolver;
})(url_resolver_1.UrlResolver);
//# sourceMappingURL=style_url_resolver_spec.js.map