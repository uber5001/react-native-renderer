var test_lib_1 = require('angular2/test_lib');
var collection_1 = require('angular2/src/facade/collection');
var query_list_1 = require('angular2/src/core/compiler/query_list');
function main() {
    test_lib_1.describe('QueryList', function () {
        var queryList, log;
        test_lib_1.beforeEach(function () {
            queryList = new query_list_1.QueryList();
            log = '';
        });
        function logAppend(item) { log += (log.length == 0 ? '' : ', ') + item; }
        test_lib_1.it('should support adding objects and iterating over them', function () {
            queryList.add('one');
            queryList.add('two');
            collection_1.iterateListLike(queryList, logAppend);
            test_lib_1.expect(log).toEqual('one, two');
        });
        test_lib_1.it('should support resetting and iterating over the new objects', function () {
            queryList.add('one');
            queryList.add('two');
            queryList.reset(['one again']);
            queryList.add('two again');
            collection_1.iterateListLike(queryList, logAppend);
            test_lib_1.expect(log).toEqual('one again, two again');
        });
        test_lib_1.describe('simple observable interface', function () {
            test_lib_1.it('should fire callbacks on change', function () {
                var fires = 0;
                queryList.onChange(function () { fires += 1; });
                queryList.fireCallbacks();
                test_lib_1.expect(fires).toEqual(0);
                queryList.add('one');
                queryList.fireCallbacks();
                test_lib_1.expect(fires).toEqual(1);
                queryList.fireCallbacks();
                test_lib_1.expect(fires).toEqual(1);
            });
            test_lib_1.it('should support removing callbacks', function () {
                var fires = 0;
                var callback = function () { return fires += 1; };
                queryList.onChange(callback);
                queryList.add('one');
                queryList.fireCallbacks();
                test_lib_1.expect(fires).toEqual(1);
                queryList.removeCallback(callback);
                queryList.add('two');
                queryList.fireCallbacks();
                test_lib_1.expect(fires).toEqual(1);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=query_list_spec.js.map