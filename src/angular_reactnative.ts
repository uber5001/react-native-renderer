'use strict';

import {tagElementMap} from "./native_element";

var AppRegistry = require('AppRegistry');
var ReactNativeEventEmitter = require('ReactNativeEventEmitter');

// required for angular:
var parse5Adapter = require('angular2/src/dom/parse5_adapter.js');
require('traceur/bin/traceur-runtime.js');
require('reflect-metadata/Reflect.js');

require('./reactnative_zone')


//var zone = global.zone;

// Object.assign(zone, {
// 	afterTask: function() {
// 		detectChanges();
// 		console.log('%c----------detectChanges-------------', 'background: #000000; color: #ffffff');
// 	}
// });


// intentionlly overriding here because reasons
ReactNativeEventEmitter.receiveEvent = function(
	tag: number,
	topLevelType: string,
	nativeEventParam
	) {
	global.zone.run(function(
		tag: number,
		topLevelType: string,
		nativeEventParam
		) {
		if (!nativeEventParam.target) {
			throw "Expected all events to have a target!";
		}
		var element = tagElementMap[tag];
		nativeEventParam.target = element;
		console.log(global.zone);
		console.log(tag, topLevelType.toLowerCase(), nativeEventParam);
		element.listenerCallback(topLevelType.toLowerCase(), nativeEventParam);
		// TODO: Don't call detectChanges on events that are not listened to.
	}, ReactNativeEventEmitter, arguments);
}

// intentionlly overriding here because reasons
ReactNativeEventEmitter.receiveTouches = function(
	eventTopLevelType: string,
	touches: Array<Object>,
	changedIndices: Array<number>
	) {
	global.zone.run(function() {
		console.log(global.zone);
		console.log(eventTopLevelType, touches, changedIndices)
	});
};



import {bind, Renderer, appComponentRefToken, bootstrap} from "angular2/angular2";
import {internalView} from 'angular2/src/core/compiler/view_ref';
import {ReactNativeRenderer} from './renderer'


// var NativeModules = require('NativeModules');
// var ReactNativeTagHandles = require('ReactNativeTagHandles');







// var detectChanges = () => { };
export function reactNativeBootstrap(component, bindings = []) {
	AppRegistry.registerRunnable("dist", function() {
		parse5Adapter.Parse5DomAdapter.makeCurrent();

		bootstrap(component, [
			ReactNativeRenderer,
			bind(Renderer).toAlias(ReactNativeRenderer)
		].concat(bindings))
		// .then((appRef) => {
		// 	console.log(global.zone);
		// 	var componentRef = appRef.injector.get(appComponentRefToken);
		// 	var rootView = internalView(componentRef.location.parentView);
		// 	detectChanges = () => rootView.changeDetector.detectChanges();
		// });
	});
}