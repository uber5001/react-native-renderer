var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var test_lib_1 = require('angular2/test_lib');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var template_loader_1 = require('angular2/src/render/dom/compiler/template_loader');
var url_resolver_1 = require('angular2/src/services/url_resolver');
var api_1 = require('angular2/src/render/api');
var async_1 = require('angular2/src/facade/async');
var xhr_mock_1 = require('angular2/src/mock/xhr_mock');
function main() {
    test_lib_1.describe('TemplateLoader', function () {
        var loader, xhr;
        test_lib_1.beforeEach(function () {
            xhr = new xhr_mock_1.MockXHR();
            loader = new template_loader_1.TemplateLoader(xhr, new FakeUrlResolver());
        });
        test_lib_1.it('should load inline templates', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var template = new api_1.ViewDefinition({ template: 'template template' });
            loader.load(template).then(function (el) {
                test_lib_1.expect(dom_adapter_1.DOM.content(el)).toHaveText('template template');
                async.done();
            });
        }));
        test_lib_1.it('should load templates through XHR', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            xhr.expect('base/foo', 'xhr template');
            var template = new api_1.ViewDefinition({ absUrl: 'base/foo' });
            loader.load(template).then(function (el) {
                test_lib_1.expect(dom_adapter_1.DOM.content(el)).toHaveText('xhr template');
                async.done();
            });
            xhr.flush();
        }));
        test_lib_1.it('should cache template loaded through XHR but clone it as the compiler might change it', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var firstEl;
            // we have only one xhr.expect, so there can only be one xhr call!
            xhr.expect('base/foo', 'xhr template');
            var template = new api_1.ViewDefinition({ absUrl: 'base/foo' });
            loader.load(template)
                .then(function (el) {
                test_lib_1.expect(dom_adapter_1.DOM.content(el)).toHaveText('xhr template');
                firstEl = el;
                return loader.load(template);
            })
                .then(function (el) {
                test_lib_1.expect(el).not.toBe(firstEl);
                test_lib_1.expect(dom_adapter_1.DOM.content(el)).toHaveText('xhr template');
                async.done();
            });
            xhr.flush();
        }));
        test_lib_1.it('should throw when no template is defined', function () {
            var template = new api_1.ViewDefinition({ template: null, absUrl: null });
            test_lib_1.expect(function () { return loader.load(template); })
                .toThrowError('View should have either the url or template property set');
        });
        test_lib_1.it('should return a rejected Promise when xhr loading fails', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            xhr.expect('base/foo', null);
            var template = new api_1.ViewDefinition({ absUrl: 'base/foo' });
            async_1.PromiseWrapper.then(loader.load(template), function (_) { throw 'Unexpected response'; }, function (error) {
                test_lib_1.expect(error).toEqual('Failed to load base/foo');
                async.done();
            });
            xhr.flush();
        }));
    });
}
exports.main = main;
var SomeComponent = (function () {
    function SomeComponent() {
    }
    return SomeComponent;
})();
var FakeUrlResolver = (function (_super) {
    __extends(FakeUrlResolver, _super);
    function FakeUrlResolver() {
        _super.call(this);
    }
    FakeUrlResolver.prototype.resolve = function (baseUrl, url) { return baseUrl + url; };
    return FakeUrlResolver;
})(url_resolver_1.UrlResolver);
//# sourceMappingURL=template_loader_spec.js.map