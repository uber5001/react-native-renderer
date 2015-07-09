var test_lib_1 = require('angular2/test_lib');
var di_1 = require('angular2/di');
var collection_1 = require('angular2/src/facade/collection');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var api_1 = require('angular2/src/render/api');
var shadow_dom_strategy_1 = require('angular2/src/render/dom/shadow_dom/shadow_dom_strategy');
var emulated_scoped_shadow_dom_strategy_1 = require('angular2/src/render/dom/shadow_dom/emulated_scoped_shadow_dom_strategy');
var emulated_unscoped_shadow_dom_strategy_1 = require('angular2/src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy');
var native_shadow_dom_strategy_1 = require('angular2/src/render/dom/shadow_dom/native_shadow_dom_strategy');
var style_url_resolver_1 = require('angular2/src/render/dom/shadow_dom/style_url_resolver');
var style_inliner_1 = require('angular2/src/render/dom/shadow_dom/style_inliner');
var dom_testbed_1 = require('./dom_testbed');
function main() {
    test_lib_1.describe('ShadowDom integration tests', function () {
        var strategies = {
            "scoped": di_1.bind(shadow_dom_strategy_1.ShadowDomStrategy)
                .toFactory(function (styleInliner, styleUrlResolver) { return new emulated_scoped_shadow_dom_strategy_1.EmulatedScopedShadowDomStrategy(styleInliner, styleUrlResolver, null); }, [style_inliner_1.StyleInliner, style_url_resolver_1.StyleUrlResolver]),
            "unscoped": di_1.bind(shadow_dom_strategy_1.ShadowDomStrategy)
                .toFactory(function (styleUrlResolver) {
                return new emulated_unscoped_shadow_dom_strategy_1.EmulatedUnscopedShadowDomStrategy(styleUrlResolver, null);
            }, [style_url_resolver_1.StyleUrlResolver])
        };
        if (dom_adapter_1.DOM.supportsNativeShadowDOM()) {
            collection_1.StringMapWrapper.set(strategies, "native", di_1.bind(shadow_dom_strategy_1.ShadowDomStrategy)
                .toFactory(function (styleUrlResolver) { return new native_shadow_dom_strategy_1.NativeShadowDomStrategy(styleUrlResolver); }, [style_url_resolver_1.StyleUrlResolver]));
        }
        collection_1.StringMapWrapper.forEach(strategies, function (strategyBinding, name) {
            test_lib_1.beforeEachBindings(function () { return [strategyBinding, dom_testbed_1.DomTestbed]; });
            test_lib_1.describe(name + " shadow dom strategy", function () {
                test_lib_1.it('should support simple components', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                    tb.compileAll([
                        mainDir,
                        new api_1.ViewDefinition({
                            componentId: 'main',
                            template: '<simple>' +
                                '<div>A</div>' +
                                '</simple>',
                            directives: [simple]
                        }),
                        simpleTemplate
                    ])
                        .then(function (protoViews) {
                        tb.createRootViews(protoViews);
                        test_lib_1.expect(tb.rootEl).toHaveText('SIMPLE(A)');
                        async.done();
                    });
                }));
                test_lib_1.it('should not show the light dom even if there is not content tag', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                    tb.compileAll([
                        mainDir,
                        new api_1.ViewDefinition({
                            componentId: 'main',
                            template: '<empty>' +
                                '<div>A</div>' +
                                '</empty>',
                            directives: [empty]
                        }),
                        emptyTemplate
                    ])
                        .then(function (protoViews) {
                        tb.createRootViews(protoViews);
                        test_lib_1.expect(tb.rootEl).toHaveText('');
                        async.done();
                    });
                }));
                test_lib_1.it('should support dynamic components', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                    tb.compileAll([
                        mainDir,
                        new api_1.ViewDefinition({
                            componentId: 'main',
                            template: '<dynamic>' +
                                '<div>A</div>' +
                                '</dynamic>',
                            directives: [dynamicComponent]
                        }),
                        simpleTemplate
                    ])
                        .then(function (protoViews) {
                        var views = tb.createRootViews(collection_1.ListWrapper.slice(protoViews, 0, 2));
                        tb.createComponentView(views[1].viewRef, 0, protoViews[2]);
                        test_lib_1.expect(tb.rootEl).toHaveText('SIMPLE(A)');
                        async.done();
                    });
                }));
                test_lib_1.it('should support multiple content tags', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                    tb.compileAll([
                        mainDir,
                        new api_1.ViewDefinition({
                            componentId: 'main',
                            template: '<multiple-content-tags>' +
                                '<div>B</div>' +
                                '<div>C</div>' +
                                '<div class="left">A</div>' +
                                '</multiple-content-tags>',
                            directives: [multipleContentTagsComponent]
                        }),
                        multipleContentTagsTemplate
                    ])
                        .then(function (protoViews) {
                        tb.createRootViews(protoViews);
                        test_lib_1.expect(tb.rootEl).toHaveText('(A, BC)');
                        async.done();
                    });
                }));
                test_lib_1.it('should redistribute only direct children', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                    tb.compileAll([
                        mainDir,
                        new api_1.ViewDefinition({
                            componentId: 'main',
                            template: '<multiple-content-tags>' +
                                '<div>B<div class="left">A</div></div>' +
                                '<div>C</div>' +
                                '</multiple-content-tags>',
                            directives: [multipleContentTagsComponent]
                        }),
                        multipleContentTagsTemplate
                    ])
                        .then(function (protoViews) {
                        tb.createRootViews(protoViews);
                        test_lib_1.expect(tb.rootEl).toHaveText('(, BAC)');
                        async.done();
                    });
                }));
                test_lib_1.it("should redistribute direct child viewcontainers when the light dom changes", test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                    tb.compileAll([
                        mainDir,
                        new api_1.ViewDefinition({
                            componentId: 'main',
                            template: '<multiple-content-tags>' +
                                '<div><div template="manual" class="left">A</div></div>' +
                                '<div>B</div>' +
                                '</multiple-content-tags>',
                            directives: [multipleContentTagsComponent, manualViewportDirective]
                        }),
                        multipleContentTagsTemplate
                    ])
                        .then(function (protoViews) {
                        var views = tb.createRootViews(protoViews);
                        var childProtoView = protoViews[1].elementBinders[1].nestedProtoView;
                        test_lib_1.expect(tb.rootEl).toHaveText('(, B)');
                        var childView = tb.createViewInContainer(views[1].viewRef, 1, 0, childProtoView);
                        test_lib_1.expect(tb.rootEl).toHaveText('(, AB)');
                        tb.destroyViewInContainer(views[1].viewRef, 1, 0, childView.viewRef);
                        test_lib_1.expect(tb.rootEl).toHaveText('(, B)');
                        async.done();
                    });
                }));
                test_lib_1.it("should redistribute when the light dom changes", test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                    tb.compileAll([
                        mainDir,
                        new api_1.ViewDefinition({
                            componentId: 'main',
                            template: '<multiple-content-tags>' +
                                '<div template="manual" class="left">A</div>' +
                                '<div>B</div>' +
                                '</multiple-content-tags>',
                            directives: [multipleContentTagsComponent, manualViewportDirective]
                        }),
                        multipleContentTagsTemplate
                    ])
                        .then(function (protoViews) {
                        var views = tb.createRootViews(protoViews);
                        var childProtoView = protoViews[1].elementBinders[1].nestedProtoView;
                        test_lib_1.expect(tb.rootEl).toHaveText('(, B)');
                        var childView = tb.createViewInContainer(views[1].viewRef, 1, 0, childProtoView);
                        test_lib_1.expect(tb.rootEl).toHaveText('(A, B)');
                        tb.destroyViewInContainer(views[1].viewRef, 1, 0, childView.viewRef);
                        test_lib_1.expect(tb.rootEl).toHaveText('(, B)');
                        async.done();
                    });
                }));
                test_lib_1.it("should support nested components", test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                    tb.compileAll([
                        mainDir,
                        new api_1.ViewDefinition({
                            componentId: 'main',
                            template: '<outer-with-indirect-nested>' +
                                '<div>A</div>' +
                                '<div>B</div>' +
                                '</outer-with-indirect-nested>',
                            directives: [outerWithIndirectNestedComponent]
                        }),
                        outerWithIndirectNestedTemplate,
                        simpleTemplate
                    ])
                        .then(function (protoViews) {
                        tb.createRootViews(protoViews);
                        test_lib_1.expect(tb.rootEl).toHaveText('OUTER(SIMPLE(AB))');
                        async.done();
                    });
                }));
                test_lib_1.it("should support nesting with content being direct child of a nested component", test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                    tb.compileAll([
                        mainDir,
                        new api_1.ViewDefinition({
                            componentId: 'main',
                            template: '<outer>' +
                                '<div template="manual" class="left">A</div>' +
                                '<div>B</div>' +
                                '<div>C</div>' +
                                '</outer>',
                            directives: [outerComponent, manualViewportDirective]
                        }),
                        outerTemplate,
                        innerTemplate,
                        innerInnerTemplate
                    ])
                        .then(function (protoViews) {
                        var views = tb.createRootViews(protoViews);
                        var childProtoView = protoViews[1].elementBinders[1].nestedProtoView;
                        test_lib_1.expect(tb.rootEl).toHaveText('OUTER(INNER(INNERINNER(,BC)))');
                        tb.createViewInContainer(views[1].viewRef, 1, 0, childProtoView);
                        test_lib_1.expect(tb.rootEl).toHaveText('OUTER(INNER(INNERINNER(A,BC)))');
                        async.done();
                    });
                }));
                test_lib_1.it('should redistribute when the shadow dom changes', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                    tb.compileAll([
                        mainDir,
                        new api_1.ViewDefinition({
                            componentId: 'main',
                            template: '<conditional-content>' +
                                '<div class="left">A</div>' +
                                '<div>B</div>' +
                                '<div>C</div>' +
                                '</conditional-content>',
                            directives: [conditionalContentComponent]
                        }),
                        conditionalContentTemplate
                    ])
                        .then(function (protoViews) {
                        var views = tb.createRootViews(protoViews);
                        var childProtoView = protoViews[2].elementBinders[0].nestedProtoView;
                        test_lib_1.expect(tb.rootEl).toHaveText('(, ABC)');
                        var childView = tb.createViewInContainer(views[2].viewRef, 0, 0, childProtoView);
                        test_lib_1.expect(tb.rootEl).toHaveText('(A, BC)');
                        tb.destroyViewInContainer(views[2].viewRef, 0, 0, childView.viewRef);
                        test_lib_1.expect(tb.rootEl).toHaveText('(, ABC)');
                        async.done();
                    });
                }));
                test_lib_1.it("should support tabs with view caching", test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
                    tb.compileAll([
                        mainDir,
                        new api_1.ViewDefinition({
                            componentId: 'main',
                            template: '(<tab><span>0</span></tab>' +
                                '<tab><span>1</span></tab>' +
                                '<tab><span>2</span></tab>)',
                            directives: [tabComponent]
                        }),
                        tabTemplate
                    ])
                        .then(function (protoViews) {
                        var views = tb.createRootViews(collection_1.ListWrapper.slice(protoViews, 0, 2));
                        var tabProtoView = protoViews[2];
                        var tabChildProtoView = tabProtoView.elementBinders[0].nestedProtoView;
                        var tab1View = tb.createComponentView(views[1].viewRef, 0, tabProtoView);
                        var tab2View = tb.createComponentView(views[1].viewRef, 1, tabProtoView);
                        var tab3View = tb.createComponentView(views[1].viewRef, 2, tabProtoView);
                        test_lib_1.expect(tb.rootEl).toHaveText('()');
                        var tabChildView = tb.createViewInContainer(tab1View.viewRef, 0, 0, tabChildProtoView);
                        test_lib_1.expect(tb.rootEl).toHaveText('(TAB(0))');
                        tb.renderer.dehydrateView(tabChildView.viewRef);
                        tb.renderer.detachViewInContainer(tab1View.viewRef, 0, 0, tabChildView.viewRef);
                        tb.renderer.attachViewInContainer(tab2View.viewRef, 0, 0, tabChildView.viewRef);
                        tb.renderer.hydrateView(tabChildView.viewRef);
                        test_lib_1.expect(tb.rootEl).toHaveText('(TAB(1))');
                        tb.renderer.dehydrateView(tabChildView.viewRef);
                        tb.renderer.detachViewInContainer(tab2View.viewRef, 0, 0, tabChildView.viewRef);
                        tb.renderer.attachViewInContainer(tab3View.viewRef, 0, 0, tabChildView.viewRef);
                        tb.renderer.hydrateView(tabChildView.viewRef);
                        test_lib_1.expect(tb.rootEl).toHaveText('(TAB(2))');
                        async.done();
                    });
                }));
                // Implement once ElementRef support changing a class
                // it("should redistribute when a class has been added or removed");
                // it('should not lose focus', () => {
                //  var temp = `<simple>aaa<input type="text" id="focused-input" ng-class="{'aClass' :
                //  showClass}"> bbb</simple>`;
                //
                //  compile(temp, (view, lc) => {
                //    var input = view.rootNodes[1];
                //    input.focus();
                //
                //    expect(document.activeElement.id).toEqual("focused-input");
                //
                //    // update class of input
                //
                //    expect(document.activeElement.id).toEqual("focused-input");
                //  });
                //});
            });
        });
    });
}
exports.main = main;
var mainDir = new api_1.DirectiveMetadata({ selector: 'main', id: 'main', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
var simple = new api_1.DirectiveMetadata({ selector: 'simple', id: 'simple', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
var empty = new api_1.DirectiveMetadata({ selector: 'empty', id: 'empty', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
var dynamicComponent = new api_1.DirectiveMetadata({ selector: 'dynamic', id: 'dynamic', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
var multipleContentTagsComponent = new api_1.DirectiveMetadata({
    selector: 'multiple-content-tags',
    id: 'multiple-content-tags',
    type: api_1.DirectiveMetadata.COMPONENT_TYPE
});
var manualViewportDirective = new api_1.DirectiveMetadata({ selector: '[manual]', id: 'manual', type: api_1.DirectiveMetadata.DIRECTIVE_TYPE });
var outerWithIndirectNestedComponent = new api_1.DirectiveMetadata({
    selector: 'outer-with-indirect-nested',
    id: 'outer-with-indirect-nested',
    type: api_1.DirectiveMetadata.COMPONENT_TYPE
});
var outerComponent = new api_1.DirectiveMetadata({ selector: 'outer', id: 'outer', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
var innerComponent = new api_1.DirectiveMetadata({ selector: 'inner', id: 'inner', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
var innerInnerComponent = new api_1.DirectiveMetadata({ selector: 'innerinner', id: 'innerinner', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
var conditionalContentComponent = new api_1.DirectiveMetadata({
    selector: 'conditional-content',
    id: 'conditional-content',
    type: api_1.DirectiveMetadata.COMPONENT_TYPE
});
var autoViewportDirective = new api_1.DirectiveMetadata({ selector: '[auto]', id: '[auto]', type: api_1.DirectiveMetadata.DIRECTIVE_TYPE });
var tabComponent = new api_1.DirectiveMetadata({ selector: 'tab', id: 'tab', type: api_1.DirectiveMetadata.COMPONENT_TYPE });
var simpleTemplate = new api_1.ViewDefinition({ componentId: 'simple', template: 'SIMPLE(<content></content>)', directives: [] });
var emptyTemplate = new api_1.ViewDefinition({ componentId: 'empty', template: '', directives: [] });
var multipleContentTagsTemplate = new api_1.ViewDefinition({
    componentId: 'multiple-content-tags',
    template: '(<content select=".left"></content>, <content></content>)',
    directives: []
});
var outerWithIndirectNestedTemplate = new api_1.ViewDefinition({
    componentId: 'outer-with-indirect-nested',
    template: 'OUTER(<simple><div><content></content></div></simple>)',
    directives: [simple]
});
var outerTemplate = new api_1.ViewDefinition({
    componentId: 'outer',
    template: 'OUTER(<inner><content></content></inner>)',
    directives: [innerComponent]
});
var innerTemplate = new api_1.ViewDefinition({
    componentId: 'inner',
    template: 'INNER(<innerinner><content></content></innerinner>)',
    directives: [innerInnerComponent]
});
var innerInnerTemplate = new api_1.ViewDefinition({
    componentId: 'innerinner',
    template: 'INNERINNER(<content select=".left"></content>,<content></content>)',
    directives: []
});
var conditionalContentTemplate = new api_1.ViewDefinition({
    componentId: 'conditional-content',
    template: '<div>(<div *auto="cond"><content select=".left"></content></div>, <content></content>)</div>',
    directives: [autoViewportDirective]
});
var tabTemplate = new api_1.ViewDefinition({
    componentId: 'tab',
    template: '<div><div *auto="cond">TAB(<content></content>)</div></div>',
    directives: [autoViewportDirective]
});
//# sourceMappingURL=shadow_dom_emulation_integration_spec.js.map