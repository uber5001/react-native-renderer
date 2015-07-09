var test_lib_1 = require('angular2/test_lib');
var text_interpolation_parser_1 = require('angular2/src/render/dom/compiler/text_interpolation_parser');
var compile_pipeline_1 = require('angular2/src/render/dom/compiler/compile_pipeline');
var collection_1 = require('angular2/src/facade/collection');
var change_detection_1 = require('angular2/change_detection');
var pipeline_spec_1 = require('./pipeline_spec');
function main() {
    test_lib_1.describe('TextInterpolationParser', function () {
        function createPipeline() {
            return new compile_pipeline_1.CompilePipeline([new pipeline_spec_1.IgnoreChildrenStep(), new text_interpolation_parser_1.TextInterpolationParser(new change_detection_1.Parser(new change_detection_1.Lexer()))]);
        }
        function process(element) {
            return collection_1.ListWrapper.map(createPipeline().process(element), function (compileElement) { return compileElement.inheritedElementBinder; });
        }
        function assertTextBinding(elementBinder, bindingIndex, nodeIndex, expression) {
            test_lib_1.expect(elementBinder.textBindings[bindingIndex].source).toEqual(expression);
            test_lib_1.expect(elementBinder.textBindingIndices[bindingIndex]).toEqual(nodeIndex);
        }
        test_lib_1.it('should find text interpolation in normal elements', function () {
            var result = process(test_lib_1.el('<div>{{expr1}}<span></span>{{expr2}}</div>'))[0];
            assertTextBinding(result, 0, 0, "{{expr1}}");
            assertTextBinding(result, 1, 2, "{{expr2}}");
        });
        test_lib_1.it('should find text interpolation in template elements', function () {
            var result = process(test_lib_1.el('<template>{{expr1}}<span></span>{{expr2}}</template>'))[0];
            assertTextBinding(result, 0, 0, "{{expr1}}");
            assertTextBinding(result, 1, 2, "{{expr2}}");
        });
        test_lib_1.it('should allow multiple expressions', function () {
            var result = process(test_lib_1.el('<div>{{expr1}}{{expr2}}</div>'))[0];
            assertTextBinding(result, 0, 0, "{{expr1}}{{expr2}}");
        });
        test_lib_1.it('should not interpolate when compileChildren is false', function () {
            var results = process(test_lib_1.el('<div>{{included}}<span ignore-children>{{excluded}}</span></div>'));
            assertTextBinding(results[0], 0, 0, "{{included}}");
            test_lib_1.expect(results[1]).toBe(results[0]);
        });
        test_lib_1.it('should allow fixed text before, in between and after expressions', function () {
            var result = process(test_lib_1.el('<div>a{{expr1}}b{{expr2}}c</div>'))[0];
            assertTextBinding(result, 0, 0, "a{{expr1}}b{{expr2}}c");
        });
        test_lib_1.it('should escape quotes in fixed parts', function () {
            var result = process(test_lib_1.el("<div>'\"a{{expr1}}</div>"))[0];
            assertTextBinding(result, 0, 0, "'\"a{{expr1}}");
        });
    });
}
exports.main = main;
//# sourceMappingURL=text_interpolation_parser_spec.js.map