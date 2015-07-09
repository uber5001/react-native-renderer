var test_lib_1 = require('angular2/test_lib');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var title_1 = require('angular2/src/services/title');
function main() {
    test_lib_1.describe('title service', function () {
        var initialTitle = dom_adapter_1.DOM.getTitle();
        var titleService = new title_1.Title();
        test_lib_1.afterEach(function () { dom_adapter_1.DOM.setTitle(initialTitle); });
        test_lib_1.it('should allow reading initial title', function () { test_lib_1.expect(titleService.getTitle()).toEqual(initialTitle); });
        test_lib_1.it('should set a title on the injected document', function () {
            titleService.setTitle('test title');
            test_lib_1.expect(dom_adapter_1.DOM.getTitle()).toEqual('test title');
            test_lib_1.expect(titleService.getTitle()).toEqual('test title');
        });
        test_lib_1.it('should reset title to empty string if title not provided', function () {
            titleService.setTitle(null);
            test_lib_1.expect(dom_adapter_1.DOM.getTitle()).toEqual('');
        });
    });
}
exports.main = main;
//# sourceMappingURL=title_spec.js.map