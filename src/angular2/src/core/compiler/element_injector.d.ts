import { Type } from 'angular2/src/facade/lang';
import { Injector, Key, Dependency, Binding, ResolvedBinding } from 'angular2/di';
import { Visibility } from 'angular2/src/core/annotations_impl/visibility';
import * as viewModule from './view';
import * as avmModule from './view_manager';
import { ViewContainerRef } from './view_container_ref';
import { ElementRef } from './element_ref';
import { Directive } from 'angular2/src/core/annotations_impl/annotations';
import { DirectiveMetadata } from 'angular2/src/render/api';
export declare class TreeNode<T extends TreeNode<any>> {
    _parent: T;
    _head: T;
    _tail: T;
    _next: T;
    constructor(parent: T);
    _assertConsistency(): void;
    _assertHeadBeforeTail(): void;
    _assertTailReachable(): void;
    _assertPresentInParentList(): void;
    /**
     * Adds a child to the parent node. The child MUST NOT be a part of a tree.
     */
    addChild(child: T): void;
    /**
     * Adds a child to the parent node after a given sibling.
     * The child MUST NOT be a part of a tree and the sibling must be present.
     */
    addChildAfter(child: T, prevSibling: T): void;
    /**
     * Detaches a node from the parent's tree.
     */
    remove(): void;
    /**
     * Finds a previous sibling or returns null if first child.
     * Assumes the node has a parent.
     * TODO(rado): replace with DoublyLinkedList to avoid O(n) here.
     */
    _findPrev(): any;
    parent: T;
    children: any[];
}
export declare class DependencyWithVisibility extends Dependency {
    visibility: Visibility;
    constructor(key: Key, asPromise: boolean, lazy: boolean, optional: boolean, properties: List<any>, visibility: Visibility);
    static createFrom(d: Dependency): Dependency;
    static _visibility(properties: any): Visibility;
}
export declare class DirectiveDependency extends DependencyWithVisibility {
    attributeName: string;
    queryDirective: any;
    constructor(key: Key, asPromise: boolean, lazy: boolean, optional: boolean, properties: List<any>, visibility: Visibility, attributeName: string, queryDirective: any);
    _verify(): void;
    static createFrom(d: Dependency): Dependency;
    static _attributeName(properties: any): string;
    static _query(properties: any): any;
}
export declare class DirectiveBinding extends ResolvedBinding {
    resolvedAppInjectables: List<ResolvedBinding>;
    resolvedHostInjectables: List<ResolvedBinding>;
    resolvedViewInjectables: List<ResolvedBinding>;
    metadata: DirectiveMetadata;
    constructor(key: Key, factory: Function, dependencies: List<Dependency>, providedAsPromise: boolean, resolvedAppInjectables: List<ResolvedBinding>, resolvedHostInjectables: List<ResolvedBinding>, resolvedViewInjectables: List<ResolvedBinding>, metadata: DirectiveMetadata);
    callOnDestroy: boolean;
    callOnChange: boolean;
    callOnAllChangesDone: boolean;
    displayName: string;
    eventEmitters: List<string>;
    hostActions: Map<string, string>;
    changeDetection: string;
    static createFromBinding(binding: Binding, ann: Directive): DirectiveBinding;
    static _readAttributes(deps: any): any[];
    static createFromType(type: Type, annotation: Directive): DirectiveBinding;
}
export declare class PreBuiltObjects {
    viewManager: avmModule.AppViewManager;
    view: viewModule.AppView;
    protoView: viewModule.AppProtoView;
    constructor(viewManager: avmModule.AppViewManager, view: viewModule.AppView, protoView: viewModule.AppProtoView);
}
export declare class EventEmitterAccessor {
    eventName: string;
    getter: Function;
    constructor(eventName: string, getter: Function);
    subscribe(view: viewModule.AppView, boundElementIndex: number, directive: Object): Object;
}
export declare class HostActionAccessor {
    actionExpression: string;
    getter: Function;
    constructor(actionExpression: string, getter: Function);
    subscribe(view: viewModule.AppView, boundElementIndex: number, directive: Object): Object;
}
export declare class BindingData {
    binding: ResolvedBinding;
    visibility: number;
    constructor(binding: ResolvedBinding, visibility: number);
    getKeyId(): number;
    createEventEmitterAccessors(): any;
    createHostActionAccessors(): any[];
}
/**

Difference between di.Injector and ElementInjector

di.Injector:
 - imperative based (can create child injectors imperativly)
 - Lazy loading of code
 - Component/App Level services which are usually not DOM Related.


ElementInjector:
  - ProtoBased (Injector structure fixed at compile time)
  - understands @Ancestor, @Parent, @Child, @Descendent
  - Fast
  - Query mechanism for children
  - 1:1 to DOM structure.

 PERF BENCHMARK:
http://www.williambrownstreet.net/blog/2014/04/faster-angularjs-rendering-angularjs-and-reactjs/
 */
