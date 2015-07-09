var test_lib_1 = require('angular2/test_lib');
var collection_1 = require('angular2/src/facade/collection');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var dom_testbed_1 = require('./dom_testbed');
var api_1 = require('angular2/src/render/api');
function main() {
    test_lib_1.describe('DomRenderer integration', function () {
        test_lib_1.beforeEachBindings(function () { return [dom_testbed_1.DomTestbed]; });
        test_lib_1.it('should create and destroy root host views while using the given elements in place', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compiler.compileHost(someComponent)
                .then(function (hostProtoViewDto) {
                var view = new dom_testbed_1.TestView(tb.renderer.createRootHostView(hostProtoViewDto.render, '#root'));
                test_lib_1.expect(view.rawView.rootNodes[0]).toEqual(tb.rootEl);
                tb.renderer.destroyView(view.viewRef);
                // destroying a root view should not disconnect it!
                test_lib_1.expect(tb.rootEl.parentNode).toBeTruthy();
                async.done();
            });
        }));
        test_lib_1.it('should create and destroy free host views', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compiler.compileHost(someComponent)
                .then(function (hostProtoViewDto) {
                var view = new dom_testbed_1.TestView(tb.renderer.createView(hostProtoViewDto.render));
                var hostElement = tb.renderer.getHostElement(view.viewRef);
                dom_adapter_1.DOM.appendChild(tb.rootEl, hostElement);
                tb.renderer.detachFreeHostView(null, view.viewRef);
                test_lib_1.expect(dom_adapter_1.DOM.parentElement(hostElement)).toBeFalsy();
                async.done();
            });
        }));
        test_lib_1.it('should attach and detach component views', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compileAll([
                someComponent,
                new api_1.ViewDefinition({ componentId: 'someComponent', template: 'hello', directives: [] })
            ])
                .then(function (protoViewDtos) {
                var rootView = tb.createRootView(protoViewDtos[0]);
                var cmpView = tb.createComponentView(rootView.viewRef, 0, protoViewDtos[1]);
                test_lib_1.expect(tb.rootEl).toHaveText('hello');
                tb.destroyComponentView(rootView.viewRef, 0, cmpView.viewRef);
                test_lib_1.expect(tb.rootEl).toHaveText('');
                async.done();
            });
        }));
        test_lib_1.it('should update text nodes', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compileAll([
                someComponent,
                new api_1.ViewDefinition({ componentId: 'someComponent', template: '{{a}}', directives: [] })
            ])
                .then(function (protoViewDtos) {
                var rootView = tb.createRootView(protoViewDtos[0]);
                var cmpView = tb.createComponentView(rootView.viewRef, 0, protoViewDtos[1]);
                tb.renderer.setText(cmpView.viewRef, 0, 'hello');
                test_lib_1.expect(tb.rootEl).toHaveText('hello');
                async.done();
            });
        }));
        test_lib_1.it('should update element properties', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compileAll([
                someComponent,
                new api_1.ViewDefinition({
                    componentId: 'someComponent',
                    template: '<input [value]="someProp">asdf',
                    directives: []
                })
            ])
                .then(function (protoViewDtos) {
                var rootView = tb.createRootView(protoViewDtos[0]);
                var cmpView = tb.createComponentView(rootView.viewRef, 0, protoViewDtos[1]);
                tb.renderer.setElementProperty(cmpView.viewRef, 0, 'value', 'hello');
                test_lib_1.expect(dom_adapter_1.DOM.childNodes(tb.rootEl)[0].value).toEqual('hello');
                async.done();
            });
        }));
        test_lib_1.it('should call actions on the element', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compileAll([
                someComponent,
                new api_1.ViewDefinition({
                    componentId: 'someComponent',
                    template: '<input with-host-actions></input>',
                    directives: [directiveWithHostActions]
                })
            ])
                .then(function (protoViewDtos) {
                var views = tb.createRootViews(protoViewDtos);
                var componentView = views[1];
                tb.renderer.callAction(componentView.viewRef, 0, 'value = "val"', null);
                test_lib_1.expect(dom_adapter_1.DOM.getValue(dom_adapter_1.DOM.childNodes(tb.rootEl)[0])).toEqual('val');
                async.done();
            });
        }));
        test_lib_1.it('should add and remove views to and from containers', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compileAll([
                someComponent,
                new api_1.ViewDefinition({
                    componentId: 'someComponent',
                    template: '<template>hello</template>',
                    directives: []
                })
            ])
                .then(function (protoViewDtos) {
                var rootView = tb.createRootView(protoViewDtos[0]);
                var cmpView = tb.createComponentView(rootView.viewRef, 0, protoViewDtos[1]);
                var childProto = protoViewDtos[1].elementBinders[0].nestedProtoView;
                test_lib_1.expect(tb.rootEl).toHaveText('');
                var childView = tb.createViewInContainer(cmpView.viewRef, 0, 0, childProto);
                test_lib_1.expect(tb.rootEl).toHaveText('hello');
                tb.destroyViewInContainer(cmpView.viewRef, 0, 0, childView.viewRef);
                test_lib_1.expect(tb.rootEl).toHaveText('');
                async.done();
            });
        }));
        test_lib_1.it('should handle events', test_lib_1.inject([test_lib_1.AsyncTestCompleter, dom_testbed_1.DomTestbed], function (async, tb) {
            tb.compileAll([
                someComponent,
                new api_1.ViewDefinition({
                    componentId: 'someComponent',
                    template: '<input (change)="doSomething()">',
                    directives: []
                })
            ])
                .then(function (protoViewDtos) {
                var rootView = tb.createRootView(protoViewDtos[0]);
                var cmpView = tb.createComponentView(rootView.viewRef, 0, protoViewDtos[1]);
                tb.triggerEvent(cmpView.viewRef, 0, 'change');
                var eventEntry = cmpView.events[0];
                // bound element index
                test_lib_1.expect(eventEntry[0]).toEqual(0);
                // event type
                test_lib_1.expect(eventEntry[1]).toEqual('change');
                // actual event
                test_lib_1.expect(collection_1.MapWrapper.get(eventEntry[2], '$event').type).toEqual('change');
                async.done();
            });
        }));
    });
}
exports.main = main;
var someComponent = new api_1.DirectiveMetadata({ id: 'someComponent', type: api_1.DirectiveMetadata.COMPONENT_TYPE, selector: 'some-comp' });
var directiveWithHostActions = new api_1.DirectiveMetadata({
    id: 'withHostActions',
    type: api_1.DirectiveMetadata.DIRECTIVE_TYPE,
    selector: '[with-host-actions]',
    hostActions: collection_1.MapWrapper.createFromStringMap({ 'setValue': 'value = "val"' })
});
//# sourceMappingURL=dom_renderer_integration_spec.js.map