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
var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/facade/lang');
var promise_pipe_1 = require('angular2/src/change_detection/pipes/promise_pipe');
var pipe_1 = require('angular2/src/change_detection/pipes/pipe');
var change_detector_ref_1 = require('angular2/src/change_detection/change_detector_ref');
var async_1 = require('angular2/src/facade/async');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
function main() {
    test_lib_1.describe("PromisePipe", function () {
        var message = new Object();
        var pipe;
        var completer;
        var ref;
        // adds longer timers for passing tests in IE
        var timer = (!lang_1.isBlank(dom_adapter_1.DOM) && dom_adapter_1.DOM.getUserAgent().indexOf("Trident") > -1) ? 50 : 0;
        test_lib_1.beforeEach(function () {
            completer = async_1.PromiseWrapper.completer();
            ref = new SpyChangeDetectorRef();
            pipe = new promise_pipe_1.PromisePipe(ref);
        });
        test_lib_1.describe("supports", function () {
            test_lib_1.it("should support promises", function () { test_lib_1.expect(pipe.supports(completer.promise)).toBe(true); });
            test_lib_1.it("should not support other objects", function () {
                test_lib_1.expect(pipe.supports("string")).toBe(false);
                test_lib_1.expect(pipe.supports(null)).toBe(false);
            });
        });
        test_lib_1.describe("transform", function () {
            test_lib_1.it("should return null when subscribing to a promise", function () { test_lib_1.expect(pipe.transform(completer.promise)).toBe(null); });
            test_lib_1.it("should return the latest available value", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                pipe.transform(completer.promise);
                completer.resolve(message);
                async_1.TimerWrapper.setTimeout(function () {
                    test_lib_1.expect(pipe.transform(completer.promise)).toEqual(new pipe_1.WrappedValue(message));
                    async.done();
                }, timer);
            }));
            test_lib_1.it("should return unwrapped value when nothing has changed since the last call", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                pipe.transform(completer.promise);
                completer.resolve(message);
                async_1.TimerWrapper.setTimeout(function () {
                    pipe.transform(completer.promise);
                    test_lib_1.expect(pipe.transform(completer.promise)).toBe(message);
                    async.done();
                }, timer);
            }));
            test_lib_1.it("should dispose of the existing subscription when subscribing to a new promise", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                pipe.transform(completer.promise);
                var newCompleter = async_1.PromiseWrapper.completer();
                test_lib_1.expect(pipe.transform(newCompleter.promise)).toBe(null);
                // this should not affect the pipe, so it should return WrappedValue
                completer.resolve(message);
                async_1.TimerWrapper.setTimeout(function () {
                    test_lib_1.expect(pipe.transform(newCompleter.promise)).toBe(null);
                    async.done();
                }, timer);
            }));
            test_lib_1.it("should request a change detection check upon receiving a new value", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                pipe.transform(completer.promise);
                completer.resolve(message);
                async_1.TimerWrapper.setTimeout(function () {
                    test_lib_1.expect(ref.spy('requestCheck')).toHaveBeenCalled();
                    async.done();
                }, timer);
            }));
            test_lib_1.describe("onDestroy", function () {
                test_lib_1.it("should do nothing when no source", function () { test_lib_1.expect(function () { return pipe.onDestroy(); }).not.toThrow(); });
                test_lib_1.it("should dispose of the existing source", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                    pipe.transform(completer.promise);
                    test_lib_1.expect(pipe.transform(completer.promise)).toBe(null);
                    completer.resolve(message);
                    async_1.TimerWrapper.setTimeout(function () {
                        test_lib_1.expect(pipe.transform(completer.promise)).toEqual(new pipe_1.WrappedValue(message));
                        pipe.onDestroy();
                        test_lib_1.expect(pipe.transform(completer.promise)).toBe(null);
                        async.done();
                    }, timer);
                }));
            });
        });
    });
}
exports.main = main;
var SpyChangeDetectorRef = (function (_super) {
    __extends(SpyChangeDetectorRef, _super);
    function SpyChangeDetectorRef() {
        _super.call(this, change_detector_ref_1.ChangeDetectorRef);
    }
    SpyChangeDetectorRef.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyChangeDetectorRef = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(change_detector_ref_1.ChangeDetectorRef), 
        __metadata('design:paramtypes', [])
    ], SpyChangeDetectorRef);
    return SpyChangeDetectorRef;
})(test_lib_1.SpyObject);
//# sourceMappingURL=promise_pipe_spec.js.map