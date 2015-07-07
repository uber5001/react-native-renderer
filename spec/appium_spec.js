"use strict";

var wd = require("wd");
var path = require("path");
// var bundler = require("./bundle");

var desired = {
	"appium-version": "1.0",
	platformName: "iOS",
	platformVersion: "8.3",
	deviceName: "iPhone Simulator",
	app: path.resolve("./dist.app.zip"),
};

//appium also closes a session after 60s, no reason to wait longer than that.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('todo-app', function() {
	var browser;
	var catchSpy;
	// beforeAll(function(done) {
	// 	bundler.bundle().then(done);
	// })
	beforeEach(function(done) {
		catchSpy = jasmine.createSpy("catchSpy");

		browser = wd.promiseChainRemote("0.0.0.0", 4723);

		browser.init(desired).then(function() {
			console.log('>>>>>> done with browser init');
			console.log(arguments);
			done();
		})
		.catch(function(err) {
			console.log(err);
		})
	});
	it('should have text next to switches', function(done) {
		browser
			.elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAScrollView[1]/UIASwitch[1]/following-sibling::UIAStaticText").text(function(err, text){
				if (err) throw err;
			})
			.catch(catchSpy)
			.finally(function() {
				expect(catchSpy).not.toHaveBeenCalled();
				done();
			})
	});
	it('should ', function(done) {
		browser
			.elementByXPath("//UIAApplication[1]/UIAWindow[1]/UIAScrollView[1]/UIASwitch[1]/following-sibling::UIAStaticText").text(function(err, text){
				if (err) throw err;
			})
			.catch(catchSpy)
			.finally(function() {
				expect(catchSpy).not.toHaveBeenCalled();
				done();
			})
	});
	afterEach(function(done) {
		browser.quit().done(done);
	});
})
