import { DomRenderer } from 'angular2/src/render/dom/dom_renderer';
import { DefaultDomCompiler } from 'angular2/src/render/dom/compiler/compiler';
import { DomView } from 'angular2/src/render/dom/view/view';
import { RenderViewRef, ProtoViewDto, ViewDefinition, DirectiveMetadata } from 'angular2/src/render/api';
export declare class TestView {
    rawView: DomView;
    viewRef: RenderViewRef;
    events: List<List<any>>;
    constructor(viewRef: RenderViewRef);
}
export declare class DomTestbed {
    renderer: DomRenderer;
    compiler: DefaultDomCompiler;
    rootEl: any;
    constructor(renderer: DomRenderer, compiler: DefaultDomCompiler, document: any);
    compileAll(directivesOrViewDefinitions: List<DirectiveMetadata | ViewDefinition>): Promise<List<ProtoViewDto>>;
    _createTestView(viewRef: RenderViewRef): TestView;
    createRootView(rootProtoView: ProtoViewDto): TestView;
    createComponentView(parentViewRef: RenderViewRef, boundElementIndex: number, componentProtoView: ProtoViewDto): TestView;
    createRootViews(protoViews: List<ProtoViewDto>): List<TestView>;
    destroyComponentView(parentViewRef: RenderViewRef, boundElementIndex: number, componentView: RenderViewRef): void;
    createViewInContainer(parentViewRef: RenderViewRef, boundElementIndex: number, atIndex: number, protoView: ProtoViewDto): TestView;
    destroyViewInContainer(parentViewRef: RenderViewRef, boundElementIndex: number, atIndex: number, viewRef: RenderViewRef): void;
    triggerEvent(viewRef: RenderViewRef, boundElementIndex: number, eventName: string): void;
}
