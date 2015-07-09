var test_lib_1 = require('angular2/test_lib');
var property_binding_parser_1 = require('angular2/src/render/dom/compiler/property_binding_parser');
var compile_pipeline_1 = require('angular2/src/render/dom/compiler/compile_pipeline');
var collection_1 = require('angular2/src/facade/collection');
var change_detection_1 = require('angular2/change_detection');
var EMPTY_MAP = collection_1.MapWrapper.create();
function main() {
    test_lib_1.describe('PropertyBindingParser', function () {
        function createPipeline(hasNestedProtoView) {
            if (hasNestedProtoView === void 0) { hasNestedProtoView = false; }
            return new compile_pipeline_1.CompilePipeline([
                new MockStep(function (parent, current, control) {
                    if (hasNestedProtoView) {
                        current.bindElement().bindNestedProtoView(test_lib_1.el('<template></template>'));
                    }
                }),
                new property_binding_parser_1.PropertyBindingParser(new change_detection_1.Parser(new change_detection_1.Lexer()))
            ]);
        }
        function process(element, hasNestedProtoView) {
            if (hasNestedProtoView === void 0) { hasNestedProtoView = false; }
            return collection_1.ListWrapper.map(createPipeline(hasNestedProtoView).process(element), function (compileElement) { return compileElement.inheritedElementBinder; });
        }
        test_lib_1.it('should detect [] syntax', function () {
            var results = process(test_lib_1.el('<div [a]="b"></div>'));
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].propertyBindings, 'a').source).toEqual('b');
        });
        test_lib_1.it('should detect [] syntax only if an attribute name starts and ends with []', function () {
            test_lib_1.expect(process(test_lib_1.el('<div z[a]="b"></div>'))[0]).toBe(null);
            test_lib_1.expect(process(test_lib_1.el('<div [a]v="b"></div>'))[0]).toBe(null);
        });
        test_lib_1.it('should detect bind- syntax', function () {
            var results = process(test_lib_1.el('<div bind-a="b"></div>'));
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].propertyBindings, 'a').source).toEqual('b');
        });
        test_lib_1.it('should detect bind- syntax only if an attribute name starts with bind', function () { test_lib_1.expect(process(test_lib_1.el('<div _bind-a="b"></div>'))[0]).toEqual(null); });
        test_lib_1.it('should detect interpolation syntax', function () {
            var results = process(test_lib_1.el('<div a="{{b}}"></div>'));
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].propertyBindings, 'a').source).toEqual('{{b}}');
        });
        test_lib_1.it('should store property setters as camel case', function () {
            var element = test_lib_1.el('<div bind-some-prop="1">');
            var results = process(element);
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].propertyBindings, 'someProp')).toBeTruthy();
        });
        test_lib_1.it('should detect var- syntax', function () {
            var results = process(test_lib_1.el('<template var-a="b"></template>'));
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].variableBindings, 'b')).toEqual('a');
        });
        test_lib_1.it('should store variable binding for a template element on the nestedProtoView', function () {
            var results = process(test_lib_1.el('<template var-george="washington"></p>'), true);
            test_lib_1.expect(results[0].variableBindings).toEqual(EMPTY_MAP);
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].nestedProtoView.variableBindings, 'washington'))
                .toEqual('george');
        });
        test_lib_1.it('should store variable binding for a non-template element using shorthand syntax on the nestedProtoView', function () {
            var results = process(test_lib_1.el('<template #george="washington"></template>'), true);
            test_lib_1.expect(results[0].variableBindings).toEqual(EMPTY_MAP);
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].nestedProtoView.variableBindings, 'washington'))
                .toEqual('george');
        });
        test_lib_1.it('should store variable binding for a non-template element', function () {
            var results = process(test_lib_1.el('<p var-george="washington"></p>'));
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].variableBindings, 'washington')).toEqual('george');
        });
        test_lib_1.it('should store variable binding for a non-template element using shorthand syntax', function () {
            var results = process(test_lib_1.el('<p #george="washington"></p>'));
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].variableBindings, 'washington')).toEqual('george');
        });
        test_lib_1.it('should store a variable binding with an implicit value', function () {
            var results = process(test_lib_1.el('<p var-george></p>'));
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].variableBindings, '\$implicit')).toEqual('george');
        });
        test_lib_1.it('should store a variable binding with an implicit value using shorthand syntax', function () {
            var results = process(test_lib_1.el('<p #george></p>'));
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].variableBindings, '\$implicit')).toEqual('george');
        });
        test_lib_1.it('should detect variable bindings only if an attribute name starts with #', function () {
            var results = process(test_lib_1.el('<p b#george></p>'));
            test_lib_1.expect(results[0]).toEqual(null);
        });
        test_lib_1.it('should detect () syntax', function () {
            var results = process(test_lib_1.el('<div (click)="b()"></div>'));
            var eventBinding = results[0].eventBindings[0];
            test_lib_1.expect(eventBinding.source.source).toEqual('b()');
            test_lib_1.expect(eventBinding.fullName).toEqual('click');
            // "(click[])" is not an expected syntax and is only used to validate the regexp
            results = process(test_lib_1.el('<div (click[])="b()"></div>'));
            eventBinding = results[0].eventBindings[0];
            test_lib_1.expect(eventBinding.source.source).toEqual('b()');
            test_lib_1.expect(eventBinding.fullName).toEqual('click[]');
        });
        test_lib_1.it('should detect () syntax only if an attribute name starts and ends with ()', function () {
            test_lib_1.expect(process(test_lib_1.el('<div z(a)="b()"></div>'))[0]).toEqual(null);
            test_lib_1.expect(process(test_lib_1.el('<div (a)v="b()"></div>'))[0]).toEqual(null);
        });
        test_lib_1.it('should parse event handlers using () syntax as actions', function () {
            var results = process(test_lib_1.el('<div (click)="foo=bar"></div>'));
            var eventBinding = results[0].eventBindings[0];
            test_lib_1.expect(eventBinding.source.source).toEqual('foo=bar');
            test_lib_1.expect(eventBinding.fullName).toEqual('click');
        });
        test_lib_1.it('should detect on- syntax', function () {
            var results = process(test_lib_1.el('<div on-click="b()"></div>'));
            var eventBinding = results[0].eventBindings[0];
            test_lib_1.expect(eventBinding.source.source).toEqual('b()');
            test_lib_1.expect(eventBinding.fullName).toEqual('click');
        });
        test_lib_1.it('should parse event handlers using on- syntax as actions', function () {
            var results = process(test_lib_1.el('<div on-click="foo=bar"></div>'));
            var eventBinding = results[0].eventBindings[0];
            test_lib_1.expect(eventBinding.source.source).toEqual('foo=bar');
            test_lib_1.expect(eventBinding.fullName).toEqual('click');
        });
        test_lib_1.it('should store bound properties as temporal attributes', function () {
            var results = createPipeline().process(test_lib_1.el('<div bind-a="b" [c]="d"></div>'));
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].attrs(), 'a')).toEqual('b');
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].attrs(), 'c')).toEqual('d');
        });
        test_lib_1.it('should store variables as temporal attributes', function () {
            var results = createPipeline().process(test_lib_1.el('<div var-a="b" #c="d"></div>'));
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].attrs(), 'a')).toEqual('b');
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].attrs(), 'c')).toEqual('d');
        });
        test_lib_1.it('should detect [()] syntax', function () {
            var results = process(test_lib_1.el('<div [(a)]="b"></div>'));
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].propertyBindings, 'a').source).toEqual('b');
            test_lib_1.expect(results[0].eventBindings[0].source.source).toEqual('b=$event');
        });
        test_lib_1.it('should detect bindon- syntax', function () {
            var results = process(test_lib_1.el('<div bindon-a="b"></div>'));
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].propertyBindings, 'a').source).toEqual('b');
            test_lib_1.expect(results[0].eventBindings[0].source.source).toEqual('b=$event');
        });
    });
}
exports.main = main;
var MockStep = (function () {
    function MockStep(process) {
        this.processClosure = process;
    }
    MockStep.prototype.process = function (parent, current, control) {
        this.processClosure(parent, current, control);
    };
    return MockStep;
})();
//# sourceMappingURL=property_binding_parser_spec.js.map