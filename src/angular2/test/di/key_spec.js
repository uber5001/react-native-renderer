var test_lib_1 = require('angular2/test_lib');
var di_1 = require('angular2/di');
function main() {
    test_lib_1.describe("key", function () {
        var registry;
        test_lib_1.beforeEach(function () { registry = new di_1.KeyRegistry(); });
        test_lib_1.it('should be equal to another key if type is the same', function () { test_lib_1.expect(registry.get('car')).toBe(registry.get('car')); });
        test_lib_1.it('should not be equal to another key if types are different', function () { test_lib_1.expect(registry.get('car')).not.toBe(registry.get('porsche')); });
        test_lib_1.it('should return the passed in key', function () { test_lib_1.expect(registry.get(registry.get('car'))).toBe(registry.get('car')); });
    });
}
exports.main = main;
//# sourceMappingURL=key_spec.js.map