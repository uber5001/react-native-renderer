var test_lib_1 = require('angular2/test_lib');
var component_url_mapper_1 = require('angular2/src/core/compiler/component_url_mapper');
function main() {
    test_lib_1.describe('RuntimeComponentUrlMapper', function () {
        test_lib_1.it('should return the registered URL', function () {
            var url = 'http://path/to/component';
            var mapper = new component_url_mapper_1.RuntimeComponentUrlMapper();
            mapper.setComponentUrl(SomeComponent, url);
            test_lib_1.expect(mapper.getUrl(SomeComponent)).toEqual(url);
        });
        test_lib_1.it('should fallback to ComponentUrlMapper', function () {
            var mapper = new component_url_mapper_1.ComponentUrlMapper();
            var runtimeMapper = new component_url_mapper_1.RuntimeComponentUrlMapper();
            test_lib_1.expect(runtimeMapper.getUrl(SomeComponent)).toEqual(mapper.getUrl(SomeComponent));
        });
    });
}
exports.main = main;
var SomeComponent = (function () {
    function SomeComponent() {
    }
    return SomeComponent;
})();
//# sourceMappingURL=component_url_mapper_spec.js.map