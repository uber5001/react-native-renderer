var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var directive_parser_1 = require('angular2/src/render/dom/compiler/directive_parser');
var compile_pipeline_1 = require('angular2/src/render/dom/compiler/compile_pipeline');
var api_1 = require('angular2/src/render/api');
var change_detection_1 = require('angular2/change_detection');
function main() {
    test_lib_1.describe('DirectiveParser', function () {
        var parser, annotatedDirectives;
        test_lib_1.beforeEach(function () {
            annotatedDirectives = [
                someComponent,
                someComponent2,
                someDirective,
                someDirectiveIgnoringChildren,
                decoratorWithMultipleAttrs,
                someDirectiveWithProps,
                someDirectiveWithHostProperties,
                someDirectiveWithHostAttributes,
                someDirectiveWithEvents,
                someDirectiveWithGlobalEvents,
                someDirectiveWithHostActions
            ];
            parser = new change_detection_1.Parser(new change_detection_1.Lexer());
        });
        function createPipeline(propertyBindings, directives) {
            if (propertyBindings === void 0) { propertyBindings = null; }
            if (directives === void 0) { directives = null; }
            if (lang_1.isBlank(directives))
                directives = annotatedDirectives;
            return new compile_pipeline_1.CompilePipeline([
                new MockStep(function (parent, current, control) {
                    if (lang_1.isPresent(propertyBindings)) {
                        collection_1.StringMapWrapper.forEach(propertyBindings, function (ast, name) {
                            current.bindElement().bindProperty(name, ast);
                        });
                    }
                }),
                new directive_parser_1.DirectiveParser(parser, directives)
            ]);
        }
        function process(el, propertyBindings, directives) {
            if (propertyBindings === void 0) { propertyBindings = null; }
            if (directives === void 0) { directives = null; }
            var pipeline = createPipeline(propertyBindings, directives);
            return collection_1.ListWrapper.map(pipeline.process(el), function (ce) { return ce.inheritedElementBinder; });
        }
        test_lib_1.it('should not add directives if they are not used', function () {
            var results = process(test_lib_1.el('<div></div>'));
            test_lib_1.expect(results[0]).toBe(null);
        });
        test_lib_1.it('should detect directives in attributes', function () {
            var results = process(test_lib_1.el('<div some-decor></div>'));
            test_lib_1.expect(results[0].directives[0].directiveIndex)
                .toBe(annotatedDirectives.indexOf(someDirective));
        });
        test_lib_1.it('should detect directives with multiple attributes', function () {
            var results = process(test_lib_1.el('<input type=text control=one></input>'));
            test_lib_1.expect(results[0].directives[0].directiveIndex)
                .toBe(annotatedDirectives.indexOf(decoratorWithMultipleAttrs));
        });
        test_lib_1.it('should compile children by default', function () {
            var results = createPipeline().process(test_lib_1.el('<div some-decor></div>'));
            test_lib_1.expect(results[0].compileChildren).toEqual(true);
        });
        test_lib_1.it('should stop compiling children when specified in the directive config', function () {
            var results = createPipeline().process(test_lib_1.el('<div some-decor-ignoring-children></div>'));
            test_lib_1.expect(results[0].compileChildren).toEqual(false);
        });
        test_lib_1.it('should bind directive properties from bound properties', function () {
            var results = process(test_lib_1.el('<div some-decor-props></div>'), { 'elProp': parser.parseBinding('someExpr', '') });
            var directiveBinding = results[0].directives[0];
            test_lib_1.expect(collection_1.MapWrapper.get(directiveBinding.propertyBindings, 'dirProp').source)
                .toEqual('someExpr');
        });
        test_lib_1.it('should bind directive properties with pipes', function () {
            var results = process(test_lib_1.el('<div some-decor-props></div>'), { 'elProp': parser.parseBinding('someExpr', '') });
            var directiveBinding = results[0].directives[0];
            var pipedProp = collection_1.MapWrapper.get(directiveBinding.propertyBindings, 'doubleProp');
            var simpleProp = collection_1.MapWrapper.get(directiveBinding.propertyBindings, 'dirProp');
            test_lib_1.expect(pipedProp.ast.name).toEqual('double');
            test_lib_1.expect(pipedProp.ast.exp).toEqual(simpleProp.ast);
            test_lib_1.expect(simpleProp.source).toEqual('someExpr');
        });
        test_lib_1.it('should bind directive properties from attribute values', function () {
            var results = process(test_lib_1.el('<div some-decor-props el-prop="someValue"></div>'));
            var directiveBinding = results[0].directives[0];
            var simpleProp = collection_1.MapWrapper.get(directiveBinding.propertyBindings, 'dirProp');
            test_lib_1.expect(simpleProp.source).toEqual('someValue');
        });
        test_lib_1.it('should bind host directive properties', function () {
            var element = test_lib_1.el('<input some-decor-with-host-props>');
            var results = process(element);
            var directiveBinding = results[0].directives[0];
            var ast = collection_1.MapWrapper.get(directiveBinding.hostPropertyBindings, 'hostProperty');
            test_lib_1.expect(ast.source).toEqual('dirProp');
        });
        test_lib_1.it('should set host element attributes', function () {
            var element = test_lib_1.el('<input some-decor-with-host-attrs>');
            var results = process(element);
            test_lib_1.expect(dom_adapter_1.DOM.getAttribute(results[0].element, 'attr_name')).toEqual('attr_val');
        });
        test_lib_1.it('should not set host element attribute if an attribute already exists', function () {
            var element = test_lib_1.el('<input attr_name="initial" some-decor-with-host-attrs>');
            var results = process(element);
            test_lib_1.expect(dom_adapter_1.DOM.getAttribute(results[0].element, 'attr_name')).toEqual('initial');
            dom_adapter_1.DOM.removeAttribute(element, 'attr_name');
            results = process(element);
            test_lib_1.expect(dom_adapter_1.DOM.getAttribute(results[0].element, 'attr_name')).toEqual('attr_val');
        });
        test_lib_1.it('should add CSS classes if "class" specified in host element attributes', function () {
            var element = test_lib_1.el('<input class="foo baz" some-decor-with-host-attrs>');
            var results = process(element);
            test_lib_1.expect(dom_adapter_1.DOM.hasClass(results[0].element, 'foo')).toBeTruthy();
            test_lib_1.expect(dom_adapter_1.DOM.hasClass(results[0].element, 'bar')).toBeTruthy();
            test_lib_1.expect(dom_adapter_1.DOM.hasClass(results[0].element, 'baz')).toBeTruthy();
        });
        test_lib_1.it('should read attribute values', function () {
            var element = test_lib_1.el('<input some-decor-props some-attr="someValue">');
            var results = process(element);
            test_lib_1.expect(collection_1.MapWrapper.get(results[0].readAttributes, 'some-attr')).toEqual('someValue');
        });
        test_lib_1.it('should bind directive events', function () {
            var results = process(test_lib_1.el('<div some-decor-events></div>'));
            var directiveBinding = results[0].directives[0];
            test_lib_1.expect(directiveBinding.eventBindings.length).toEqual(1);
            var eventBinding = directiveBinding.eventBindings[0];
            test_lib_1.expect(eventBinding.fullName).toEqual('click');
            test_lib_1.expect(eventBinding.source.source).toEqual('doIt()');
        });
        test_lib_1.it('should bind directive global events', function () {
            var results = process(test_lib_1.el('<div some-decor-globalevents></div>'));
            var directiveBinding = results[0].directives[0];
            test_lib_1.expect(directiveBinding.eventBindings.length).toEqual(1);
            var eventBinding = directiveBinding.eventBindings[0];
            test_lib_1.expect(eventBinding.fullName).toEqual('window:resize');
            test_lib_1.expect(eventBinding.source.source).toEqual('doItGlobal()');
        });
        test_lib_1.it('should bind directive host actions', function () {
            var results = process(test_lib_1.el('<div some-decor-host-actions></div>'));
            var directiveBinding = results[0].directives[0];
            test_lib_1.expect(directiveBinding.hostActions[0].actionName).toEqual('focus');
        });
        // TODO: assertions should be enabled when running tests:
        // https://github.com/angular/angular/issues/1340
        test_lib_1.describe('component directives', function () {
            test_lib_1.it('should save the component id', function () {
                var results = process(test_lib_1.el('<some-comp></some-comp>'));
                test_lib_1.expect(results[0].componentId).toEqual('someComponent');
            });
            test_lib_1.it('should throw when the provided selector is not an element selector', function () {
                test_lib_1.expect(function () { createPipeline(null, [componentWithNonElementSelector]); })
                    .toThrowError("Component 'componentWithNonElementSelector' can only have an element selector, but had '[attr]'");
            });
            test_lib_1.it('should not allow multiple component directives on the same element', function () {
                test_lib_1.expect(function () {
                    process(test_lib_1.el('<some-comp></some-comp>'), null, [someComponent, someComponentDup]);
                }).toThrowError(new RegExp('Only one component directive is allowed per element'));
            });
            test_lib_1.it('should sort the directives and store the component as the first directive', function () {
                var results = process(test_lib_1.el('<some-comp some-decor></some-comp>'));
                test_lib_1.expect(annotatedDirectives[results[0].directives[0].directiveIndex].id)
                    .toEqual('someComponent');
                test_lib_1.expect(annotatedDirectives[results[0].directives[1].directiveIndex].id)
                    .toEqual('someDirective');
            });
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
var someComponent = new api_1.DirectiveMetadata({ selector: 'some-comp', id: 'someComponent', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
var someComponentDup = new api_1.DirectiveMetadata({ selector: 'some-comp', id: 'someComponentDup', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
var someComponent2 = new api_1.DirectiveMetadata({ selector: 'some-comp2', id: 'someComponent2', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
var someDirective = new api_1.DirectiveMetadata({ selector: '[some-decor]', id: 'someDirective', type: api_1.DirectiveMetadata.DIRECTIVE_TYPE });
var someDirectiveIgnoringChildren = new api_1.DirectiveMetadata({
    selector: '[some-decor-ignoring-children]',
    compileChildren: false,
    type: api_1.DirectiveMetadata.DIRECTIVE_TYPE
});
var decoratorWithMultipleAttrs = new api_1.DirectiveMetadata({
    selector: 'input[type=text][control]',
    id: 'decoratorWithMultipleAttrs',
    type: api_1.DirectiveMetadata.DIRECTIVE_TYPE
});
var someDirectiveWithProps = new api_1.DirectiveMetadata({
    selector: '[some-decor-props]',
    properties: ['dirProp: elProp', 'doubleProp: elProp | double'],
    readAttributes: ['some-attr']
});
var someDirectiveWithHostProperties = new api_1.DirectiveMetadata({
    selector: '[some-decor-with-host-props]',
    hostProperties: collection_1.MapWrapper.createFromStringMap({ 'dirProp': 'hostProperty' })
});
var someDirectiveWithHostAttributes = new api_1.DirectiveMetadata({
    selector: '[some-decor-with-host-attrs]',
    hostAttributes: collection_1.MapWrapper.createFromStringMap({ 'attr_name': 'attr_val', 'class': 'foo bar' })
});
var someDirectiveWithEvents = new api_1.DirectiveMetadata({
    selector: '[some-decor-events]',
    hostListeners: collection_1.MapWrapper.createFromStringMap({ 'click': 'doIt()' })
});
var someDirectiveWithHostActions = new api_1.DirectiveMetadata({
    selector: '[some-decor-host-actions]',
    hostActions: collection_1.MapWrapper.createFromStringMap({ 'focus': 'focus()' })
});
var someDirectiveWithGlobalEvents = new api_1.DirectiveMetadata({
    selector: '[some-decor-globalevents]',
    hostListeners: collection_1.MapWrapper.createFromStringMap({ 'window:resize': 'doItGlobal()' })
});
var componentWithNonElementSelector = new api_1.DirectiveMetadata({
    id: 'componentWithNonElementSelector',
    selector: '[attr]',
    type: api_1.DirectiveMetadata.COMPONENT_TYPE
});
//# sourceMappingURL=directive_parser_spec.js.map