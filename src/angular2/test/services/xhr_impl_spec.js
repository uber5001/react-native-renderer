var test_lib_1 = require('angular2/test_lib');
var xhr_impl_1 = require('angular2/src/services/xhr_impl');
var async_1 = require('angular2/src/facade/async');
function main() {
    test_lib_1.describe('XHRImpl', function () {
        var xhr;
        var url200 = '/base/modules/angular2/test/services/static_assets/200.html';
        var url404 = '/base/modules/angular2/test/services/static_assets/404.html';
        test_lib_1.beforeEach(function () { xhr = new xhr_impl_1.XHRImpl(); });
        test_lib_1.it('should resolve the Promise with the file content on success', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            xhr.get(url200).then(function (text) {
                test_lib_1.expect(text.trim()).toEqual('<p>hey</p>');
                async.done();
            });
        }));
        test_lib_1.it('should reject the Promise on failure', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            async_1.PromiseWrapper.catchError(xhr.get(url404), function (e) {
                test_lib_1.expect(e).toEqual("Failed to load " + url404);
                async.done();
            });
        }));
    });
}
exports.main = main;
//# sourceMappingURL=xhr_impl_spec.js.map