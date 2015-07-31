'use strict';



var AppRegistry = require('AppRegistry');
var shims = require('es6-shim');
import {tagElementMap, RCT_PROPERTY_NAMES} from "./native_element";
var ReactNativeEventEmitter = require('ReactNativeEventEmitter');

// required for angular:
import { Parse5DomAdapter } from 'angular2/src/dom/parse5_adapter';
import { setRootDomAdapter } from 'angular2/src/dom/dom_adapter';
import { NgZone } from 'angular2/src/core/zone/ng_zone';
require('traceur/bin/traceur-runtime.js');
require('reflect-metadata/Reflect.js');

require('./reactnative_zone');

var performanceNow = require('performanceNow');
var ReactUpdates = require('ReactUpdates');
var perfs = [{"name":"","time":performanceNow()}];
var perfStack = [];
var prevPerfsLength = 1;
global.__perf = function(val) {
	perfs.push({
		name: val,
		time: performanceNow()
	});


}
function spaces(n, s = "|  ") {
	var str = "";
	if (!s) s = "|  "
	for (var i = 0; i < n; i++) {
		str += s;
	}
	return str;
}
// setInterval(function() {
// 	// console.log(perfs);
// 	var log = []
// 	for (var i = 0; i < perfs.length - 1; i++) {
// 		var current = perfs[i];
// 		var next = perfs[i + 1];

// 		if (next.name.match("\\(end")) {
// 			log.push(spaces(perfStack.length - 1) + (next.time - current.time) + ":-" + (next.time - perfStack.pop().time) + "-:" + next.name)
// 		} else {
// 			log.push(spaces(perfStack.length) + (next.time - current.time) + ":" + next.name)
// 		}

// 		if (next.name.match("\\(start")) {
// 			perfStack.push(next)
// 		}
// 	}
// 	if (perfs.length > 1 && perfs.length - 4 <= prevPerfsLength) {
// 		// console.log(log.length);
// 		perfs = [perfs[perfs.length - 1]];
// 	}
// 	prevPerfsLength = perfs.length;
// }, 10000);
var prevNow = performanceNow();
setInterval(function() {
	console.log(
		perfs.length
		+ ":"
		+ spaces(
			(performanceNow() - prevNow) / 4,
			"."
		)
	);
	prevNow = performanceNow();
	perfs = [];
});
// intentionlly overriding here because this is the easiest way to intercept events from React Native
ReactNativeEventEmitter.receiveEvent = function(
	tag: number,
	topLevelType: string,
	nativeEventParam
) {
	var element = tagElementMap[tag];
	if (nativeEventParam.target) {
		nativeEventParam.target = tagElementMap[nativeEventParam.target];
	}
	// console.log(tag, topLevelType.toLowerCase(), nativeEventParam);
	element.fireEvent(topLevelType.toLowerCase(), nativeEventParam);
	// TODO: Don't call detectChanges on events that are not listened to.
}

// intentionlly overriding here because this is the easiest way to intercept events from React Native
ReactNativeEventEmitter.receiveTouches = function(
	eventTopLevelType: string,
	touches: Array<any>,
	changedIndices: Array<number>
) {
	for (var i = 0; i < touches.length; i++) {
		var element = tagElementMap[touches[i].target];
		if (touches[i].target) {
			touches[i].target = tagElementMap[touches[i].target];
		}
		// console.log(eventTopLevelType, touches, changedIndices)

		while (element) {
			element.fireEvent(eventTopLevelType.toLowerCase(), touches[i]);
			element = element.parent;
		}
	}
};

import {bind, Renderer, bootstrap} from "angular2/angular2";
import {internalView} from 'angular2/src/core/compiler/view_ref';
import {ReactNativeRenderer} from './renderer'

class CustomParse5DomAdapter extends Parse5DomAdapter {
	static makeCurrent() { setRootDomAdapter(new CustomParse5DomAdapter()); }
	hasProperty(element, name: string): boolean {
		console.log(name);
		return RCT_PROPERTY_NAMES[name] !== undefined;
	}
}

export function reactNativeBootstrap(component, bindings = []) {
	AppRegistry.registerRunnable("dist", function() {
		CustomParse5DomAdapter.makeCurrent();

		bootstrap(component, [
			ReactNativeRenderer,
			bind(Renderer).toAlias(ReactNativeRenderer)
		].concat(bindings)).then(function(appRef) {
			var zone = appRef._injector.get(NgZone)._innerZone;
			require('ReactUpdates').batchedUpdates = zone.bind(require('ReactUpdates').batchedUpdates);
		});
	});
}