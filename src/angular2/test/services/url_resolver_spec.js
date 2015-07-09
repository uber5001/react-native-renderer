var test_lib_1 = require('angular2/test_lib');
var url_resolver_1 = require('angular2/src/services/url_resolver');
function main() {
    test_lib_1.describe('UrlResolver', function () {
        var resolver = new url_resolver_1.UrlResolver();
        test_lib_1.it('should add a relative path to the base url', function () {
            test_lib_1.expect(resolver.resolve('http://www.foo.com', 'bar')).toEqual('http://www.foo.com/bar');
            test_lib_1.expect(resolver.resolve('http://www.foo.com/', 'bar')).toEqual('http://www.foo.com/bar');
            test_lib_1.expect(resolver.resolve('http://www.foo.com', './bar')).toEqual('http://www.foo.com/bar');
            test_lib_1.expect(resolver.resolve('http://www.foo.com/', './bar')).toEqual('http://www.foo.com/bar');
        });
        test_lib_1.it('should replace the base path', function () {
            test_lib_1.expect(resolver.resolve('http://www.foo.com/baz', 'bar')).toEqual('http://www.foo.com/bar');
            test_lib_1.expect(resolver.resolve('http://www.foo.com/baz', './bar')).toEqual('http://www.foo.com/bar');
        });
        test_lib_1.it('should append to the base path', function () {
            test_lib_1.expect(resolver.resolve('http://www.foo.com/baz/', 'bar'))
                .toEqual('http://www.foo.com/baz/bar');
            test_lib_1.expect(resolver.resolve('http://www.foo.com/baz/', './bar'))
                .toEqual('http://www.foo.com/baz/bar');
        });
        test_lib_1.it('should support ".." in the path', function () {
            test_lib_1.expect(resolver.resolve('http://www.foo.com/baz/', '../bar'))
                .toEqual('http://www.foo.com/bar');
            test_lib_1.expect(resolver.resolve('http://www.foo.com/1/2/3/', '../../bar'))
                .toEqual('http://www.foo.com/1/bar');
            test_lib_1.expect(resolver.resolve('http://www.foo.com/1/2/3/', '../biz/bar'))
                .toEqual('http://www.foo.com/1/2/biz/bar');
            test_lib_1.expect(resolver.resolve('http://www.foo.com/1/2/baz', '../../bar'))
                .toEqual('http://www.foo.com/bar');
        });
        test_lib_1.it('should ignore the base path when the url has a scheme', function () {
            test_lib_1.expect(resolver.resolve('http://www.foo.com', 'http://www.bar.com'))
                .toEqual('http://www.bar.com');
        });
        test_lib_1.it('should throw when the url start with "/"', function () {
            test_lib_1.expect(function () { resolver.resolve('http://www.foo.com/1/2', '/test'); }).toThrowError();
        });
    });
}
exports.main = main;
//# sourceMappingURL=url_resolver_spec.js.map