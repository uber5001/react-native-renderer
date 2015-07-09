var test_lib_1 = require('angular2/test_lib');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
function main() {
    test_lib_1.describe('RegExp', function () {
        test_lib_1.it('should expose the index for each match', function () {
            var re = lang_1.RegExpWrapper.create('(!)');
            var matcher = lang_1.RegExpWrapper.matcher(re, '0!23!567!!');
            var indexes = [];
            var m;
            while (lang_1.isPresent(m = lang_1.RegExpMatcherWrapper.next(matcher))) {
                collection_1.ListWrapper.push(indexes, m.index);
                test_lib_1.expect(m[0]).toEqual('!');
                test_lib_1.expect(m[1]).toEqual('!');
                test_lib_1.expect(m.length).toBe(2);
            }
            test_lib_1.expect(indexes).toEqual([1, 4, 8, 9]);
        });
    });
    test_lib_1.describe('const', function () {
        test_lib_1.it('should support const expressions both in TS and Dart', function () {
            var numbers = lang_1.CONST_EXPR([1, 2, 3]);
            test_lib_1.expect(numbers).toEqual([1, 2, 3]);
        });
    });
    test_lib_1.describe('String', function () {
        var upper, lower;
        test_lib_1.beforeEach(function () {
            upper = 'SOMETHING';
            lower = 'something';
        });
        test_lib_1.it('should upper case a string', function () {
            var str = lang_1.StringWrapper.toUpperCase(lower);
            test_lib_1.expect(str).toEqual(upper);
        });
        test_lib_1.it('should lower case a string', function () {
            var str = lang_1.StringWrapper.toLowerCase(upper);
            test_lib_1.expect(str).toEqual(lower);
        });
    });
}
exports.main = main;
//# sourceMappingURL=lang_spec.js.map