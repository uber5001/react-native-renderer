var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var test_lib_1 = require('angular2/test_lib');
var test_bed_1 = require('angular2/src/test_lib/test_bed');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var lang_1 = require('angular2/src/facade/lang');
var async_1 = require('angular2/src/facade/async');
var di_1 = require('angular2/di');
var change_detection_1 = require('angular2/change_detection');
var annotations_1 = require('angular2/annotations');
var viewAnn = require('angular2/src/core/annotations_impl/view');
var visAnn = require('angular2/src/core/annotations_impl/visibility');
var query_list_1 = require('angular2/src/core/compiler/query_list');
var ng_if_1 = require('angular2/src/directives/ng_if');
var ng_for_1 = require('angular2/src/directives/ng_for');
var view_container_ref_1 = require('angular2/src/core/compiler/view_container_ref');
var view_ref_1 = require('angular2/src/core/compiler/view_ref');
var compiler_1 = require('angular2/src/core/compiler/compiler');
var element_ref_1 = require('angular2/src/core/compiler/element_ref');
var dom_renderer_1 = require('angular2/src/render/dom/dom_renderer');
var view_manager_1 = require('angular2/src/core/compiler/view_manager');
function main() {
    test_lib_1.describe('integration tests', function () {
        var ctx;
        test_lib_1.beforeEach(function () { ctx = new MyComp(); });
        test_lib_1.describe('react to record changes', function () {
            test_lib_1.it('should consume text node changes', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<div>{{ctxProp}}</div>' }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    ctx.ctxProp = 'Hello World!';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(view.rootNodes[0])).toEqual('Hello World!');
                    async.done();
                });
            }));
            test_lib_1.it('should consume element binding changes', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<div [id]="ctxProp"></div>' }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    ctx.ctxProp = 'Hello World!';
                    view.detectChanges();
                    test_lib_1.expect(view.rootNodes[0].id).toEqual('Hello World!');
                    async.done();
                });
            }));
            test_lib_1.it('should consume binding to aria-* attributes', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<div [attr.aria-label]="ctxProp"></div>' }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    ctx.ctxProp = 'Initial aria label';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(view.rootNodes[0], 'aria-label'))
                        .toEqual('Initial aria label');
                    ctx.ctxProp = 'Changed aria label';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(view.rootNodes[0], 'aria-label'))
                        .toEqual('Changed aria label');
                    async.done();
                });
            }));
            test_lib_1.it('should consume binding to property names where attr name and property name do not match', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<div [tabindex]="ctxNumProp"></div>' }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(view.rootNodes[0].tabIndex).toEqual(0);
                    ctx.ctxNumProp = 5;
                    view.detectChanges();
                    test_lib_1.expect(view.rootNodes[0].tabIndex).toEqual(5);
                    async.done();
                });
            }));
            test_lib_1.it('should consume binding to camel-cased properties using dash-cased syntax in templates', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<input [read-only]="ctxBoolProp">' }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(view.rootNodes[0].readOnly).toBeFalsy();
                    ctx.ctxBoolProp = true;
                    view.detectChanges();
                    test_lib_1.expect(view.rootNodes[0].readOnly).toBeTruthy();
                    async.done();
                });
            }));
            test_lib_1.it('should consume binding to inner-html', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<div inner-html="{{ctxProp}}"></div>' }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    ctx.ctxProp = 'Some <span>HTML</span>';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(view.rootNodes[0])).toEqual('Some <span>HTML</span>');
                    ctx.ctxProp = 'Some other <div>HTML</div>';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(view.rootNodes[0])).toEqual('Some other <div>HTML</div>');
                    async.done();
                });
            }));
            test_lib_1.it('should ignore bindings to unknown properties', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<div unknown="{{ctxProp}}"></div>' }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    ctx.ctxProp = 'Some value';
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.hasProperty(view.rootNodes[0], 'unknown')).toBeFalsy();
                    async.done();
                });
            }));
            test_lib_1.it('should consume directive watch expression change.', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                var tpl = '<div>' +
                    '<div my-dir [elprop]="ctxProp"></div>' +
                    '<div my-dir elprop="Hi there!"></div>' +
                    '<div my-dir elprop="Hi {{\'there!\'}}"></div>' +
                    '<div my-dir elprop="One more {{ctxProp}}"></div>' +
                    '</div>';
                tb.overrideView(MyComp, new viewAnn.View({ template: tpl, directives: [MyDir] }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    ctx.ctxProp = 'Hello World!';
                    view.detectChanges();
                    test_lib_1.expect(view.rawView.elementInjectors[0].get(MyDir).dirProp)
                        .toEqual('Hello World!');
                    test_lib_1.expect(view.rawView.elementInjectors[1].get(MyDir).dirProp).toEqual('Hi there!');
                    test_lib_1.expect(view.rawView.elementInjectors[2].get(MyDir).dirProp).toEqual('Hi there!');
                    test_lib_1.expect(view.rawView.elementInjectors[3].get(MyDir).dirProp)
                        .toEqual('One more Hello World!');
                    async.done();
                });
            }));
            test_lib_1.describe('pipes', function () {
                test_lib_1.beforeEachBindings(function () {
                    return [di_1.bind(change_detection_1.ChangeDetection)
                            .toFactory(function () { return new change_detection_1.DynamicChangeDetection(new change_detection_1.PipeRegistry({ "double": [new DoublePipeFactory()] })); }, [])];
                });
                test_lib_1.it("should support pipes in bindings and bind config", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                    tb.overrideView(MyComp, new viewAnn.View({
                        template: '<component-with-pipes #comp [prop]="ctxProp | double"></component-with-pipes>',
                        directives: [ComponentWithPipes]
                    }));
                    tb.createView(MyComp, { context: ctx })
                        .then(function (view) {
                        ctx.ctxProp = 'a';
                        view.detectChanges();
                        var comp = view.rawView.locals.get("comp");
                        // it is doubled twice: once in the binding, second time in the bind config
                        test_lib_1.expect(comp.prop).toEqual('aaaa');
                        async.done();
                    });
                }));
            });
            test_lib_1.it('should support nested components.', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<child-cmp></child-cmp>', directives: [ChildComp] }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(view.rootNodes).toHaveText('hello');
                    async.done();
                });
            }));
            // GH issue 328 - https://github.com/angular/angular/issues/328
            test_lib_1.it('should support different directive types on a single node', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<child-cmp my-dir [elprop]="ctxProp"></child-cmp>',
                    directives: [MyDir, ChildComp]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    ctx.ctxProp = 'Hello World!';
                    view.detectChanges();
                    var elInj = view.rawView.elementInjectors[0];
                    test_lib_1.expect(elInj.get(MyDir).dirProp).toEqual('Hello World!');
                    test_lib_1.expect(elInj.get(ChildComp).dirProp).toEqual(null);
                    async.done();
                });
            }));
            test_lib_1.it('should support directives where a binding attribute is not given', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    // No attribute "el-prop" specified.
                    template: '<p my-dir></p>',
                    directives: [MyDir]
                }));
                tb.createView(MyComp, { context: ctx }).then(function (view) { async.done(); });
            }));
            test_lib_1.it('should support directives where a selector matches property binding', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<p [id]="ctxProp"></p>', directives: [IdDir] }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    var idDir = view.rawView.elementInjectors[0].get(IdDir);
                    ctx.ctxProp = 'some_id';
                    view.detectChanges();
                    test_lib_1.expect(idDir.id).toEqual('some_id');
                    ctx.ctxProp = 'other_id';
                    view.detectChanges();
                    test_lib_1.expect(idDir.id).toEqual('other_id');
                    async.done();
                });
            }));
            test_lib_1.it('should allow specifying directives as bindings', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<child-cmp></child-cmp>',
                    directives: [di_1.bind(ChildComp).toClass(ChildComp)]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(view.rootNodes).toHaveText('hello');
                    async.done();
                });
            }));
            test_lib_1.it('should read directives metadata from their binding token', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<div public-api><div needs-public-api></div></div>',
                    directives: [di_1.bind(PublicApi).toClass(PrivateImpl), NeedsPublicApi]
                }));
                tb.createView(MyComp, { context: ctx }).then(function (view) { async.done(); });
            }));
            test_lib_1.it('should support template directives via `<template>` elements.', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<div><template some-viewport var-greeting="some-tmpl"><copy-me>{{greeting}}</copy-me></template></div>',
                    directives: [SomeViewport]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    view.detectChanges();
                    var childNodesOfWrapper = view.rootNodes[0].childNodes;
                    // 1 template + 2 copies.
                    test_lib_1.expect(childNodesOfWrapper.length).toBe(3);
                    test_lib_1.expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
                    test_lib_1.expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
                    async.done();
                });
            }));
            test_lib_1.it('should support template directives via `template` attribute.', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<div><copy-me template="some-viewport: var greeting=some-tmpl">{{greeting}}</copy-me></div>',
                    directives: [SomeViewport]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    view.detectChanges();
                    var childNodesOfWrapper = view.rootNodes[0].childNodes;
                    // 1 template + 2 copies.
                    test_lib_1.expect(childNodesOfWrapper.length).toBe(3);
                    test_lib_1.expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
                    test_lib_1.expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
                    async.done();
                });
            }));
            test_lib_1.it('should allow to transplant embedded ProtoViews into other ViewContainers', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<some-directive><toolbar><template toolbarpart var-toolbar-prop="toolbarProp">{{ctxProp}},{{toolbarProp}},<cmp-with-parent></cmp-with-parent></template></toolbar></some-directive>',
                    directives: [SomeDirective, CompWithParent, ToolbarComponent, ToolbarPart]
                }));
                ctx.ctxProp = 'From myComp';
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(view.rootNodes)
                        .toHaveText('TOOLBAR(From myComp,From toolbar,Component with an injected parent)');
                    async.done();
                });
            }));
            test_lib_1.it('should assign the component instance to a var-', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<p><child-cmp var-alice></child-cmp></p>',
                    directives: [ChildComp]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    test_lib_1.expect(view.rawView.locals).not.toBe(null);
                    test_lib_1.expect(view.rawView.locals.get('alice')).toBeAnInstanceOf(ChildComp);
                    async.done();
                });
            }));
            test_lib_1.it('should make the assigned component accessible in property bindings', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<p><child-cmp var-alice></child-cmp>{{alice.ctxProp}}</p>',
                    directives: [ChildComp]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(view.rootNodes).toHaveText('hellohello'); // this first one is the
                    // component, the second one is
                    // the text binding
                    async.done();
                });
            }));
            test_lib_1.it('should assign two component instances each with a var-', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<p><child-cmp var-alice></child-cmp><child-cmp var-bob></p>',
                    directives: [ChildComp]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    test_lib_1.expect(view.rawView.locals).not.toBe(null);
                    test_lib_1.expect(view.rawView.locals.get('alice')).toBeAnInstanceOf(ChildComp);
                    test_lib_1.expect(view.rawView.locals.get('bob')).toBeAnInstanceOf(ChildComp);
                    test_lib_1.expect(view.rawView.locals.get('alice')).not.toBe(view.rawView.locals.get('bob'));
                    async.done();
                });
            }));
            test_lib_1.it('should assign the component instance to a var- with shorthand syntax', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<child-cmp #alice></child-cmp>', directives: [ChildComp] }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    test_lib_1.expect(view.rawView.locals).not.toBe(null);
                    test_lib_1.expect(view.rawView.locals.get('alice')).toBeAnInstanceOf(ChildComp);
                    async.done();
                });
            }));
            test_lib_1.it('should assign the element instance to a user-defined variable', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<p><div var-alice><i>Hello</i></div></p>' }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    test_lib_1.expect(view.rawView.locals).not.toBe(null);
                    var value = view.rawView.locals.get('alice');
                    test_lib_1.expect(value).not.toBe(null);
                    test_lib_1.expect(value.tagName.toLowerCase()).toEqual('div');
                    async.done();
                });
            }));
            test_lib_1.it('should assign the element instance to a user-defined variable with camelCase using dash-case', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<p><div var-super-alice><i>Hello</i></div></p>' }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    test_lib_1.expect(view.rawView.locals).not.toBe(null);
                    var value = view.rawView.locals.get('superAlice');
                    test_lib_1.expect(value).not.toBe(null);
                    test_lib_1.expect(value.tagName.toLowerCase()).toEqual('div');
                    async.done();
                });
            }));
            test_lib_1.describe("ON_PUSH components", function () {
                test_lib_1.it("should use ChangeDetectorRef to manually request a check", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                    tb.overrideView(MyComp, new viewAnn.View({
                        template: '<push-cmp-with-ref #cmp></push-cmp-with-ref>',
                        directives: [[[PushCmpWithRef]]]
                    }));
                    tb.createView(MyComp, { context: ctx })
                        .then(function (view) {
                        var cmp = view.rawView.locals.get('cmp');
                        view.detectChanges();
                        test_lib_1.expect(cmp.numberOfChecks).toEqual(1);
                        view.detectChanges();
                        test_lib_1.expect(cmp.numberOfChecks).toEqual(1);
                        cmp.propagate();
                        view.detectChanges();
                        test_lib_1.expect(cmp.numberOfChecks).toEqual(2);
                        async.done();
                    });
                }));
                test_lib_1.it("should be checked when its bindings got updated", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                    tb.overrideView(MyComp, new viewAnn.View({
                        template: '<push-cmp [prop]="ctxProp" #cmp></push-cmp>',
                        directives: [[[PushCmp]]]
                    }));
                    tb.createView(MyComp, { context: ctx })
                        .then(function (view) {
                        var cmp = view.rawView.locals.get('cmp');
                        ctx.ctxProp = "one";
                        view.detectChanges();
                        test_lib_1.expect(cmp.numberOfChecks).toEqual(1);
                        ctx.ctxProp = "two";
                        view.detectChanges();
                        test_lib_1.expect(cmp.numberOfChecks).toEqual(2);
                        async.done();
                    });
                }));
                test_lib_1.it('should not affect updating properties on the component', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                    tb.overrideView(MyComp, new viewAnn.View({
                        template: '<push-cmp-with-ref [prop]="ctxProp" #cmp></push-cmp-with-ref>',
                        directives: [[[PushCmpWithRef]]]
                    }));
                    tb.createView(MyComp, { context: ctx })
                        .then(function (view) {
                        var cmp = view.rawView.locals.get('cmp');
                        ctx.ctxProp = "one";
                        view.detectChanges();
                        test_lib_1.expect(cmp.prop).toEqual("one");
                        ctx.ctxProp = "two";
                        view.detectChanges();
                        test_lib_1.expect(cmp.prop).toEqual("two");
                        async.done();
                    });
                }));
            });
            test_lib_1.it('should create a component that injects a @Parent', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<some-directive><cmp-with-parent #child></cmp-with-parent></some-directive>',
                    directives: [SomeDirective, CompWithParent]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    var childComponent = view.rawView.locals.get('child');
                    test_lib_1.expect(childComponent.myParent).toBeAnInstanceOf(SomeDirective);
                    async.done();
                });
            }));
            test_lib_1.it('should create a component that injects an @Ancestor', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: "\n            <some-directive>\n              <p>\n                <cmp-with-ancestor #child></cmp-with-ancestor>\n              </p>\n            </some-directive>",
                    directives: [SomeDirective, CompWithAncestor]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    var childComponent = view.rawView.locals.get('child');
                    test_lib_1.expect(childComponent.myAncestor).toBeAnInstanceOf(SomeDirective);
                    async.done();
                });
            }));
            test_lib_1.it('should create a component that injects an @Ancestor through viewcontainer directive', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: "\n            <some-directive>\n              <p *ng-if=\"true\">\n                <cmp-with-ancestor #child></cmp-with-ancestor>\n              </p>\n            </some-directive>",
                    directives: [SomeDirective, CompWithAncestor, ng_if_1.NgIf]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    view.detectChanges();
                    var subview = view.rawView.viewContainers[1].views[0];
                    var childComponent = subview.locals.get('child');
                    test_lib_1.expect(childComponent.myAncestor).toBeAnInstanceOf(SomeDirective);
                    async.done();
                });
            }));
            test_lib_1.it('should support events via EventEmitter', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<div emitter listener></div>',
                    directives: [DirectiveEmitingEvent, DirectiveListeningEvent]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    var injector = view.rawView.elementInjectors[0];
                    var emitter = injector.get(DirectiveEmitingEvent);
                    var listener = injector.get(DirectiveListeningEvent);
                    test_lib_1.expect(listener.msg).toEqual('');
                    async_1.ObservableWrapper.subscribe(emitter.event, function (_) {
                        test_lib_1.expect(listener.msg).toEqual('fired !');
                        async.done();
                    });
                    emitter.fireEvent('fired !');
                });
            }));
            test_lib_1.it('should support [()] syntax', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<div [(control)]="ctxProp" two-way></div>',
                    directives: [DirectiveWithTwoWayBinding]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    var injector = view.rawView.elementInjectors[0];
                    var dir = injector.get(DirectiveWithTwoWayBinding);
                    ctx.ctxProp = 'one';
                    view.detectChanges();
                    test_lib_1.expect(dir.value).toEqual('one');
                    async_1.ObservableWrapper.subscribe(dir.control, function (_) {
                        test_lib_1.expect(ctx.ctxProp).toEqual('two');
                        async.done();
                    });
                    dir.triggerChange('two');
                });
            }));
            if (dom_adapter_1.DOM.supportsDOMEvents()) {
                test_lib_1.it("should support invoking methods on the host element via hostActions", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                    tb.overrideView(MyComp, new viewAnn.View({
                        template: '<div update-host-actions></div>',
                        directives: [DirectiveUpdatingHostActions]
                    }));
                    tb.createView(MyComp, { context: ctx })
                        .then(function (view) {
                        var injector = view.rawView.elementInjectors[0];
                        var domElement = view.rootNodes[0];
                        var updateHost = injector.get(DirectiveUpdatingHostActions);
                        async_1.ObservableWrapper.subscribe(updateHost.setAttr, function (_) {
                            test_lib_1.expect(dom_adapter_1.DOM.hasAttribute(domElement, 'update-host-actions')).toBe(true);
                            async.done();
                        });
                        updateHost.triggerSetAttr('value');
                    });
                }));
            }
            test_lib_1.it('should support render events', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<div listener></div>', directives: [DirectiveListeningDomEvent] }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    var injector = view.rawView.elementInjectors[0];
                    var listener = injector.get(DirectiveListeningDomEvent);
                    test_lib_1.dispatchEvent(view.rootNodes[0], 'domEvent');
                    test_lib_1.expect(listener.eventType).toEqual('domEvent');
                    async.done();
                });
            }));
            test_lib_1.it('should support render global events', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<div listener></div>', directives: [DirectiveListeningDomEvent] }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    var injector = view.rawView.elementInjectors[0];
                    var listener = injector.get(DirectiveListeningDomEvent);
                    test_lib_1.dispatchEvent(dom_adapter_1.DOM.getGlobalEventTarget("window"), 'domEvent');
                    test_lib_1.expect(listener.eventType).toEqual('window_domEvent');
                    listener = injector.get(DirectiveListeningDomEvent);
                    test_lib_1.dispatchEvent(dom_adapter_1.DOM.getGlobalEventTarget("document"), 'domEvent');
                    test_lib_1.expect(listener.eventType).toEqual('document_domEvent');
                    view.destroy();
                    listener = injector.get(DirectiveListeningDomEvent);
                    test_lib_1.dispatchEvent(dom_adapter_1.DOM.getGlobalEventTarget("body"), 'domEvent');
                    test_lib_1.expect(listener.eventType).toEqual('');
                    async.done();
                });
            }));
            test_lib_1.it('should support updating host element via hostAttributes', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<div update-host-attributes></div>',
                    directives: [DirectiveUpdatingHostAttributes]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    view.detectChanges();
                    test_lib_1.expect(dom_adapter_1.DOM.getAttribute(view.rootNodes[0], "role")).toEqual("button");
                    async.done();
                });
            }));
            test_lib_1.it('should support updating host element via hostProperties', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<div update-host-properties></div>',
                    directives: [DirectiveUpdatingHostProperties]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    var injector = view.rawView.elementInjectors[0];
                    var updateHost = injector.get(DirectiveUpdatingHostProperties);
                    updateHost.id = "newId";
                    view.detectChanges();
                    test_lib_1.expect(view.rootNodes[0].id).toEqual("newId");
                    async.done();
                });
            }));
            if (dom_adapter_1.DOM.supportsDOMEvents()) {
                test_lib_1.it('should support preventing default on render events', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                    tb.overrideView(MyComp, new viewAnn.View({
                        template: '<input type="checkbox" listenerprevent></input><input type="checkbox" listenernoprevent></input>',
                        directives: [DirectiveListeningDomEventPrevent, DirectiveListeningDomEventNoPrevent]
                    }));
                    tb.createView(MyComp, { context: ctx })
                        .then(function (view) {
                        test_lib_1.expect(dom_adapter_1.DOM.getChecked(view.rootNodes[0])).toBeFalsy();
                        test_lib_1.expect(dom_adapter_1.DOM.getChecked(view.rootNodes[1])).toBeFalsy();
                        dom_adapter_1.DOM.dispatchEvent(view.rootNodes[0], dom_adapter_1.DOM.createMouseEvent('click'));
                        dom_adapter_1.DOM.dispatchEvent(view.rootNodes[1], dom_adapter_1.DOM.createMouseEvent('click'));
                        test_lib_1.expect(dom_adapter_1.DOM.getChecked(view.rootNodes[0])).toBeFalsy();
                        test_lib_1.expect(dom_adapter_1.DOM.getChecked(view.rootNodes[1])).toBeTruthy();
                        async.done();
                    });
                }));
            }
            test_lib_1.it('should support render global events from multiple directives', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: '<div *ng-if="ctxBoolProp" listener listenerother></div>',
                    directives: [ng_if_1.NgIf, DirectiveListeningDomEvent, DirectiveListeningDomEventOther]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    globalCounter = 0;
                    ctx.ctxBoolProp = true;
                    view.detectChanges();
                    var subview = view.rawView.viewContainers[0].views[0];
                    var injector = subview.elementInjectors[0];
                    var listener = injector.get(DirectiveListeningDomEvent);
                    var listenerother = injector.get(DirectiveListeningDomEventOther);
                    test_lib_1.dispatchEvent(dom_adapter_1.DOM.getGlobalEventTarget("window"), 'domEvent');
                    test_lib_1.expect(listener.eventType).toEqual('window_domEvent');
                    test_lib_1.expect(listenerother.eventType).toEqual('other_domEvent');
                    test_lib_1.expect(globalCounter).toEqual(1);
                    ctx.ctxBoolProp = false;
                    view.detectChanges();
                    test_lib_1.dispatchEvent(dom_adapter_1.DOM.getGlobalEventTarget("window"), 'domEvent');
                    test_lib_1.expect(globalCounter).toEqual(1);
                    ctx.ctxBoolProp = true;
                    view.detectChanges();
                    test_lib_1.dispatchEvent(dom_adapter_1.DOM.getGlobalEventTarget("window"), 'domEvent');
                    test_lib_1.expect(globalCounter).toEqual(2);
                    async.done();
                });
            }));
            test_lib_1.describe('dynamic ViewContainers', function () {
                test_lib_1.it('should allow to create a ViewContainerRef at any bound location', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter, compiler_1.Compiler], function (tb, async, compiler) {
                    tb.overrideView(MyComp, new viewAnn.View({
                        template: '<div><dynamic-vp #dynamic></dynamic-vp></div>',
                        directives: [DynamicViewport]
                    }));
                    tb.createView(MyComp).then(function (view) {
                        var dynamicVp = view.rawView.elementInjectors[0].get(DynamicViewport);
                        dynamicVp.done.then(function (_) {
                            view.detectChanges();
                            test_lib_1.expect(view.rootNodes).toHaveText('dynamic greet');
                            async.done();
                        });
                    });
                }));
            });
            test_lib_1.it('should support static attributes', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<input static type="text" title>', directives: [NeedsAttribute] }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    var injector = view.rawView.elementInjectors[0];
                    var needsAttribute = injector.get(NeedsAttribute);
                    test_lib_1.expect(needsAttribute.typeAttribute).toEqual('text');
                    test_lib_1.expect(needsAttribute.titleAttribute).toEqual('');
                    test_lib_1.expect(needsAttribute.fooAttribute).toEqual(null);
                    async.done();
                });
            }));
        });
        test_lib_1.describe("dependency injection", function () {
            test_lib_1.it("should support hostInjector", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: "\n            <directive-providing-injectable>\n              <directive-consuming-injectable #consuming>\n              </directive-consuming-injectable>\n            </directive-providing-injectable>\n          ",
                    directives: [DirectiveProvidingInjectable, DirectiveConsumingInjectable]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    var comp = view.rawView.locals.get("consuming");
                    test_lib_1.expect(comp.injectable).toBeAnInstanceOf(InjectableService);
                    async.done();
                });
            }));
            test_lib_1.it("should support viewInjector", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(DirectiveProvidingInjectableInView, new viewAnn.View({
                    template: "\n              <directive-consuming-injectable #consuming>\n              </directive-consuming-injectable>\n          ",
                    directives: [DirectiveConsumingInjectable]
                }));
                tb.createView(DirectiveProvidingInjectableInView, { context: new DirectiveProvidingInjectableInView() })
                    .then(function (view) {
                    var comp = view.rawView.locals.get("consuming");
                    test_lib_1.expect(comp.injectable).toBeAnInstanceOf(InjectableService);
                    async.done();
                });
            }));
            test_lib_1.it("should support unbounded lookup", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: "\n            <directive-providing-injectable>\n              <directive-containing-directive-consuming-an-injectable #dir>\n              </directive-containing-directive-consuming-an-injectable>\n            </directive-providing-injectable>\n          ",
                    directives: [
                        DirectiveProvidingInjectable,
                        DirectiveContainingDirectiveConsumingAnInjectable
                    ]
                }));
                tb.overrideView(DirectiveContainingDirectiveConsumingAnInjectable, new viewAnn.View({
                    template: "\n            <directive-consuming-injectable-unbounded></directive-consuming-injectable-unbounded>\n          ",
                    directives: [DirectiveConsumingInjectableUnbounded]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    var comp = view.rawView.locals.get("dir");
                    test_lib_1.expect(comp.directive.injectable).toBeAnInstanceOf(InjectableService);
                    async.done();
                });
            }));
            test_lib_1.it("should support the event-bus scenario", test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({
                    template: "\n            <grand-parent-providing-event-bus>\n              <parent-providing-event-bus>\n                <child-consuming-event-bus>\n                </child-consuming-event-bus>\n              </parent-providing-event-bus>\n            </grand-parent-providing-event-bus>\n          ",
                    directives: [
                        GrandParentProvidingEventBus,
                        ParentProvidingEventBus,
                        ChildConsumingEventBus
                    ]
                }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    var eis = view.rawView.elementInjectors;
                    var childRawView = view.rawView.componentChildViews[1];
                    var grandParent = eis[0].get(GrandParentProvidingEventBus);
                    var parent = eis[1].get(ParentProvidingEventBus);
                    var child1 = eis[2].get(ChildConsumingEventBus);
                    var child2 = childRawView.elementInjectors[0].get(ChildConsumingEventBus);
                    test_lib_1.expect(grandParent.bus.name).toEqual("grandparent");
                    test_lib_1.expect(parent.bus.name).toEqual("parent");
                    test_lib_1.expect(parent.grandParentBus).toBe(grandParent.bus);
                    test_lib_1.expect(child1.bus).toBe(parent.bus);
                    test_lib_1.expect(child2.bus).toBe(parent.bus);
                    async.done();
                });
            }));
        });
        test_lib_1.describe("error handling", function () {
            test_lib_1.it('should report a meaningful error when a directive is missing annotation', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ directives: [SomeDirectiveMissingAnnotation] }));
                async_1.PromiseWrapper.catchError(tb.createView(MyComp, { context: ctx }), function (e) {
                    test_lib_1.expect(e.message).toEqual("No Directive annotation found on " + lang_1.stringify(SomeDirectiveMissingAnnotation));
                    async.done();
                });
            }));
            test_lib_1.it('should report a meaningful error when a directive is null', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ directives: [[null]] }));
                async_1.PromiseWrapper.catchError(tb.createView(MyComp, { context: ctx }), function (e) {
                    test_lib_1.expect(e.message).toEqual("Unexpected directive value 'null' on the View of component '" + lang_1.stringify(MyComp) + "'");
                    async.done();
                });
            }));
            if (!test_lib_1.IS_DARTIUM) {
                test_lib_1.it('should report a meaningful error when a directive is undefined', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                    var undefinedValue;
                    tb.overrideView(MyComp, new viewAnn.View({ directives: [undefinedValue] }));
                    async_1.PromiseWrapper.catchError(tb.createView(MyComp, { context: ctx }), function (e) {
                        test_lib_1.expect(e.message).toEqual("Unexpected directive value 'undefined' on the View of component '" + lang_1.stringify(MyComp) + "'");
                        async.done();
                    });
                }));
            }
            test_lib_1.it('should specify a location of an error that happened during change detection (text)', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '{{a.b}}' }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    test_lib_1.expect(function () { return view.detectChanges(); })
                        .toThrowError(test_lib_1.containsRegexp("{{a.b}} in " + lang_1.stringify(MyComp)));
                    async.done();
                });
            }));
            test_lib_1.it('should specify a location of an error that happened during change detection (element property)', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<div [prop]="a.b"></div>' }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    test_lib_1.expect(function () { return view.detectChanges(); })
                        .toThrowError(test_lib_1.containsRegexp("a.b in " + lang_1.stringify(MyComp)));
                    async.done();
                });
            }));
            test_lib_1.it('should specify a location of an error that happened during change detection (directive property)', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                tb.overrideView(MyComp, new viewAnn.View({ template: '<child-cmp [prop]="a.b"></child-cmp>', directives: [ChildComp] }));
                tb.createView(MyComp, { context: ctx })
                    .then(function (view) {
                    test_lib_1.expect(function () { return view.detectChanges(); })
                        .toThrowError(test_lib_1.containsRegexp("a.b in " + lang_1.stringify(MyComp)));
                    async.done();
                });
            }));
        });
        test_lib_1.it('should support imperative views', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            tb.overrideView(MyComp, new viewAnn.View({
                template: '<simple-imp-cmp></simple-imp-cmp>',
                directives: [SimpleImperativeViewComponent]
            }));
            tb.createView(MyComp).then(function (view) {
                test_lib_1.expect(view.rootNodes).toHaveText('hello imp view');
                async.done();
            });
        }));
        // Disabled until a solution is found, refs:
        // - https://github.com/angular/angular/issues/776
        // - https://github.com/angular/angular/commit/81f3f32
        test_lib_1.xdescribe('Missing directive checks', function () {
            if (lang_1.assertionsEnabled()) {
                function expectCompileError(tb, inlineTpl, errMessage, done) {
                    tb.overrideView(MyComp, new viewAnn.View({ template: inlineTpl }));
                    async_1.PromiseWrapper.then(tb.createView(MyComp), function (value) {
                        throw new lang_1.BaseException("Test failure: should not have come here as an exception was expected");
                    }, function (err) {
                        test_lib_1.expect(err.message).toEqual(errMessage);
                        done();
                    });
                }
                test_lib_1.it('should raise an error if no directive is registered for a template with template bindings', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                    expectCompileError(tb, '<div><div template="if: foo"></div></div>', 'Missing directive to handle \'if\' in <div template="if: foo">', function () { return async.done(); });
                }));
                test_lib_1.it('should raise an error for missing template directive (1)', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                    expectCompileError(tb, '<div><template foo></template></div>', 'Missing directive to handle: <template foo>', function () { return async.done(); });
                }));
                test_lib_1.it('should raise an error for missing template directive (2)', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                    expectCompileError(tb, '<div><template *ng-if="condition"></template></div>', 'Missing directive to handle: <template *ng-if="condition">', function () { return async.done(); });
                }));
                test_lib_1.it('should raise an error for missing template directive (3)', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
                    expectCompileError(tb, '<div *ng-if="condition"></div>', 'Missing directive to handle \'if\' in MyComp: <div *ng-if="condition">', function () { return async.done(); });
                }));
            }
        });
    });
}
exports.main = main;
var MyService = (function () {
    function MyService() {
        this.greeting = 'hello';
    }
    MyService = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyService);
    return MyService;
})();
var SimpleImperativeViewComponent = (function () {
    function SimpleImperativeViewComponent(self, viewManager, renderer) {
        var shadowViewRef = viewManager.getComponentView(self);
        renderer.setComponentViewRootNodes(shadowViewRef.render, [test_lib_1.el('hello imp view')]);
    }
    SimpleImperativeViewComponent = __decorate([
        annotations_1.Component({ selector: 'simple-imp-cmp' }),
        annotations_1.View({ renderer: 'simple-imp-cmp-renderer', template: '' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [element_ref_1.ElementRef, view_manager_1.AppViewManager, dom_renderer_1.DomRenderer])
    ], SimpleImperativeViewComponent);
    return SimpleImperativeViewComponent;
})();
var DynamicViewport = (function () {
    function DynamicViewport(vc, inj, compiler) {
        var myService = new MyService();
        myService.greeting = 'dynamic greet';
        this.done = compiler.compileInHost(ChildCompUsingService)
            .then(function (hostPv) {
            vc.create(hostPv, 0, null, inj.createChildFromResolved(di_1.Injector.resolve([di_1.bind(MyService).toValue(myService)])));
        });
    }
    DynamicViewport = __decorate([
        annotations_1.Directive({ selector: 'dynamic-vp' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [view_container_ref_1.ViewContainerRef, di_1.Injector, compiler_1.Compiler])
    ], DynamicViewport);
    return DynamicViewport;
})();
var MyDir = (function () {
    function MyDir() {
        this.dirProp = '';
    }
    MyDir = __decorate([
        annotations_1.Directive({ selector: '[my-dir]', properties: ['dirProp: elprop'] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyDir);
    return MyDir;
})();
var PushCmp = (function () {
    function PushCmp() {
        this.numberOfChecks = 0;
    }
    Object.defineProperty(PushCmp.prototype, "field", {
        get: function () {
            this.numberOfChecks++;
            return "fixed";
        },
        enumerable: true,
        configurable: true
    });
    PushCmp = __decorate([
        annotations_1.Component({ selector: 'push-cmp', properties: ['prop'], changeDetection: change_detection_1.ON_PUSH }),
        annotations_1.View({ template: '{{field}}' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PushCmp);
    return PushCmp;
})();
var PushCmpWithRef = (function () {
    function PushCmpWithRef(ref) {
        this.numberOfChecks = 0;
        this.ref = ref;
    }
    Object.defineProperty(PushCmpWithRef.prototype, "field", {
        get: function () {
            this.numberOfChecks++;
            return "fixed";
        },
        enumerable: true,
        configurable: true
    });
    PushCmpWithRef.prototype.propagate = function () { this.ref.requestCheck(); };
    PushCmpWithRef = __decorate([
        annotations_1.Component({ selector: 'push-cmp-with-ref', properties: ['prop'], changeDetection: change_detection_1.ON_PUSH }),
        annotations_1.View({ template: '{{field}}' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [change_detection_1.ChangeDetectorRef])
    ], PushCmpWithRef);
    return PushCmpWithRef;
})();
var MyComp = (function () {
    function MyComp() {
        this.ctxProp = 'initial value';
        this.ctxNumProp = 0;
        this.ctxBoolProp = false;
    }
    MyComp = __decorate([
        annotations_1.Component({ selector: 'my-comp' }),
        annotations_1.View({ directives: [] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
var ComponentWithPipes = (function () {
    function ComponentWithPipes() {
    }
    ComponentWithPipes = __decorate([
        annotations_1.Component({ selector: 'component-with-pipes', properties: ["prop: prop | double"] }),
        annotations_1.View({ template: '' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ComponentWithPipes);
    return ComponentWithPipes;
})();
var ChildComp = (function () {
    function ChildComp(service) {
        this.ctxProp = service.greeting;
        this.dirProp = null;
    }
    ChildComp = __decorate([
        annotations_1.Component({
            selector: 'child-cmp',
            appInjector: [MyService],
        }),
        annotations_1.View({ directives: [MyDir], template: '{{ctxProp}}' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [MyService])
    ], ChildComp);
    return ChildComp;
})();
var ChildCompUsingService = (function () {
    function ChildCompUsingService(service) {
        this.ctxProp = service.greeting;
    }
    ChildCompUsingService = __decorate([
        annotations_1.Component({ selector: 'child-cmp-svc' }),
        annotations_1.View({ template: '{{ctxProp}}' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [MyService])
    ], ChildCompUsingService);
    return ChildCompUsingService;
})();
var SomeDirective = (function () {
    function SomeDirective() {
    }
    SomeDirective = __decorate([
        annotations_1.Directive({ selector: 'some-directive' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SomeDirective);
    return SomeDirective;
})();
var SomeDirectiveMissingAnnotation = (function () {
    function SomeDirectiveMissingAnnotation() {
    }
    return SomeDirectiveMissingAnnotation;
})();
var CompWithParent = (function () {
    function CompWithParent(someComp) {
        this.myParent = someComp;
    }
    CompWithParent = __decorate([
        annotations_1.Component({ selector: 'cmp-with-parent' }),
        annotations_1.View({ template: '<p>Component with an injected parent</p>', directives: [SomeDirective] }),
        di_1.Injectable(),
        __param(0, annotations_1.Parent()), 
        __metadata('design:paramtypes', [SomeDirective])
    ], CompWithParent);
    return CompWithParent;
})();
var CompWithAncestor = (function () {
    function CompWithAncestor(someComp) {
        this.myAncestor = someComp;
    }
    CompWithAncestor = __decorate([
        annotations_1.Component({ selector: 'cmp-with-ancestor' }),
        annotations_1.View({ template: '<p>Component with an injected ancestor</p>', directives: [SomeDirective] }),
        di_1.Injectable(),
        __param(0, annotations_1.Ancestor()), 
        __metadata('design:paramtypes', [SomeDirective])
    ], CompWithAncestor);
    return CompWithAncestor;
})();
var ChildComp2 = (function () {
    function ChildComp2(service) {
        this.ctxProp = service.greeting;
        this.dirProp = null;
    }
    ChildComp2 = __decorate([
        annotations_1.Component({ selector: '[child-cmp2]', appInjector: [MyService] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [MyService])
    ], ChildComp2);
    return ChildComp2;
})();
var SomeViewport = (function () {
    function SomeViewport(container, protoView) {
        container.create(protoView).setLocal('some-tmpl', 'hello');
        container.create(protoView).setLocal('some-tmpl', 'again');
    }
    SomeViewport = __decorate([
        annotations_1.Directive({ selector: '[some-viewport]' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [view_container_ref_1.ViewContainerRef, view_ref_1.ProtoViewRef])
    ], SomeViewport);
    return SomeViewport;
})();
var DoublePipe = (function (_super) {
    __extends(DoublePipe, _super);
    function DoublePipe() {
        _super.apply(this, arguments);
    }
    DoublePipe.prototype.supports = function (obj) { return true; };
    DoublePipe.prototype.transform = function (value) { return "" + value + value; };
    DoublePipe = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DoublePipe);
    return DoublePipe;
})(change_detection_1.Pipe);
var DoublePipeFactory = (function () {
    function DoublePipeFactory() {
    }
    DoublePipeFactory.prototype.supports = function (obj) { return true; };
    DoublePipeFactory.prototype.create = function (cdRef) { return new DoublePipe(); };
    DoublePipeFactory = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DoublePipeFactory);
    return DoublePipeFactory;
})();
var DirectiveEmitingEvent = (function () {
    function DirectiveEmitingEvent() {
        this.msg = '';
        this.event = new async_1.EventEmitter();
    }
    DirectiveEmitingEvent.prototype.fireEvent = function (msg) { async_1.ObservableWrapper.callNext(this.event, msg); };
    DirectiveEmitingEvent = __decorate([
        annotations_1.Directive({ selector: '[emitter]', events: ['event'] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveEmitingEvent);
    return DirectiveEmitingEvent;
})();
var DirectiveUpdatingHostAttributes = (function () {
    function DirectiveUpdatingHostAttributes() {
    }
    DirectiveUpdatingHostAttributes = __decorate([
        annotations_1.Directive({ selector: '[update-host-attributes]', hostAttributes: { 'role': 'button' } }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveUpdatingHostAttributes);
    return DirectiveUpdatingHostAttributes;
})();
var DirectiveUpdatingHostProperties = (function () {
    function DirectiveUpdatingHostProperties() {
        this.id = "one";
    }
    DirectiveUpdatingHostProperties = __decorate([
        annotations_1.Directive({ selector: '[update-host-properties]', hostProperties: { 'id': 'id' } }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveUpdatingHostProperties);
    return DirectiveUpdatingHostProperties;
})();
var DirectiveUpdatingHostActions = (function () {
    function DirectiveUpdatingHostActions() {
        this.setAttr = new async_1.EventEmitter();
    }
    DirectiveUpdatingHostActions.prototype.triggerSetAttr = function (attrValue) { async_1.ObservableWrapper.callNext(this.setAttr, { 'attrValue': attrValue }); };
    DirectiveUpdatingHostActions = __decorate([
        annotations_1.Directive({
            selector: '[update-host-actions]',
            hostActions: { 'setAttr': 'setAttribute("key", $action["attrValue"])' }
        }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveUpdatingHostActions);
    return DirectiveUpdatingHostActions;
})();
var DirectiveListeningEvent = (function () {
    function DirectiveListeningEvent() {
        this.msg = '';
    }
    DirectiveListeningEvent.prototype.onEvent = function (msg) { this.msg = msg; };
    DirectiveListeningEvent = __decorate([
        annotations_1.Directive({ selector: '[listener]', hostListeners: { 'event': 'onEvent($event)' } }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveListeningEvent);
    return DirectiveListeningEvent;
})();
var DirectiveListeningDomEvent = (function () {
    function DirectiveListeningDomEvent() {
        this.eventType = '';
    }
    DirectiveListeningDomEvent.prototype.onEvent = function (eventType) { this.eventType = eventType; };
    DirectiveListeningDomEvent.prototype.onWindowEvent = function (eventType) { this.eventType = "window_" + eventType; };
    DirectiveListeningDomEvent.prototype.onDocumentEvent = function (eventType) { this.eventType = "document_" + eventType; };
    DirectiveListeningDomEvent.prototype.onBodyEvent = function (eventType) { this.eventType = "body_" + eventType; };
    DirectiveListeningDomEvent = __decorate([
        annotations_1.Directive({
            selector: '[listener]',
            hostListeners: {
                'domEvent': 'onEvent($event.type)',
                'window:domEvent': 'onWindowEvent($event.type)',
                'document:domEvent': 'onDocumentEvent($event.type)',
                'body:domEvent': 'onBodyEvent($event.type)'
            }
        }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveListeningDomEvent);
    return DirectiveListeningDomEvent;
})();
var globalCounter = 0;
var DirectiveListeningDomEventOther = (function () {
    function DirectiveListeningDomEventOther() {
        this.eventType = '';
    }
    DirectiveListeningDomEventOther.prototype.onEvent = function (eventType) {
        globalCounter++;
        this.eventType = "other_" + eventType;
    };
    DirectiveListeningDomEventOther = __decorate([
        annotations_1.Directive({ selector: '[listenerother]', hostListeners: { 'window:domEvent': 'onEvent($event.type)' } }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveListeningDomEventOther);
    return DirectiveListeningDomEventOther;
})();
var DirectiveListeningDomEventPrevent = (function () {
    function DirectiveListeningDomEventPrevent() {
    }
    DirectiveListeningDomEventPrevent.prototype.onEvent = function (event) { return false; };
    DirectiveListeningDomEventPrevent = __decorate([
        annotations_1.Directive({ selector: '[listenerprevent]', hostListeners: { 'click': 'onEvent($event)' } }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveListeningDomEventPrevent);
    return DirectiveListeningDomEventPrevent;
})();
var DirectiveListeningDomEventNoPrevent = (function () {
    function DirectiveListeningDomEventNoPrevent() {
    }
    DirectiveListeningDomEventNoPrevent.prototype.onEvent = function (event) { return true; };
    DirectiveListeningDomEventNoPrevent = __decorate([
        annotations_1.Directive({ selector: '[listenernoprevent]', hostListeners: { 'click': 'onEvent($event)' } }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveListeningDomEventNoPrevent);
    return DirectiveListeningDomEventNoPrevent;
})();
var IdDir = (function () {
    function IdDir() {
    }
    IdDir = __decorate([
        annotations_1.Directive({ selector: '[id]', properties: ['id'] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], IdDir);
    return IdDir;
})();
var NeedsAttribute = (function () {
    function NeedsAttribute(typeAttribute, titleAttribute, fooAttribute) {
        this.typeAttribute = typeAttribute;
        this.titleAttribute = titleAttribute;
        this.fooAttribute = fooAttribute;
    }
    NeedsAttribute = __decorate([
        annotations_1.Directive({ selector: '[static]' }),
        di_1.Injectable(),
        __param(0, annotations_1.Attribute('type')),
        __param(1, annotations_1.Attribute('title')),
        __param(2, annotations_1.Attribute('foo')), 
        __metadata('design:paramtypes', [String, String, String])
    ], NeedsAttribute);
    return NeedsAttribute;
})();
var PublicApi = (function () {
    function PublicApi() {
    }
    PublicApi = __decorate([
        annotations_1.Directive({ selector: '[public-api]' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PublicApi);
    return PublicApi;
})();
var PrivateImpl = (function (_super) {
    __extends(PrivateImpl, _super);
    function PrivateImpl() {
        _super.apply(this, arguments);
    }
    PrivateImpl = __decorate([
        annotations_1.Directive({ selector: '[private-impl]' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PrivateImpl);
    return PrivateImpl;
})(PublicApi);
var NeedsPublicApi = (function () {
    function NeedsPublicApi(api) {
        test_lib_1.expect(api instanceof PrivateImpl).toBe(true);
    }
    NeedsPublicApi = __decorate([
        annotations_1.Directive({ selector: '[needs-public-api]' }),
        di_1.Injectable(),
        __param(0, annotations_1.Parent()), 
        __metadata('design:paramtypes', [PublicApi])
    ], NeedsPublicApi);
    return NeedsPublicApi;
})();
var ToolbarPart = (function () {
    function ToolbarPart(protoViewRef, elementRef) {
        this.elementRef = elementRef;
        this.protoViewRef = protoViewRef;
    }
    ToolbarPart = __decorate([
        annotations_1.Directive({ selector: '[toolbarpart]' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [view_ref_1.ProtoViewRef, element_ref_1.ElementRef])
    ], ToolbarPart);
    return ToolbarPart;
})();
var ToolbarViewContainer = (function () {
    function ToolbarViewContainer(vc) {
        this.vc = vc;
    }
    Object.defineProperty(ToolbarViewContainer.prototype, "toolbarVc", {
        set: function (part) {
            var view = this.vc.create(part.protoViewRef, 0, part.elementRef);
            view.setLocal('toolbarProp', 'From toolbar');
        },
        enumerable: true,
        configurable: true
    });
    ToolbarViewContainer = __decorate([
        annotations_1.Directive({ selector: '[toolbar-vc]', properties: ['toolbarVc'] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [view_container_ref_1.ViewContainerRef])
    ], ToolbarViewContainer);
    return ToolbarViewContainer;
})();
var ToolbarComponent = (function () {
    function ToolbarComponent(query) {
        this.ctxProp = 'hello world';
        this.query = query;
    }
    ToolbarComponent = __decorate([
        annotations_1.Component({ selector: 'toolbar' }),
        annotations_1.View({
            template: 'TOOLBAR(<div *ng-for="var part of query" [toolbar-vc]="part"></div>)',
            directives: [ToolbarViewContainer, ng_for_1.NgFor]
        }),
        di_1.Injectable(),
        __param(0, annotations_1.Query(ToolbarPart)), 
        __metadata('design:paramtypes', [query_list_1.QueryList])
    ], ToolbarComponent);
    return ToolbarComponent;
})();
var DirectiveWithTwoWayBinding = (function () {
    function DirectiveWithTwoWayBinding() {
        this.control = new async_1.EventEmitter();
    }
    DirectiveWithTwoWayBinding.prototype.triggerChange = function (value) { async_1.ObservableWrapper.callNext(this.control, value); };
    DirectiveWithTwoWayBinding = __decorate([
        annotations_1.Directive({ selector: '[two-way]', properties: ['value: control'], events: ['control'] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveWithTwoWayBinding);
    return DirectiveWithTwoWayBinding;
})();
var InjectableService = (function () {
    function InjectableService() {
    }
    InjectableService = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], InjectableService);
    return InjectableService;
})();
var DirectiveProvidingInjectable = (function () {
    function DirectiveProvidingInjectable() {
    }
    DirectiveProvidingInjectable = __decorate([
        annotations_1.Directive({ selector: 'directive-providing-injectable', hostInjector: [InjectableService] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveProvidingInjectable);
    return DirectiveProvidingInjectable;
})();
var DirectiveProvidingInjectableInView = (function () {
    function DirectiveProvidingInjectableInView() {
    }
    DirectiveProvidingInjectableInView = __decorate([
        annotations_1.Component({ selector: 'directive-providing-injectable', viewInjector: [InjectableService] }),
        annotations_1.View({ template: '' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveProvidingInjectableInView);
    return DirectiveProvidingInjectableInView;
})();
var DirectiveConsumingInjectable = (function () {
    function DirectiveConsumingInjectable(injectable) {
        this.injectable = injectable;
    }
    DirectiveConsumingInjectable = __decorate([
        annotations_1.Component({ selector: 'directive-consuming-injectable' }),
        annotations_1.View({ template: '' }),
        di_1.Injectable(),
        __param(0, annotations_1.Ancestor()), 
        __metadata('design:paramtypes', [InjectableService])
    ], DirectiveConsumingInjectable);
    return DirectiveConsumingInjectable;
})();
var DirectiveContainingDirectiveConsumingAnInjectable = (function () {
    function DirectiveContainingDirectiveConsumingAnInjectable() {
    }
    DirectiveContainingDirectiveConsumingAnInjectable = __decorate([
        annotations_1.Component({ selector: 'directive-containing-directive-consuming-an-injectable' }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveContainingDirectiveConsumingAnInjectable);
    return DirectiveContainingDirectiveConsumingAnInjectable;
})();
var DirectiveConsumingInjectableUnbounded = (function () {
    function DirectiveConsumingInjectableUnbounded(injectable, parent) {
        this.injectable = injectable;
        parent.directive = this;
    }
    DirectiveConsumingInjectableUnbounded = __decorate([
        annotations_1.Component({ selector: 'directive-consuming-injectable-unbounded' }),
        annotations_1.View({ template: '' }),
        di_1.Injectable(),
        __param(0, annotations_1.Unbounded()),
        __param(1, annotations_1.Ancestor()), 
        __metadata('design:paramtypes', [InjectableService, DirectiveContainingDirectiveConsumingAnInjectable])
    ], DirectiveConsumingInjectableUnbounded);
    return DirectiveConsumingInjectableUnbounded;
})();
var EventBus = (function () {
    function EventBus(parentEventBus, name) {
        this.parentEventBus = parentEventBus;
        this.name = name;
    }
    EventBus = __decorate([
        lang_1.CONST(), 
        __metadata('design:paramtypes', [EventBus, String])
    ], EventBus);
    return EventBus;
})();
var GrandParentProvidingEventBus = (function () {
    function GrandParentProvidingEventBus(bus) {
        this.bus = bus;
    }
    GrandParentProvidingEventBus = __decorate([
        annotations_1.Directive({
            selector: 'grand-parent-providing-event-bus',
            hostInjector: [new di_1.Binding(EventBus, { toValue: new EventBus(null, "grandparent") })]
        }), 
        __metadata('design:paramtypes', [EventBus])
    ], GrandParentProvidingEventBus);
    return GrandParentProvidingEventBus;
})();
function createParentBusHost(peb) {
    return new EventBus(peb, "parent");
}
function createParentBusView(p) {
    return p.bus;
}
var ParentProvidingEventBus = (function () {
    function ParentProvidingEventBus(bus, grandParentBus) {
        // constructor(bus: EventBus) {
        this.bus = bus;
        this.grandParentBus = grandParentBus;
    }
    ParentProvidingEventBus = __decorate([
        annotations_1.Component({
            selector: 'parent-providing-event-bus',
            hostInjector: [new di_1.Binding(EventBus, { toFactory: createParentBusHost, deps: [[EventBus, new visAnn.Unbounded()]] })],
            viewInjector: [new di_1.Binding(EventBus, { toFactory: createParentBusView, deps: [[di_1.FORWARD_REF(function () { return ParentProvidingEventBus; })]] })]
        }),
        annotations_1.View({
            directives: [di_1.FORWARD_REF(function () { return ChildConsumingEventBus; })],
            template: "\n    <child-consuming-event-bus></child-consuming-event-bus>\n  "
        }),
        __param(1, annotations_1.Unbounded()), 
        __metadata('design:paramtypes', [EventBus, EventBus])
    ], ParentProvidingEventBus);
    return ParentProvidingEventBus;
})();
var ChildConsumingEventBus = (function () {
    function ChildConsumingEventBus(bus) {
        this.bus = bus;
    }
    ChildConsumingEventBus = __decorate([
        annotations_1.Directive({ selector: 'child-consuming-event-bus' }),
        __param(0, annotations_1.Unbounded()), 
        __metadata('design:paramtypes', [EventBus])
    ], ChildConsumingEventBus);
    return ChildConsumingEventBus;
})();
//# sourceMappingURL=integration_spec.js.map