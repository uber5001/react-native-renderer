import {reactNativeBootstrap} from './angular_reactnative'
import {Component, View, Directive, NgFor} from 'angular2/angular2';

var precomputeStyle = require('precomputeStyle');

@Component({
	selector: 'todo-app',
	host: {
		"position": "absolute",
		"top": "0",
		"bottom": "0",
		"left": "0",
		"right": "0",
		"padding": "5",
		"paddingTop": "15"
	}
})
@View({
	template:
	    "<TextField (topsubmitediting)='submit($event)' placeholder='new item' height=40 fontSize=30></TextField>" +
		"<ScrollView automaticallyAdjustContentInsets=false flex=1 [scrollEnabled]='scrollEnabled'><View>" +
		  "<View [transformMatrix]='item.transformMatrix' (topTouchStart)='handleStart($event, item)' (topTouchMove)='handleMove($event, item)' (topTouchEnd)='handleEnd($event, item)'  *ng-for='#item of items' flexDirection='row' height=40 fontSize=20 alignItems='center'>" +
		    "<switch (topchange)='handleSwitch(item)' width=61 height=31 paddingRight=10></switch>" +
		    "<Text fontSize=20>{{item.label}}</Text>" +
		  "</View>" +
		"</View></ScrollView>",
	directives: [NgFor]
})
class TodoAppComponent {
	items = parksToVisit;
	scrollEnabled = true;

	submit(event) {
		this.items.push({"label": event.text});
		event.target.setProperty("text", "");
		event.target.focus();
	}
	handleSwitch(item) {
		var start = Date.now();
		var self = this;
	}
	removeRaw(item) {
		this.items.splice(this.items.indexOf(item), 1)
	}
	handleStart(event, item) {
		item.prevEvent = event;
		item.controlledByAnimation = false;
		this.scrollEnabled = false;
	}
	handleMove(event, item) {
		var prevX = item.prevEvent.pageX;
		var curX = event.pageX;
		var dx = curX - prevX;
		item.x = (item.x ? item.x : 0) + dx;
		item.velocity = dx;
		this.drawItem(item);
		item.prevEvent = event;
	}
	handleEnd(event, item) {
		this.handleMove(event, item);
		item.controlledByAnimation = true;
		this.finishSwipe(item);
		this.scrollEnabled = true;
	}
	//given item.velocity and item.x, finish the animation, and remove the item if needed.
	finishSwipe(item) {
		var self = this;
		var destination = "";
		if (item.x + item.velocity * 20 > 200) {
			destination = "right";
		} else if (item.x + item.velocity * 20 < -200) {
			destination = "left";
		} else {
			destination = "center";
		}
		function animate() {
			//NOTE: velocity is based on change in X over change in frames,
			//                       NOT change in X over change in time
			// it should probably be changed to be base on time.
			if (!item.controlledByAnimation) return;
			if (destination === "center") {
				item.velocity = (item.velocity*9 - item.x)/10;
				item.velocity *= 0.95;
			} else if (destination === "right") {
				item.velocity += 4;
			} else {
				item.velocity -= 4;
			}
			item.x += item.velocity;
			self.drawItem(item);
			if (item.x > 1000 || item.x < -1000) {
				self.removeRaw(item);
			} else if (Math.abs(item.x) > 1 || Math.abs(item.velocity) > 1) {
				requestAnimationFrame(animate);
			}
		} animate();
	}
	drawItem(item) {
		item.transformMatrix = precomputeStyle({
			transform: [
				{ translateX: item.x }
			]
		}).transformMatrix;
	}
}

var parksToVisit = global.tmpParks = [
	{"label": 'Bryce Canyon'},
	{"label": 'Crater Lake'},
	{"label": 'Death Valley'},
	{"label": 'Denali'},
	{"label": 'Everglades'},
	{"label": 'Glacier Bay'},
	{"label": 'Grand Canyon'},
	{"label": 'Grand Teton'},
	{"label": 'Great Basin'},
	{"label": 'Haleakalā'},
	{"label": 'Joshua Tree'},
	{"label": 'Kings Canyon'},
	{"label": 'Lassen Volcanic'},
	{"label": 'Mount Rainier'},
	{"label": 'Redwood'},
	{"label": 'Rocky Mountain'},
	{"label": 'Sequoia'},
	{"label": 'Yellowstone'},
	{"label": 'Zion'}
];


reactNativeBootstrap(TodoAppComponent);