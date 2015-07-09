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
// TODO(tbosch): clang-format screws this up, see https://github.com/angular/clang-format/issues/11.
// Enable clang-format here again when this is fixed.
// clang-format off
var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var element_injector_1 = require('angular2/src/core/compiler/element_injector');
var dirAnn = require('angular2/src/core/annotations_impl/annotations');
var annotations_1 = require('angular2/annotations');
var ngDiAnn = require('angular2/src/core/annotations_impl/visibility');
var di_1 = require('angular2/di');
var diAnn = require('angular2/src/di/annotations_impl');
var view_1 = require('angular2/src/core/compiler/view');
var view_container_ref_1 = require('angular2/src/core/compiler/view_container_ref');
var view_ref_1 = require('angular2/src/core/compiler/view_ref');
var element_ref_1 = require('angular2/src/core/compiler/element_ref');
var change_detection_1 = require('angular2/change_detection');
var api_1 = require('angular2/src/render/api');
var query_list_1 = require('angular2/src/core/compiler/query_list');
var DummyView = (function (_super) {
    __extends(DummyView, _super);
    function DummyView() {
        _super.call(this);
        this.componentChildViews = [];
        this.changeDetector = null;
    }
    DummyView.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    DummyView = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(view_1.AppView), 
        __metadata('design:paramtypes', [])
    ], DummyView);
    return DummyView;
})(test_lib_1.SpyObject);
var SimpleDirective = (function () {
    function SimpleDirective() {
    }
    return SimpleDirective;
})();
var SimpleService = (function () {
    function SimpleService() {
    }
    return SimpleService;
})();
var SomeOtherDirective = (function () {
    function SomeOtherDirective() {
    }
    return SomeOtherDirective;
})();
var _constructionCount = 0;
var CountingDirective = (function () {
    function CountingDirective() {
        this.count = _constructionCount;
        _constructionCount += 1;
    }
    return CountingDirective;
})();
var FancyCountingDirective = (function (_super) {
    __extends(FancyCountingDirective, _super);
    function FancyCountingDirective() {
        _super.call(this);
    }
    return FancyCountingDirective;
})(CountingDirective);
var NeedsDirective = (function () {
    function NeedsDirective(dependency) {
        this.dependency = dependency;
    }
    NeedsDirective = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [SimpleDirective])
    ], NeedsDirective);
    return NeedsDirective;
})();
var OptionallyNeedsDirective = (function () {
    function OptionallyNeedsDirective(dependency) {
        this.dependency = dependency;
    }
    OptionallyNeedsDirective = __decorate([
        di_1.Injectable(),
        __param(0, di_1.Optional()), 
        __metadata('design:paramtypes', [SimpleDirective])
    ], OptionallyNeedsDirective);
    return OptionallyNeedsDirective;
})();
var NeedsDirectiveFromParent = (function () {
    function NeedsDirectiveFromParent(dependency) {
        this.dependency = dependency;
    }
    NeedsDirectiveFromParent = __decorate([
        di_1.Injectable(),
        __param(0, annotations_1.Parent()), 
        __metadata('design:paramtypes', [SimpleDirective])
    ], NeedsDirectiveFromParent);
    return NeedsDirectiveFromParent;
})();
var NeedsDirectiveFromParentOrSelf = (function () {
    function NeedsDirectiveFromParentOrSelf(dependency) {
        this.dependency = dependency;
    }
    NeedsDirectiveFromParentOrSelf = __decorate([
        di_1.Injectable(),
        __param(0, annotations_1.Parent({ self: true })), 
        __metadata('design:paramtypes', [SimpleDirective])
    ], NeedsDirectiveFromParentOrSelf);
    return NeedsDirectiveFromParentOrSelf;
})();
var NeedsDirectiveFromAncestor = (function () {
    function NeedsDirectiveFromAncestor(dependency) {
        this.dependency = dependency;
    }
    NeedsDirectiveFromAncestor = __decorate([
        di_1.Injectable(),
        __param(0, annotations_1.Ancestor()), 
        __metadata('design:paramtypes', [SimpleDirective])
    ], NeedsDirectiveFromAncestor);
    return NeedsDirectiveFromAncestor;
})();
var NeedsDirectiveFromAnAncestorShadowDom = (function () {
    function NeedsDirectiveFromAnAncestorShadowDom(dependency) {
        this.dependency = dependency;
    }
    NeedsDirectiveFromAnAncestorShadowDom = __decorate([
        di_1.Injectable(),
        __param(0, annotations_1.Unbounded()), 
        __metadata('design:paramtypes', [SimpleDirective])
    ], NeedsDirectiveFromAnAncestorShadowDom);
    return NeedsDirectiveFromAnAncestorShadowDom;
})();
var NeedsService = (function () {
    function NeedsService(service) {
        this.service = service;
    }
    NeedsService = __decorate([
        di_1.Injectable(),
        __param(0, di_1.Inject("service")), 
        __metadata('design:paramtypes', [Object])
    ], NeedsService);
    return NeedsService;
})();
var HasEventEmitter = (function () {
    function HasEventEmitter() {
        this.emitter = "emitter";
    }
    return HasEventEmitter;
})();
var HasHostAction = (function () {
    function HasHostAction() {
        this.hostActionName = "hostAction";
    }
    return HasHostAction;
})();
var NeedsAttribute = (function () {
    function NeedsAttribute(typeAttribute, titleAttribute, fooAttribute) {
        this.typeAttribute = typeAttribute;
        this.titleAttribute = titleAttribute;
        this.fooAttribute = fooAttribute;
    }
    NeedsAttribute = __decorate([
        __param(0, annotations_1.Attribute('type')),
        __param(1, annotations_1.Attribute('title')),
        __param(2, annotations_1.Attribute('foo')), 
        __metadata('design:paramtypes', [String, String, String])
    ], NeedsAttribute);
    return NeedsAttribute;
})();
var NeedsAttributeNoType = (function () {
    function NeedsAttributeNoType(fooAttribute) {
        this.fooAttribute = fooAttribute;
    }
    NeedsAttributeNoType = __decorate([
        di_1.Injectable(),
        __param(0, annotations_1.Attribute('foo')), 
        __metadata('design:paramtypes', [Object])
    ], NeedsAttributeNoType);
    return NeedsAttributeNoType;
})();
var NeedsQuery = (function () {
    function NeedsQuery(query) {
        this.query = query;
    }
    NeedsQuery = __decorate([
        di_1.Injectable(),
        __param(0, annotations_1.Query(CountingDirective)), 
        __metadata('design:paramtypes', [query_list_1.QueryList])
    ], NeedsQuery);
    return NeedsQuery;
})();
var NeedsElementRef = (function () {
    function NeedsElementRef(ref) {
        this.elementRef = ref;
    }
    NeedsElementRef = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [element_ref_1.ElementRef])
    ], NeedsElementRef);
    return NeedsElementRef;
})();
var NeedsViewContainer = (function () {
    function NeedsViewContainer(vc) {
        this.viewContainer = vc;
    }
    NeedsViewContainer = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [view_container_ref_1.ViewContainerRef])
    ], NeedsViewContainer);
    return NeedsViewContainer;
})();
var NeedsProtoViewRef = (function () {
    function NeedsProtoViewRef(ref) {
        this.protoViewRef = ref;
    }
    NeedsProtoViewRef = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [view_ref_1.ProtoViewRef])
    ], NeedsProtoViewRef);
    return NeedsProtoViewRef;
})();
var OptionallyInjectsProtoViewRef = (function () {
    function OptionallyInjectsProtoViewRef(ref) {
        this.protoViewRef = ref;
    }
    OptionallyInjectsProtoViewRef = __decorate([
        di_1.Injectable(),
        __param(0, di_1.Optional()), 
        __metadata('design:paramtypes', [view_ref_1.ProtoViewRef])
    ], OptionallyInjectsProtoViewRef);
    return OptionallyInjectsProtoViewRef;
})();
var NeedsChangeDetectorRef = (function () {
    function NeedsChangeDetectorRef(cdr) {
        this.changeDetectorRef = cdr;
    }
    NeedsChangeDetectorRef = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [change_detection_1.ChangeDetectorRef])
    ], NeedsChangeDetectorRef);
    return NeedsChangeDetectorRef;
})();
var A_Needs_B = (function () {
    function A_Needs_B(dep) {
    }
    return A_Needs_B;
})();
var B_Needs_A = (function () {
    function B_Needs_A(dep) {
    }
    return B_Needs_A;
})();
var DirectiveWithDestroy = (function () {
    function DirectiveWithDestroy() {
        this.onDestroyCounter = 0;
    }
    DirectiveWithDestroy.prototype.onDestroy = function () { this.onDestroyCounter++; };
    return DirectiveWithDestroy;
})();
var TestNode = (function (_super) {
    __extends(TestNode, _super);
    function TestNode(parent, message) {
        _super.call(this, parent);
        this.message = message;
    }
    TestNode.prototype.toString = function () { return this.message; };
    return TestNode;
})(element_injector_1.TreeNode);
function main() {
    var defaultPreBuiltObjects = new element_injector_1.PreBuiltObjects(null, null, null);
    var appInjector = di_1.Injector.resolveAndCreate([]);
    // An injector with more than 10 bindings will switch to the dynamic strategy
    var dynamicBindings = [];
    for (var i = 0; i < 20; i++) {
        collection_1.ListWrapper.push(dynamicBindings, di_1.bind(i).toValue(i));
    }
    function createPei(parent, index, bindings, distance, hasShadowRoot) {
        if (distance === void 0) { distance = 1; }
        if (hasShadowRoot === void 0) { hasShadowRoot = false; }
        var directiveBinding = collection_1.ListWrapper.map(bindings, function (b) {
            if (b instanceof element_injector_1.DirectiveBinding)
                return b;
            if (b instanceof di_1.Binding)
                return element_injector_1.DirectiveBinding.createFromBinding(b, null);
            return element_injector_1.DirectiveBinding.createFromType(b, null);
        });
        return element_injector_1.ProtoElementInjector.create(parent, index, directiveBinding, hasShadowRoot, distance);
    }
    function humanize(tree, names) {
        var lookupName = function (item) {
            return collection_1.ListWrapper.last(collection_1.ListWrapper.find(names, function (pair) { return pair[0] === item; }));
        };
        if (tree.children.length == 0)
            return lookupName(tree);
        var children = tree.children.map(function (m) { return humanize(m, names); });
        return [lookupName(tree), children];
    }
    function injector(bindings, lightDomAppInjector, isComponent, preBuiltObjects, attributes) {
        if (lightDomAppInjector === void 0) { lightDomAppInjector = null; }
        if (isComponent === void 0) { isComponent = false; }
        if (preBuiltObjects === void 0) { preBuiltObjects = null; }
        if (attributes === void 0) { attributes = null; }
        if (lang_1.isBlank(lightDomAppInjector))
            lightDomAppInjector = appInjector;
        var proto = createPei(null, 0, bindings, 0, isComponent);
        proto.attributes = attributes;
        var inj = proto.instantiate(null);
        var preBuilt = lang_1.isPresent(preBuiltObjects) ? preBuiltObjects : defaultPreBuiltObjects;
        inj.hydrate(lightDomAppInjector, null, preBuilt);
        return inj;
    }
    function parentChildInjectors(parentBindings, childBindings, parentPreBuildObjects) {
        if (parentPreBuildObjects === void 0) { parentPreBuildObjects = null; }
        if (lang_1.isBlank(parentPreBuildObjects))
            parentPreBuildObjects = defaultPreBuiltObjects;
        var inj = di_1.Injector.resolveAndCreate([]);
        var protoParent = createPei(null, 0, parentBindings);
        var parent = protoParent.instantiate(null);
        parent.hydrate(inj, null, parentPreBuildObjects);
        var protoChild = createPei(protoParent, 1, childBindings, 1, false);
        var child = protoChild.instantiate(parent);
        child.hydrate(inj, null, defaultPreBuiltObjects);
        return child;
    }
    function hostShadowInjectors(hostBindings, shadowBindings) {
        var inj = di_1.Injector.resolveAndCreate([]);
        var protoHost = createPei(null, 0, hostBindings, 0, true);
        var host = protoHost.instantiate(null);
        host.hydrate(inj, null, defaultPreBuiltObjects);
        var protoShadow = createPei(null, 0, shadowBindings, 0, false);
        var shadow = protoShadow.instantiate(null);
        shadow.hydrate(host.getShadowDomAppInjector(), host, null);
        return shadow;
    }
    test_lib_1.describe('TreeNodes', function () {
        var root, firstParent, lastParent, node;
        /*
         Build a tree of the following shape:
         root
          - p1
             - c1
             - c2
          - p2
            - c3
         */
        test_lib_1.beforeEach(function () {
            root = new TestNode(null, 'root');
            var p1 = firstParent = new TestNode(root, 'p1');
            var p2 = lastParent = new TestNode(root, 'p2');
            node = new TestNode(p1, 'c1');
            new TestNode(p1, 'c2');
            new TestNode(p2, 'c3');
        });
        // depth-first pre-order.
        function walk(node, f) {
            if (lang_1.isBlank(node))
                return f;
            f(node);
            collection_1.ListWrapper.forEach(node.children, function (n) { return walk(n, f); });
        }
        function logWalk(node) {
            var log = '';
            walk(node, function (n) { log += (log.length != 0 ? ', ' : '') + n.toString(); });
            return log;
        }
        test_lib_1.it('should support listing children', function () { test_lib_1.expect(logWalk(root)).toEqual('root, p1, c1, c2, p2, c3'); });
        test_lib_1.it('should support removing the first child node', function () {
            firstParent.remove();
            test_lib_1.expect(firstParent.parent).toEqual(null);
            test_lib_1.expect(logWalk(root)).toEqual('root, p2, c3');
        });
        test_lib_1.it('should support removing the last child node', function () {
            lastParent.remove();
            test_lib_1.expect(logWalk(root)).toEqual('root, p1, c1, c2');
        });
        test_lib_1.it('should support moving a node at the end of children', function () {
            node.remove();
            root.addChild(node);
            test_lib_1.expect(logWalk(root)).toEqual('root, p1, c2, p2, c3, c1');
        });
        test_lib_1.it('should support moving a node in the beginning of children', function () {
            node.remove();
            lastParent.addChildAfter(node, null);
            test_lib_1.expect(logWalk(root)).toEqual('root, p1, c2, p2, c1, c3');
        });
        test_lib_1.it('should support moving a node in the middle of children', function () {
            node.remove();
            lastParent.addChildAfter(node, firstParent);
            test_lib_1.expect(logWalk(root)).toEqual('root, p1, c2, c1, p2, c3');
        });
    });
    test_lib_1.describe("ProtoElementInjector", function () {
        test_lib_1.describe("direct parent", function () {
            test_lib_1.it("should return parent proto injector when distance is 1", function () {
                var distance = 1;
                var protoParent = createPei(null, 0, []);
                var protoChild = createPei(protoParent, 0, [], distance, false);
                test_lib_1.expect(protoChild.directParent()).toEqual(protoParent);
            });
            test_lib_1.it("should return null otherwise", function () {
                var distance = 2;
                var protoParent = createPei(null, 0, []);
                var protoChild = createPei(protoParent, 0, [], distance, false);
                test_lib_1.expect(protoChild.directParent()).toEqual(null);
            });
        });
        test_lib_1.describe('inline strategy', function () {
            test_lib_1.it("should allow for direct access using getBindingAtIndex", function () {
                var proto = createPei(null, 0, [di_1.bind(SimpleDirective).toClass(SimpleDirective)]);
                test_lib_1.expect(proto.getBindingAtIndex(0)).toBeAnInstanceOf(element_injector_1.DirectiveBinding);
                test_lib_1.expect(function () { return proto.getBindingAtIndex(-1); }).toThrowError('Index -1 is out-of-bounds.');
                test_lib_1.expect(function () { return proto.getBindingAtIndex(10); }).toThrowError('Index 10 is out-of-bounds.');
            });
        });
        test_lib_1.describe('dynamic strategy', function () {
            test_lib_1.it("should allow for direct access using getBindingAtIndex", function () {
                var proto = createPei(null, 0, dynamicBindings);
                test_lib_1.expect(proto.getBindingAtIndex(0)).toBeAnInstanceOf(element_injector_1.DirectiveBinding);
                test_lib_1.expect(function () { return proto.getBindingAtIndex(-1); }).toThrowError('Index -1 is out-of-bounds.');
                test_lib_1.expect(function () { return proto.getBindingAtIndex(dynamicBindings.length - 1); }).not.toThrow();
                test_lib_1.expect(function () { return proto.getBindingAtIndex(dynamicBindings.length); })
                    .toThrowError("Index " + dynamicBindings.length + " is out-of-bounds.");
            });
        });
        test_lib_1.describe('event emitters', function () {
            test_lib_1.it('should return a list of event accessors', function () {
                var binding = element_injector_1.DirectiveBinding.createFromType(HasEventEmitter, new dirAnn.Directive({ events: ['emitter'] }));
                var inj = createPei(null, 0, [binding]);
                test_lib_1.expect(inj.eventEmitterAccessors.length).toEqual(1);
                var accessor = inj.eventEmitterAccessors[0][0];
                test_lib_1.expect(accessor.eventName).toEqual('emitter');
                test_lib_1.expect(accessor.getter(new HasEventEmitter())).toEqual('emitter');
            });
            test_lib_1.it('should return a list of hostAction accessors', function () {
                var binding = element_injector_1.DirectiveBinding.createFromType(HasEventEmitter, new dirAnn.Directive({ hostActions: { 'hostActionName': 'onAction' } }));
                var inj = createPei(null, 0, [binding]);
                test_lib_1.expect(inj.hostActionAccessors.length).toEqual(1);
                var accessor = inj.hostActionAccessors[0][0];
                test_lib_1.expect(accessor.actionExpression).toEqual('onAction');
                test_lib_1.expect(accessor.getter(new HasHostAction())).toEqual('hostAction');
            });
        });
        test_lib_1.describe(".create", function () {
            test_lib_1.it("should collect hostInjector injectables from all directives", function () {
                var pei = createPei(null, 0, [
                    element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component({ hostInjector: [di_1.bind('injectable1').toValue('injectable1')] })),
                    element_injector_1.DirectiveBinding.createFromType(SomeOtherDirective, new dirAnn.Component({
                        hostInjector: [di_1.bind('injectable2').toValue('injectable2')]
                    }))
                ]);
                test_lib_1.expect(pei.getBindingAtIndex(0).key.token).toBe(SimpleDirective);
                test_lib_1.expect(pei.getBindingAtIndex(1).key.token).toBe(SomeOtherDirective);
                test_lib_1.expect(pei.getBindingAtIndex(2).key.token).toEqual("injectable1");
                test_lib_1.expect(pei.getBindingAtIndex(3).key.token).toEqual("injectable2");
            });
            test_lib_1.it("should collect viewInjector injectables from the component", function () {
                var pei = createPei(null, 0, [element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component({
                        viewInjector: [di_1.bind('injectable1').toValue('injectable1')]
                    }))], 0, true);
                test_lib_1.expect(pei.getBindingAtIndex(0).key.token).toBe(SimpleDirective);
                test_lib_1.expect(pei.getBindingAtIndex(1).key.token).toEqual("injectable1");
            });
            test_lib_1.it('should support an arbitrary number of bindings', function () {
                var pei = createPei(null, 0, dynamicBindings);
                for (var i = 0; i < dynamicBindings.length; i++) {
                    test_lib_1.expect(pei.getBindingAtIndex(i).key.token).toBe(i);
                }
            });
        });
    });
    test_lib_1.describe("ElementInjector", function () {
        test_lib_1.describe("instantiate", function () {
            test_lib_1.it("should create an element injector", function () {
                var protoParent = createPei(null, 0, []);
                var protoChild1 = createPei(protoParent, 1, []);
                var protoChild2 = createPei(protoParent, 2, []);
                var p = protoParent.instantiate(null);
                var c1 = protoChild1.instantiate(p);
                var c2 = protoChild2.instantiate(p);
                test_lib_1.expect(humanize(p, [[p, 'parent'], [c1, 'child1'], [c2, 'child2']]))
                    .toEqual(["parent", ["child1", "child2"]]);
            });
            test_lib_1.describe("direct parent", function () {
                test_lib_1.it("should return parent injector when distance is 1", function () {
                    var distance = 1;
                    var protoParent = createPei(null, 0, []);
                    var protoChild = createPei(protoParent, 1, [], distance);
                    var p = protoParent.instantiate(null);
                    var c = protoChild.instantiate(p);
                    test_lib_1.expect(c.directParent()).toEqual(p);
                });
                test_lib_1.it("should return null otherwise", function () {
                    var distance = 2;
                    var protoParent = createPei(null, 0, []);
                    var protoChild = createPei(protoParent, 1, [], distance);
                    var p = protoParent.instantiate(null);
                    var c = protoChild.instantiate(p);
                    test_lib_1.expect(c.directParent()).toEqual(null);
                });
            });
        });
        test_lib_1.describe("hasBindings", function () {
            test_lib_1.it("should be true when there are bindings", function () {
                var p = createPei(null, 0, [SimpleDirective]);
                test_lib_1.expect(p.hasBindings).toBeTruthy();
            });
            test_lib_1.it("should be false otherwise", function () {
                var p = createPei(null, 0, []);
                test_lib_1.expect(p.hasBindings).toBeFalsy();
            });
        });
        test_lib_1.describe("hasInstances", function () {
            test_lib_1.it("should be false when no directives are instantiated", function () { test_lib_1.expect(injector([]).hasInstances()).toBe(false); });
            test_lib_1.it("should be true when directives are instantiated", function () { test_lib_1.expect(injector([SimpleDirective]).hasInstances()).toBe(true); });
        });
        [{ strategy: 'inline', bindings: [] }, { strategy: 'dynamic',
                bindings: dynamicBindings }].forEach(function (context) {
            var extraBindings = context['bindings'];
            test_lib_1.describe(context['strategy'] + " strategy", function () {
                test_lib_1.describe("hydrate", function () {
                    test_lib_1.it("should instantiate directives that have no dependencies", function () {
                        var bindings = collection_1.ListWrapper.concat([SimpleDirective], extraBindings);
                        var inj = injector(bindings);
                        test_lib_1.expect(inj.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should instantiate directives that depend on an arbitrary number of directives", function () {
                        var bindings = collection_1.ListWrapper.concat([SimpleDirective, NeedsDirective], extraBindings);
                        var inj = injector(bindings);
                        var d = inj.get(NeedsDirective);
                        test_lib_1.expect(d).toBeAnInstanceOf(NeedsDirective);
                        test_lib_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should instantiate hostInjector injectables that have dependencies with set visibility", function () {
                        var childInj = parentChildInjectors(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component({
                                hostInjector: [di_1.bind('injectable1').toValue('injectable1')]
                            }))], extraBindings), [element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component({
                                hostInjector: [
                                    di_1.bind('injectable1')
                                        .toValue('new-injectable1'),
                                    di_1.bind('injectable2')
                                        .toFactory(function (val) { return (val + "-injectable2"); }, [[new diAnn.Inject('injectable1'), new ngDiAnn.Parent()]])
                                ]
                            }))]);
                        test_lib_1.expect(childInj.get('injectable2')).toEqual('injectable1-injectable2');
                    });
                    test_lib_1.it("should instantiate components that depends on viewInjector dependencies", function () {
                        var inj = injector([element_injector_1.DirectiveBinding.createFromType(NeedsService, new dirAnn.Component({ viewInjector: [di_1.bind('service').toValue('service')] }))], null, true);
                        test_lib_1.expect(inj.get(NeedsService).service).toEqual('service');
                    });
                    test_lib_1.it("should instantiate hostInjector injectables that have dependencies", function () {
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Directive({
                                hostInjector: [
                                    di_1.bind('injectable1')
                                        .toValue('injectable1'),
                                    di_1.bind('injectable2')
                                        .toFactory(function (val) { return (val + "-injectable2"); }, ['injectable1'])
                                ]
                            }))], extraBindings));
                        test_lib_1.expect(inj.get('injectable2')).toEqual('injectable1-injectable2');
                    });
                    test_lib_1.it("should instantiate components that depends on viewInjector dependencies", function () {
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(NeedsService, new dirAnn.Component({
                                viewInjector: [di_1.bind('service').toValue('service')]
                            }))], extraBindings), null, true);
                        test_lib_1.expect(inj.get(NeedsService).service).toEqual('service');
                    });
                    test_lib_1.it("should instantiate directives that depend on app services", function () {
                        var appInjector = di_1.Injector.resolveAndCreate(collection_1.ListWrapper.concat([di_1.bind("service").toValue("service")], extraBindings));
                        var inj = injector([NeedsService], appInjector);
                        var d = inj.get(NeedsService);
                        test_lib_1.expect(d).toBeAnInstanceOf(NeedsService);
                        test_lib_1.expect(d.service).toEqual("service");
                    });
                    test_lib_1.it("should instantiate directives that depend on pre built objects", function () {
                        var protoView = new view_1.AppProtoView(null, null, null);
                        var bindings = collection_1.ListWrapper.concat([NeedsProtoViewRef], extraBindings);
                        var inj = injector(bindings, null, false, new element_injector_1.PreBuiltObjects(null, null, protoView));
                        test_lib_1.expect(inj.get(NeedsProtoViewRef).protoViewRef).toEqual(new view_ref_1.ProtoViewRef(protoView));
                    });
                    test_lib_1.it("should return app services", function () {
                        var appInjector = di_1.Injector.resolveAndCreate(collection_1.ListWrapper.concat([di_1.bind("service").toValue("service")], extraBindings));
                        var inj = injector([], appInjector);
                        test_lib_1.expect(inj.get('service')).toEqual('service');
                    });
                    test_lib_1.it("should get directives from parent", function () {
                        var child = parentChildInjectors(collection_1.ListWrapper.concat([SimpleDirective], extraBindings), [NeedsDirectiveFromParent]);
                        var d = child.get(NeedsDirectiveFromParent);
                        test_lib_1.expect(d).toBeAnInstanceOf(NeedsDirectiveFromParent);
                        test_lib_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should not return parent's directives on self by default", function () {
                        test_lib_1.expect(function () {
                            injector(collection_1.ListWrapper.concat([SimpleDirective, NeedsDirectiveFromParent], extraBindings));
                        }).toThrowError(test_lib_1.containsRegexp("No provider for " + lang_1.stringify(SimpleDirective)));
                    });
                    test_lib_1.it("should return parent's directives on self when explicitly specified", function () {
                        var inj = injector(collection_1.ListWrapper.concat([SimpleDirective, NeedsDirectiveFromParentOrSelf], extraBindings));
                        var d = inj.get(NeedsDirectiveFromParentOrSelf);
                        test_lib_1.expect(d).toBeAnInstanceOf(NeedsDirectiveFromParentOrSelf);
                        test_lib_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should get directives from ancestor", function () {
                        var child = parentChildInjectors(collection_1.ListWrapper.concat([SimpleDirective], extraBindings), [NeedsDirectiveFromAncestor]);
                        var d = child.get(NeedsDirectiveFromAncestor);
                        test_lib_1.expect(d).toBeAnInstanceOf(NeedsDirectiveFromAncestor);
                        test_lib_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should get directives crossing the boundaries", function () {
                        var child = hostShadowInjectors(collection_1.ListWrapper.concat([SomeOtherDirective, SimpleDirective], extraBindings), [NeedsDirectiveFromAnAncestorShadowDom]);
                        var d = child.get(NeedsDirectiveFromAnAncestorShadowDom);
                        test_lib_1.expect(d).toBeAnInstanceOf(NeedsDirectiveFromAnAncestorShadowDom);
                        test_lib_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should throw when a depenency cannot be resolved", function () {
                        test_lib_1.expect(function () { return injector(collection_1.ListWrapper.concat([NeedsDirectiveFromParent], extraBindings)); })
                            .toThrowError(test_lib_1.containsRegexp("No provider for " + lang_1.stringify(SimpleDirective) + "! (" + lang_1.stringify(NeedsDirectiveFromParent) + " -> " + lang_1.stringify(SimpleDirective) + ")"));
                    });
                    test_lib_1.it("should inject null when an optional dependency cannot be resolved", function () {
                        var inj = injector(collection_1.ListWrapper.concat([OptionallyNeedsDirective], extraBindings));
                        var d = inj.get(OptionallyNeedsDirective);
                        test_lib_1.expect(d.dependency).toEqual(null);
                    });
                    test_lib_1.it("should accept bindings instead types", function () {
                        var inj = injector(collection_1.ListWrapper.concat([di_1.bind(SimpleDirective).toClass(SimpleDirective)], extraBindings));
                        test_lib_1.expect(inj.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should allow for direct access using getDirectiveAtIndex", function () {
                        var bindings = collection_1.ListWrapper.concat([di_1.bind(SimpleDirective).toClass(SimpleDirective)], extraBindings);
                        var inj = injector(bindings);
                        var firsIndexOut = bindings.length > 10 ? bindings.length : 10;
                        test_lib_1.expect(inj.getDirectiveAtIndex(0)).toBeAnInstanceOf(SimpleDirective);
                        test_lib_1.expect(function () { return inj.getDirectiveAtIndex(-1); }).toThrowError('Index -1 is out-of-bounds.');
                        test_lib_1.expect(function () { return inj.getDirectiveAtIndex(firsIndexOut); })
                            .toThrowError("Index " + firsIndexOut + " is out-of-bounds.");
                    });
                    test_lib_1.describe("shadow DOM components", function () {
                        test_lib_1.it("should instantiate directives that depend on the containing component", function () {
                            var directiveBinding = element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Component());
                            var shadow = hostShadowInjectors(collection_1.ListWrapper.concat([directiveBinding], extraBindings), [NeedsDirective]);
                            var d = shadow.get(NeedsDirective);
                            test_lib_1.expect(d).toBeAnInstanceOf(NeedsDirective);
                            test_lib_1.expect(d.dependency).toBeAnInstanceOf(SimpleDirective);
                        });
                        test_lib_1.it("should not instantiate directives that depend on other directives in the containing component's ElementInjector", function () {
                            var directiveBinding = element_injector_1.DirectiveBinding.createFromType(SomeOtherDirective, new dirAnn.Component());
                            test_lib_1.expect(function () {
                                hostShadowInjectors(collection_1.ListWrapper.concat([directiveBinding, SimpleDirective], extraBindings), [NeedsDirective]);
                            })
                                .toThrowError(test_lib_1.containsRegexp("No provider for " + lang_1.stringify(SimpleDirective) + "! (" + lang_1.stringify(NeedsDirective) + " -> " + lang_1.stringify(SimpleDirective) + ")"));
                        });
                        test_lib_1.it("should instantiate component directives that depend on app services in the shadow app injector", function () {
                            var directiveAnnotation = new dirAnn.Component({
                                appInjector: collection_1.ListWrapper.concat([di_1.bind("service").toValue("service")], extraBindings)
                            });
                            var componentDirective = element_injector_1.DirectiveBinding.createFromType(NeedsService, directiveAnnotation);
                            var inj = injector([componentDirective], null, true);
                            var d = inj.get(NeedsService);
                            test_lib_1.expect(d).toBeAnInstanceOf(NeedsService);
                            test_lib_1.expect(d.service).toEqual("service");
                        });
                        test_lib_1.it("should not instantiate other directives that depend on app services in the shadow app injector", function () {
                            var directiveAnnotation = new dirAnn.Component({
                                appInjector: collection_1.ListWrapper.concat([di_1.bind("service").toValue("service")], extraBindings)
                            });
                            var componentDirective = element_injector_1.DirectiveBinding.createFromType(SimpleDirective, directiveAnnotation);
                            test_lib_1.expect(function () { injector([componentDirective, NeedsService], null); })
                                .toThrowError(test_lib_1.containsRegexp("No provider for service! (" + lang_1.stringify(NeedsService) + " -> service)"));
                        });
                    });
                });
                test_lib_1.describe("lifecycle", function () {
                    test_lib_1.it("should call onDestroy on directives subscribed to this event", function () {
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(DirectiveWithDestroy, new dirAnn.Directive({ lifecycle: [annotations_1.onDestroy] }))], extraBindings));
                        var destroy = inj.get(DirectiveWithDestroy);
                        inj.dehydrate();
                        test_lib_1.expect(destroy.onDestroyCounter).toBe(1);
                    });
                    test_lib_1.it("should work with services", function () {
                        var inj = injector(collection_1.ListWrapper.concat([element_injector_1.DirectiveBinding.createFromType(SimpleDirective, new dirAnn.Directive({ hostInjector: [SimpleService] }))], extraBindings));
                        inj.dehydrate();
                    });
                });
                test_lib_1.describe("dynamicallyCreateComponent", function () {
                    test_lib_1.it("should create a component dynamically", function () {
                        var inj = injector(extraBindings);
                        inj.dynamicallyCreateComponent(element_injector_1.DirectiveBinding.createFromType(SimpleDirective, null), appInjector);
                        test_lib_1.expect(inj.getDynamicallyLoadedComponent()).toBeAnInstanceOf(SimpleDirective);
                        test_lib_1.expect(inj.get(SimpleDirective)).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should inject parent dependencies into the dynamically-loaded component", function () {
                        var inj = parentChildInjectors(collection_1.ListWrapper.concat([SimpleDirective], extraBindings), []);
                        inj.dynamicallyCreateComponent(element_injector_1.DirectiveBinding.createFromType(NeedsDirectiveFromAncestor, null), appInjector);
                        test_lib_1.expect(inj.getDynamicallyLoadedComponent()).toBeAnInstanceOf(NeedsDirectiveFromAncestor);
                        test_lib_1.expect(inj.getDynamicallyLoadedComponent().dependency).toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should not inject the proxy component into the children of the dynamically-loaded component", function () {
                        var injWithDynamicallyLoadedComponent = injector([SimpleDirective]);
                        injWithDynamicallyLoadedComponent.dynamicallyCreateComponent(element_injector_1.DirectiveBinding.createFromType(SomeOtherDirective, null), appInjector);
                        var shadowDomProtoInjector = createPei(null, 0, collection_1.ListWrapper.concat([NeedsDirectiveFromAncestor], extraBindings));
                        var shadowDomInj = shadowDomProtoInjector.instantiate(null);
                        test_lib_1.expect(function () { return shadowDomInj.hydrate(appInjector, injWithDynamicallyLoadedComponent, defaultPreBuiltObjects); })
                            .toThrowError(test_lib_1.containsRegexp("No provider for " + lang_1.stringify(SimpleDirective)));
                    });
                    test_lib_1.it("should not inject the dynamically-loaded component into directives on the same element", function () {
                        var dynamicComp = element_injector_1.DirectiveBinding.createFromType(SomeOtherDirective, new dirAnn.Component());
                        var proto = createPei(null, 0, collection_1.ListWrapper.concat([dynamicComp, NeedsDirective], extraBindings), 1, true);
                        var inj = proto.instantiate(null);
                        inj.dynamicallyCreateComponent(element_injector_1.DirectiveBinding.createFromType(SimpleDirective, null), appInjector);
                        test_lib_1.expect(function () { return inj.hydrate(di_1.Injector.resolveAndCreate([]), null, null); })
                            .toThrowError("No provider for SimpleDirective! (" + lang_1.stringify(NeedsDirective) + " -> " + lang_1.stringify(SimpleDirective) + ")");
                    });
                    test_lib_1.it("should inject the dynamically-loaded component into the children of the dynamically-loaded component", function () {
                        var componentDirective = element_injector_1.DirectiveBinding.createFromType(SimpleDirective, null);
                        var injWithDynamicallyLoadedComponent = injector([]);
                        injWithDynamicallyLoadedComponent.dynamicallyCreateComponent(componentDirective, appInjector);
                        var shadowDomProtoInjector = createPei(null, 0, collection_1.ListWrapper.concat([NeedsDirectiveFromAncestor], extraBindings));
                        var shadowDomInjector = shadowDomProtoInjector.instantiate(null);
                        shadowDomInjector.hydrate(appInjector, injWithDynamicallyLoadedComponent, defaultPreBuiltObjects);
                        test_lib_1.expect(shadowDomInjector.get(NeedsDirectiveFromAncestor))
                            .toBeAnInstanceOf(NeedsDirectiveFromAncestor);
                        test_lib_1.expect(shadowDomInjector.get(NeedsDirectiveFromAncestor).dependency)
                            .toBeAnInstanceOf(SimpleDirective);
                    });
                    test_lib_1.it("should remove the dynamically-loaded component when dehydrating", function () {
                        var inj = injector(extraBindings);
                        inj.dynamicallyCreateComponent(element_injector_1.DirectiveBinding.createFromType(DirectiveWithDestroy, new dirAnn.Directive({ lifecycle: [annotations_1.onDestroy] })), appInjector);
                        var dir = inj.getDynamicallyLoadedComponent();
                        inj.dehydrate();
                        test_lib_1.expect(inj.getDynamicallyLoadedComponent()).toBe(null);
                        test_lib_1.expect(dir.onDestroyCounter).toBe(1);
                        inj.hydrate(null, null, null);
                        test_lib_1.expect(inj.getDynamicallyLoadedComponent()).toBe(null);
                    });
                    test_lib_1.it("should inject services of the dynamically-loaded component", function () {
                        var inj = injector(extraBindings);
                        var appInjector = di_1.Injector.resolveAndCreate([di_1.bind("service").toValue("Service")]);
                        inj.dynamicallyCreateComponent(element_injector_1.DirectiveBinding.createFromType(NeedsService, null), appInjector);
                        test_lib_1.expect(inj.getDynamicallyLoadedComponent().service).toEqual("Service");
                    });
                });
                test_lib_1.describe('static attributes', function () {
                    test_lib_1.it('should be injectable', function () {
                        var attributes = collection_1.MapWrapper.create();
                        collection_1.MapWrapper.set(attributes, 'type', 'text');
                        collection_1.MapWrapper.set(attributes, 'title', '');
                        var inj = injector(collection_1.ListWrapper.concat([NeedsAttribute], extraBindings), null, false, null, attributes);
                        var needsAttribute = inj.get(NeedsAttribute);
                        test_lib_1.expect(needsAttribute.typeAttribute).toEqual('text');
                        test_lib_1.expect(needsAttribute.titleAttribute).toEqual('');
                        test_lib_1.expect(needsAttribute.fooAttribute).toEqual(null);
                    });
                    test_lib_1.it('should be injectable without type annotation', function () {
                        var attributes = collection_1.MapWrapper.create();
                        collection_1.MapWrapper.set(attributes, 'foo', 'bar');
                        var inj = injector(collection_1.ListWrapper.concat([NeedsAttributeNoType], extraBindings), null, false, null, attributes);
                        var needsAttribute = inj.get(NeedsAttributeNoType);
                        test_lib_1.expect(needsAttribute.fooAttribute).toEqual('bar');
                    });
                });
                test_lib_1.describe("refs", function () {
                    test_lib_1.it("should inject ElementRef", function () {
                        var inj = injector(collection_1.ListWrapper.concat([NeedsElementRef], extraBindings));
                        test_lib_1.expect(inj.get(NeedsElementRef).elementRef).toBeAnInstanceOf(element_ref_1.ElementRef);
                    });
                    test_lib_1.it('should inject ChangeDetectorRef', function () {
                        var cd = new change_detection_1.DynamicChangeDetector(null, null, null, [], []);
                        var view = new DummyView();
                        var childView = new DummyView();
                        childView.changeDetector = cd;
                        view.componentChildViews = [childView];
                        var inj = injector(collection_1.ListWrapper.concat([NeedsChangeDetectorRef], extraBindings), null, false, new element_injector_1.PreBuiltObjects(null, view, null));
                        test_lib_1.expect(inj.get(NeedsChangeDetectorRef).changeDetectorRef).toBe(cd.ref);
                    });
                    test_lib_1.it('should inject ViewContainerRef', function () {
                        var inj = injector(collection_1.ListWrapper.concat([NeedsViewContainer], extraBindings));
                        test_lib_1.expect(inj.get(NeedsViewContainer).viewContainer).toBeAnInstanceOf(view_container_ref_1.ViewContainerRef);
                    });
                    test_lib_1.it("should inject ProtoViewRef", function () {
                        var protoView = new view_1.AppProtoView(null, null, null);
                        var inj = injector(collection_1.ListWrapper.concat([NeedsProtoViewRef], extraBindings), null, false, new element_injector_1.PreBuiltObjects(null, null, protoView));
                        test_lib_1.expect(inj.get(NeedsProtoViewRef).protoViewRef).toEqual(new view_ref_1.ProtoViewRef(protoView));
                    });
                    test_lib_1.it("should throw if there is no ProtoViewRef", function () {
                        test_lib_1.expect(function () { return injector(collection_1.ListWrapper.concat([NeedsProtoViewRef], extraBindings)); })
                            .toThrowError("No provider for ProtoViewRef! (" + lang_1.stringify(NeedsProtoViewRef) + " -> ProtoViewRef)");
                    });
                    test_lib_1.it('should inject null if there is no ProtoViewRef when the dependency is optional', function () {
                        var inj = injector(collection_1.ListWrapper.concat([OptionallyInjectsProtoViewRef], extraBindings));
                        var instance = inj.get(OptionallyInjectsProtoViewRef);
                        test_lib_1.expect(instance.protoViewRef).toBeNull();
                    });
                });
                test_lib_1.describe('directive queries', function () {
                    var preBuildObjects = defaultPreBuiltObjects;
                    test_lib_1.beforeEach(function () { _constructionCount = 0; });
                    function expectDirectives(query, type, expectedIndex) {
                        var currentCount = 0;
                        collection_1.iterateListLike(query, function (i) {
                            test_lib_1.expect(i).toBeAnInstanceOf(type);
                            test_lib_1.expect(i.count).toBe(expectedIndex[currentCount]);
                            currentCount += 1;
                        });
                    }
                    test_lib_1.it('should be injectable', function () {
                        var inj = injector(collection_1.ListWrapper.concat([NeedsQuery], extraBindings), null, false, preBuildObjects);
                        test_lib_1.expect(inj.get(NeedsQuery).query).toBeAnInstanceOf(query_list_1.QueryList);
                    });
                    test_lib_1.it('should contain directives on the same injector', function () {
                        var inj = injector(collection_1.ListWrapper.concat([NeedsQuery, CountingDirective], extraBindings), null, false, preBuildObjects);
                        expectDirectives(inj.get(NeedsQuery).query, CountingDirective, [0]);
                    });
                    // Dart's restriction on static types in (a is A) makes this feature hard to implement.
                    // Current proposal is to add second parameter the Query constructor to take a
                    // comparison function to support user-defined definition of matching.
                    //it('should support super class directives', () => {
                    //  var inj = injector([NeedsQuery, FancyCountingDirective], null, null, preBuildObjects);
                    //
                    //  expectDirectives(inj.get(NeedsQuery).query, FancyCountingDirective, [0]);
                    //});
                    test_lib_1.it('should contain directives on the same and a child injector in construction order', function () {
                        var protoParent = createPei(null, 0, [NeedsQuery, CountingDirective]);
                        var protoChild = createPei(protoParent, 1, collection_1.ListWrapper.concat([CountingDirective], extraBindings));
                        var parent = protoParent.instantiate(null);
                        var child = protoChild.instantiate(parent);
                        parent.hydrate(di_1.Injector.resolveAndCreate([]), null, preBuildObjects);
                        child.hydrate(di_1.Injector.resolveAndCreate([]), null, preBuildObjects);
                        expectDirectives(parent.get(NeedsQuery).query, CountingDirective, [0, 1]);
                    });
                    test_lib_1.it('should reflect unlinking an injector', function () {
                        var protoParent = createPei(null, 0, [NeedsQuery, CountingDirective]);
                        var protoChild = createPei(protoParent, 1, collection_1.ListWrapper.concat([CountingDirective], extraBindings));
                        var parent = protoParent.instantiate(null);
                        var child = protoChild.instantiate(parent);
                        parent.hydrate(di_1.Injector.resolveAndCreate([]), null, preBuildObjects);
                        child.hydrate(di_1.Injector.resolveAndCreate([]), null, preBuildObjects);
                        child.unlink();
                        expectDirectives(parent.get(NeedsQuery).query, CountingDirective, [0]);
                    });
                    test_lib_1.it('should reflect moving an injector as a last child', function () {
                        var protoParent = createPei(null, 0, [NeedsQuery, CountingDirective]);
                        var protoChild1 = createPei(protoParent, 1, [CountingDirective]);
                        var protoChild2 = createPei(protoParent, 1, collection_1.ListWrapper.concat([CountingDirective], extraBindings));
                        var parent = protoParent.instantiate(null);
                        var child1 = protoChild1.instantiate(parent);
                        var child2 = protoChild2.instantiate(parent);
                        parent.hydrate(di_1.Injector.resolveAndCreate([]), null, preBuildObjects);
                        child1.hydrate(di_1.Injector.resolveAndCreate([]), null, preBuildObjects);
                        child2.hydrate(di_1.Injector.resolveAndCreate([]), null, preBuildObjects);
                        child1.unlink();
                        child1.link(parent);
                        var queryList = parent.get(NeedsQuery).query;
                        expectDirectives(queryList, CountingDirective, [0, 2, 1]);
                    });
                    test_lib_1.it('should reflect moving an injector as a first child', function () {
                        var protoParent = createPei(null, 0, [NeedsQuery, CountingDirective]);
                        var protoChild1 = createPei(protoParent, 1, [CountingDirective]);
                        var protoChild2 = createPei(protoParent, 1, collection_1.ListWrapper.concat([CountingDirective], extraBindings));
                        var parent = protoParent.instantiate(null);
                        var child1 = protoChild1.instantiate(parent);
                        var child2 = protoChild2.instantiate(parent);
                        parent.hydrate(di_1.Injector.resolveAndCreate([]), null, preBuildObjects);
                        child1.hydrate(di_1.Injector.resolveAndCreate([]), null, preBuildObjects);
                        child2.hydrate(di_1.Injector.resolveAndCreate([]), null, preBuildObjects);
                        child2.unlink();
                        child2.linkAfter(parent, null);
                        var queryList = parent.get(NeedsQuery).query;
                        expectDirectives(queryList, CountingDirective, [0, 2, 1]);
                    });
                    test_lib_1.it('should support two concurrent queries for the same directive', function () {
                        var protoGrandParent = createPei(null, 0, [NeedsQuery]);
                        var protoParent = createPei(null, 0, [NeedsQuery]);
                        var protoChild = createPei(protoParent, 1, collection_1.ListWrapper.concat([CountingDirective], extraBindings));
                        var grandParent = protoGrandParent.instantiate(null);
                        var parent = protoParent.instantiate(grandParent);
                        var child = protoChild.instantiate(parent);
                        grandParent.hydrate(di_1.Injector.resolveAndCreate([]), null, preBuildObjects);
                        parent.hydrate(di_1.Injector.resolveAndCreate([]), null, preBuildObjects);
                        child.hydrate(di_1.Injector.resolveAndCreate([]), null, preBuildObjects);
                        var queryList1 = grandParent.get(NeedsQuery).query;
                        var queryList2 = parent.get(NeedsQuery).query;
                        expectDirectives(queryList1, CountingDirective, [0]);
                        expectDirectives(queryList2, CountingDirective, [0]);
                        child.unlink();
                        expectDirectives(queryList1, CountingDirective, []);
                        expectDirectives(queryList2, CountingDirective, []);
                    });
                });
            });
        });
    });
}
exports.main = main;
var ContextWithHandler = (function () {
    function ContextWithHandler(handler) {
        this.handler = handler;
    }
    return ContextWithHandler;
})();
var FakeRenderer = (function (_super) {
    __extends(FakeRenderer, _super);
    function FakeRenderer() {
        _super.call(this);
        this.log = [];
    }
    FakeRenderer.prototype.setElementProperty = function (viewRef, elementIndex, propertyName, value) {
        collection_1.ListWrapper.push(this.log, [viewRef, elementIndex, propertyName, value]);
    };
    return FakeRenderer;
})(api_1.Renderer);
//# sourceMappingURL=element_injector_spec.js.map