export declare class ProtoElementInjector {
    parent: ProtoElementInjector;
    index: int;
    distanceToParent: number;
    _firstBindingIsComponent: boolean;
    view: viewModule.AppView;
    attributes: Map<string, string>;
    eventEmitterAccessors: List<List<EventEmitterAccessor>>;
    hostActionAccessors: List<List<HostActionAccessor>>;
    /** Whether the element is exported as $implicit. */
    exportElement: boolean;
    /** Whether the component instance is exported as $implicit. */
    exportComponent: boolean;
    /** The variable name that will be set to $implicit for the element. */
    exportImplicitName: string;
    _strategy: any;
    static create(parent: ProtoElementInjector, index: number, bindings: List<ResolvedBinding>, firstBindingIsComponent: boolean, distanceToParent: number): ProtoElementInjector;
    private static _createDirectiveBindingData(bindings, bd, firstBindingIsComponent);
    private static _createHostInjectorBindingData(bindings, bd);
    private static _createViewInjectorBindingData(bindings, bd);
    private static _createBinding(b);
    constructor(parent: ProtoElementInjector, index: int, bd: List<BindingData>, distanceToParent: number, _firstBindingIsComponent: boolean);
    instantiate(parent: ElementInjector): ElementInjector;
    directParent(): ProtoElementInjector;
    hasBindings: boolean;
    getBindingAtIndex(index: number): any;
}
export declare class ElementInjector extends TreeNode<ElementInjector> {
    _proto: ProtoElementInjector;
    private _lightDomAppInjector;
    private _shadowDomAppInjector;
    private _host;
    private _preBuiltObjects;
    private _constructionCounter;
    private _dynamicallyCreatedComponent;
    private _dynamicallyCreatedComponentBinding;
    private _query0;
    private _query1;
    private _query2;
    _strategy: any;
    constructor(_proto: ProtoElementInjector, parent: ElementInjector);
    dehydrate(): void;
    hydrate(injector: Injector, host: ElementInjector, preBuiltObjects: PreBuiltObjects): void;
    private _createShadowDomAppInjector(componentDirective, appInjector);
    dynamicallyCreateComponent(componentDirective: DirectiveBinding, parentInjector: Injector): any;
    private _checkShadowDomAppInjector(shadowDomAppInjector);
    get(token: any): any;
    private _isDynamicallyLoadedComponent(token);
    hasDirective(type: Type): boolean;
    getEventEmitterAccessors(): List<List<EventEmitterAccessor>>;
    getHostActionAccessors(): List<List<HostActionAccessor>>;
    getComponent(): any;
    getElementRef(): ElementRef;
    getViewContainerRef(): ViewContainerRef;
    getDynamicallyLoadedComponent(): any;
    directParent(): ElementInjector;
    private _isComponentKey(key);
    private _isDynamicallyLoadedComponentKey(key);
    _new(binding: ResolvedBinding): any;
    private _getByDependency(dep, requestor);
    private _buildAttribute(dep);
    _buildQueriesForDeps(deps: List<DirectiveDependency>): void;
    private _createQueryRef(directive);
    private _addToQueries(obj, token);
    private _inheritQueries(parent);
    private _buildQueries();
    private _findQuery(token);
    link(parent: ElementInjector): void;
    linkAfter(parent: ElementInjector, prevSibling: ElementInjector): void;
    private _addParentQueries();
    unlink(): void;
    private _pruneQueryFromTree(query);
    private _addQueryToTree(query);
    private _assignQueryRef(query);
    private _removeQueryRef(query);
    private _getByKey(key, visibility, optional, requestor);
    private _appInjector(requestor);
    private _getPreBuiltObjectByKeyId(keyId);
    private _getObjByKeyId(keyId, visibility);
    getDirectiveAtIndex(index: number): any;
    hasInstances(): boolean;
    /** Gets whether this element is exporting a component instance as $implicit. */
    isExportingComponent(): boolean;
    /** Gets whether this element is exporting its element as $implicit. */
    isExportingElement(): boolean;
    /** Get the name to which this element's $implicit is to be assigned. */
    getExportImplicitName(): string;
    getLightDomAppInjector(): Injector;
    getShadowDomAppInjector(): Injector;
    getHost(): ElementInjector;
    getBoundElementIndex(): number;
}
