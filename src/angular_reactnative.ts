'use strict';

var performanceNow = function() {return Date.now()}
var perfs = [{ "name": "", "time": performanceNow() }, { "name": "", "time": performanceNow() }];
var perfStack = [];
var prevPerfsLength = 1;
global.__perf = function(val) {
	perfs.push({
		name: val,
		time: performanceNow()
	});


}

global.__perf("AppRegistry (start)");
var AppRegistry = require('AppRegistry');
global.__perf("AppRegistry (end)");
// var performanceNow = require('performanceNow');

function spaces(n, s = "|  ") {
	var str = "";
	if (!s) s = "|  "
	for (var i = 0; i < n; i++) {
		str += s;
	}
	return str;
}
setInterval(function() {
	// console.log(perfs);
	var log = []
	for (var i = 0; i < perfs.length - 1; i++) {
		var current = perfs[i];
		var next = perfs[i + 1];

		if (next.name.match("\\(end")) {
			log.push(spaces(perfStack.length - 1) + (next.time - current.time) + ":-" + (next.time - perfStack.pop().time) + "-:" + next.name)
		} else {
			log.push(spaces(perfStack.length) + (next.time - current.time) + ":" + next.name)
		}

		if (next.name.match("\\(start")) {
			perfStack.push(next)
		}
	}
	if (perfs.length > 1) {
		console.log(log);
		perfs = [perfs[perfs.length - 1]];
	}
	prevPerfsLength = perfs.length;
}, 10000);
// var prevNow = performanceNow();
// setInterval(function() {
// 	console.log(
// 		perfs.length
// 		+ ":"
// 		+ spaces(
// 			(performanceNow() - prevNow) / 4,
// 			"."
// 		)
// 	);
// 	prevNow = performanceNow();
// 	perfs = [];
// });
global.__perf("es6-shims (start)");
var shims = require('es6-shim');
global.__perf("es6-shims (end)");
global.__perf("native_element (start)");
import {tagElementMap, RCT_PROPERTY_NAMES} from "./native_element";
global.__perf("native_element (end)");
global.__perf("ReactNativeEventEmitter (start)");
var ReactNativeEventEmitter = require('ReactNativeEventEmitter');
global.__perf("ReactNativeEventEmitter (end)");

// required for angular:
global.__perf("Parse5DomAdapter (start)");
import { Parse5DomAdapter } from 'angular2/src/dom/parse5_adapter';
global.__perf("Parse5DomAdapter (end)");
global.__perf("setRootDomAdapter (start)");
import { setRootDomAdapter } from 'angular2/src/dom/dom_adapter';
global.__perf("setRootDomAdapter (end)");
global.__perf("NgZone (start)");
import { NgZone } from 'angular2/src/core/zone/ng_zone';
global.__perf("NgZone (end)");
global.__perf("traceur-runtime (start)");
require('traceur/bin/traceur-runtime.js');
global.__perf("traceur-runtime (end)");
global.__perf("Reflect (start)");
require('reflect-metadata/Reflect.js');
global.__perf("Reflect (end)");

global.__perf("reactnative_zone (start)");
require('./reactnative_zone');
global.__perf("Reflect (end)");

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

global.__perf("bind, Renderer, bootstrap (start)");
import {bind, Renderer, bootstrap} from "angular2/angular2";
global.__perf("bind, Renderer, bootstrap (end)");
global.__perf("internalView (start)");
import {internalView} from 'angular2/src/core/compiler/view_ref';
global.__perf("internalView (end)");
global.__perf("ReactNativeRenderer (start)");
import {ReactNativeRenderer} from './renderer'
global.__perf("ReactNativeRenderer (end)");

class CustomParse5DomAdapter extends Parse5DomAdapter {
	static makeCurrent() { setRootDomAdapter(new CustomParse5DomAdapter()); }
	hasProperty(element, name: string): boolean {
		console.log(name);
		return RCT_PROPERTY_NAMES[name] !== undefined;
	}
}

export function reactNativeBootstrap(component, bindings = []) {

	global.__perf("register runnable");
	AppRegistry.registerRunnable("dist", function() {
		global.__perf("runnable called");
		global.__perf("set parse5 adapter (start)");
		CustomParse5DomAdapter.makeCurrent();
		global.__perf("set parse5 adapter (end)");
		global.__perf("bootstrap promise start");
		bootstrap(component, [
			ReactNativeRenderer,
			bind(Renderer).toAlias(ReactNativeRenderer)
		].concat(bindings)).then(function(appRef) {
			global.__perf("bootstrap promise end");
			global.__perf("appRef._injector.get(NgZone)._innerZone (start)");
			var zone = appRef._injector.get(NgZone)._innerZone;
			global.__perf("appRef._injector.get(NgZone)._innerZone (end)");
			global.__perf("ReactUpdates (start)");
			require('ReactUpdates').batchedUpdates = zone.bind(require('ReactUpdates').batchedUpdates);
			global.__perf("ReactUpdates (end)");
		});
	});
}