"use strict";

var wd = require("wd");
var path = require("path");
// var bundler = require("./bundle");

var desired = {
	"appium-version": "1.4.7",
	platformName: "iOS",
	platformVersion: "8.3",
	deviceName: "iPhone Simulator",
	app: path.resolve("dist/build/dist.app"),
	launchTimeout: 120000
};

//appium also closes a session after 60s, no reason to wait longer than that.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
var APPIUM_INIT_TIMEOUT = 420000;

describe('todo-app', function() {
	var browser;
	var catchSpy;
	beforeEach(function(done) {
		catchSpy = jasmine.createSpy("catchSpy");

		browser = wd.promiseChainRemote("0.0.0.0", 4723);

		browser.init(desired).then(done)
		.catch(function(err) {
			console.log(err);
			throw err;
		})
	}, APPIUM_INIT_TIMEOUT);
	it('should connect to appium without error', function(done) {
		browser
			.elementByXPath("//UIAApplication[1]/UIAWindow[1]")
			.catch(catchSpy)
			.finally(function() {
				expect(catchSpy).not.toHaveBeenCalled();
				done();
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
	afterEach(function(done) {
		browser.quit().done(done);
	});
})
