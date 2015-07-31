import {MapWrapper} from 'angular2/src/facade/collection';
import {DomProtoView, resolveInternalDomProtoView} from 'angular2/src/render/dom/view/proto_view';
import {Renderer, RenderProtoViewRef, RenderViewWithFragments, RenderViewRef, RenderFragmentRef, RenderElementRef, RenderEventDispatcher} from 'angular2/src/render/api';
import {NG_BINDING_CLASS} from 'angular2/src/render/dom/util';
import {DOM} from 'angular2/src/dom/dom_adapter';

import {resolveInternalReactNativeView, ReactNativeViewRef, ReactNativeView} from './view';
import {ReactNativeElement, ReactNativeFragmentRef, resolveInternalReactNativeFragment} from './native_element';

export class ReactNativeRenderer extends Renderer {

	constructor() {
		super();
		global.__perf("constructor");
	}

	createRootHostView(hostProtoViewRef: RenderProtoViewRef, fragmentCount: number,
		hostElementSelector: string): RenderViewWithFragments {
		global.__perf("createRootHostView");
		var hostProtoView = resolveInternalDomProtoView(hostProtoViewRef);
		return this._createView(hostProtoView, true);
	}
	detachFreeHostView(parentHostViewRef: RenderViewWithFragments, hostViewRef: RenderViewWithFragments) {
		global.__perf("detachFreeHostView");
	}

	createView(protoViewRef: RenderProtoViewRef, fragmentCount: number): RenderViewWithFragments {
		global.__perf("createView");
		var protoView = resolveInternalDomProtoView(protoViewRef);
		return this._createView(protoView);
	}

	destroyView(viewRef: RenderViewRef) {
		global.__perf("destroyView");
	}

	attachFragmentAfterFragment(previousFragmentRef: RenderFragmentRef,
		fragmentRef: RenderFragmentRef) {

		global.__perf("attachFragmentAfterFragment");
		var previousFragmentNodes = resolveInternalReactNativeFragment(previousFragmentRef);
		var sibling = previousFragmentNodes[previousFragmentNodes.length - 1];
		moveNodesAfterSibling(sibling, resolveInternalReactNativeFragment(fragmentRef));
	}

	attachFragmentAfterElement(elementRef: RenderElementRef, fragmentRef: RenderFragmentRef) {
		global.__perf("attachFragmentAfterElement");
		var view = resolveInternalReactNativeView(elementRef.renderView);
		var element = view.boundElements[elementRef.renderBoundElementIndex];
		moveNodesAfterSibling(element, resolveInternalReactNativeFragment(fragmentRef));
	}

	detachFragment(fragmentRef: RenderFragmentRef) {
		global.__perf("detachFragment");
		var fragment = resolveInternalReactNativeFragment(fragmentRef);
		for (var i = 0; i < fragment.length; i++) {
			var element = fragment[i];
			element.parent.removeAtIndex(element.parent.children.indexOf(element));
		}
		var item = fragment[0];
		var text = item.children[1].children[0].props.text;
	}

	hydrateView(viewRef: RenderViewRef) {
		global.__perf("hydrateView");
		var view = resolveInternalReactNativeView(viewRef);
		if (view.hydrated) throw 'The view is already hydrated.';
		view.hydrated = true;
		//TODO: actually hydrate anything.
	}

	dehydrateView(viewRef: RenderViewRef) {
		global.__perf("dehydrateView");
		var view = resolveInternalReactNativeView(viewRef);
		view.hydrated = false;
		//TODO: actually dehydrate anything.
	}

	getNativeElementSync(location: RenderElementRef): any {
		global.__perf("getNativeElementSync");
		var view = resolveInternalReactNativeView(location.renderView);
		return view.boundElements[location.renderBoundElementIndex];
	}

	setElementProperty(location: RenderElementRef, propertyName: string, propertyValue: any) {
		global.__perf("setElementProperty (start)");
		var view = resolveInternalReactNativeView(location.renderView);
		global.__perf("setElementProperty (A)");
		var element = view.boundElements[location.renderBoundElementIndex];
		global.__perf("setElementProperty (B)");
		element.setProperty(propertyName, propertyValue);
		global.__perf("setElementProperty (end)");
	}

	setElementAttribute(location: RenderElementRef, attributeName: string, attributeValue: string) {
		global.__perf("setElementAttribute");
	}

	setElementClass(location: RenderElementRef, className: string, isAdd: boolean) {
		global.__perf("setElementClass");
	}

	setElementStyle(location: RenderElementRef, styleName: string, styleValue: string) {
		global.__perf("setElementStyle");
	}

	invokeElementMethod(location: RenderElementRef, methodName: string, args: List<any>) {
		global.__perf("invokeElementMethod");
	}

	setText(viewRef: RenderViewRef, textNodeIndex: number, text: string) {
		global.__perf("setText");
		// if (text === "FADE_OUT_HACK") {
		// 	var view = resolveInternalReactNativeView(viewRef);
		// 	var element = view.boundTextNodes[textNodeIndex].parent.parent;
		// 	var start = Date.now();
		// 	function animate() {
		// 		var secondsPassed = (Date.now() - start) / 1000;
		// 		var transform = [
		// 			{ translateX: Math.max(300 * secondsPassed * secondsPassed, 0) },
		// 			{ scaleY: Math.max(1 - secondsPassed * secondsPassed, 0) }
		// 		];
		// 		var transformMatrix = precomputeStyle({ transform: transform }).transformMatrix;
		// 		element.setProperty("transformMatrix", transformMatrix);
		// 		// element.setProperty("opacity", Math.max(1 - secondsPassed * secondsPassed, 0));
		// 		if (secondsPassed <= 1) {
		// 			requestAnimationFrame(animate);
		// 		}
		// 	} animate();
		// 	return;
		// } else {
		// 	//FADE_OUT_HACK clearing extra transform props so the fragment can be re-used
		// 	var view = resolveInternalReactNativeView(viewRef);
		// 	var element = view.boundTextNodes[textNodeIndex].parent.parent;
		// 	element.setProperty("transformMatrix", undefined);
		// }

		var view = resolveInternalReactNativeView(viewRef);
		view.boundTextNodes[textNodeIndex].setProperty("text", text);
	}

	setEventDispatcher(viewRef: RenderViewRef, dispatcher: RenderEventDispatcher) {
		global.__perf("setEventDispatcher");
		var view = resolveInternalReactNativeView(viewRef);
		view.eventDispatcher = dispatcher;
	}
	
	_createView(proto: DomProtoView, isRoot = false): RenderViewWithFragments {
		global.__perf("_createView");
		var nativeElements;
		var boundElements = [];
		if (proto.rootElement.tagName == "template") {
			nativeElements = this._dfsAndCreateNativeElements(proto.rootElement.childNodes[0].childNodes, boundElements);
		} else {
			nativeElements = this._dfsAndCreateNativeElements([proto.rootElement], boundElements);
		}

		var fragments = [];
		var currentRootIndex = 0;
		for (var i = 0; i < proto.fragmentsRootNodeCount.length; i++) {
			var rootNodeCount = proto.fragmentsRootNodeCount[i];
			var fragmentElements = [];
			for (var j = 0; j < rootNodeCount; j++) {
				fragmentElements.push(nativeElements[currentRootIndex++])
			}
			fragments.push(new ReactNativeFragmentRef(fragmentElements));
		}

		if (isRoot) {
			nativeElements[0].attachToNative();
		}
		var boundTextNodes = this._createBoundTextNodes(proto, boundElements);
		var view = new ReactNativeView(proto, nativeElements, boundElements, boundTextNodes);

		for (var i = 0; i < view.boundElements.length; i++) {
			this._initElementEventListener(i, view.boundElements[i], view);
		}

		return new RenderViewWithFragments(new ReactNativeViewRef(view), fragments);
	}

	_dfsAndCreateNativeElements(childrenParam, boundElements) {
		var resultingNativeChildren = [];
		for (var i = 0; i < childrenParam.length; i++) {
			var node = childrenParam[i];
			var nativeElement;
			if (node.type == "tag") {
				nativeElement = new ReactNativeElement(node.name, node.attribs);
			} else if (node.type == "text") {
				nativeElement = new ReactNativeElement("rawtext", {text:node.data});
			}

			if (DOM.hasClass(node, NG_BINDING_CLASS)) {
				boundElements.push(nativeElement);
			}

			//create and then attach children
			if (node.children && node.name != "template") {
				var children = this._dfsAndCreateNativeElements(node.children, boundElements);
				for (var j = 0; j < children.length; j++) {
					var child = children[j];
					nativeElement.insertChildAtIndex(child, j);
				}
			}
			resultingNativeChildren.push(nativeElement)
		}
		return resultingNativeChildren;
	}

	_initElementEventListener(bindingIndex: number, element: ReactNativeElement, view: ReactNativeView) {
		element.setEventListener(global.zone.bind(function(name, event) {
			var locals = new Map<string, any>();
			locals.set('$event', event);
			view.eventDispatcher.dispatchRenderEvent(bindingIndex, name, locals);
			global.__perf("%cEvent dispatched: ", "color: #22dd22", name);
		}));
	}

	_createBoundTextNodes(proto: DomProtoView, boundElements) {
		//expecting boundElements to already be filled out, and be an array of ReactNativeElements
		var boundTextNodes = [];
		var elementBinders = proto.elementBinders;
		for (var i = 0; i < elementBinders.length; i++) {
			var indicies = elementBinders[i].textNodeIndices;
			var nativeNodes = boundElements[i].children;
			for (var j = 0; j < indicies.length; j++) {
				var index = indicies[j];
				boundTextNodes.push(nativeNodes[index]);
			}
		}
		return boundTextNodes;
	}
	
}

function moveNodesAfterSibling(sibling: ReactNativeElement, nodes: ReactNativeElement[]) {
	if (sibling.parent) {
		var destIndex = sibling.parent.children.indexOf(sibling) + 1;
		for (var i = 0; i < nodes.length; i++) {
			sibling.parent.insertChildAtIndex(nodes[i], destIndex);
		}
	}
}