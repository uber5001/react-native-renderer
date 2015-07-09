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
var pipe_1 = require('angular2/src/change_detection/pipes/pipe');
var observable_pipe_1 = require('angular2/src/change_detection/pipes/observable_pipe');
var change_detector_ref_1 = require('angular2/src/change_detection/change_detector_ref');
var async_1 = require('angular2/src/facade/async');
function main() {
    test_lib_1.describe("ObservablePipe", function () {
        var emitter;
        var pipe;
        var ref;
        var message = new Object();
        test_lib_1.beforeEach(function () {
            emitter = new async_1.EventEmitter();
            ref = new SpyChangeDetectorRef();
            pipe = new observable_pipe_1.ObservablePipe(ref);
        });
        test_lib_1.describe("supports", function () {
            test_lib_1.it("should support observables", function () { test_lib_1.expect(pipe.supports(emitter)).toBe(true); });
            test_lib_1.it("should not support other objects", function () {
                test_lib_1.expect(pipe.supports("string")).toBe(false);
                test_lib_1.expect(pipe.supports(null)).toBe(false);
            });
        });
        test_lib_1.describe("transform", function () {
            test_lib_1.it("should return null when subscribing to an observable", function () { test_lib_1.expect(pipe.transform(emitter)).toBe(null); });
            test_lib_1.it("should return the latest available value wrapped", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                pipe.transform(emitter);
                async_1.ObservableWrapper.callNext(emitter, message);
                async_1.TimerWrapper.setTimeout(function () {
                    test_lib_1.expect(pipe.transform(emitter)).toEqual(new pipe_1.WrappedValue(message));
                    async.done();
                }, 0);
            }));
            test_lib_1.it("should return same value when nothing has changed since the last call", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                pipe.transform(emitter);
                async_1.ObservableWrapper.callNext(emitter, message);
                async_1.TimerWrapper.setTimeout(function () {
                    pipe.transform(emitter);
                    test_lib_1.expect(pipe.transform(emitter)).toBe(message);
                    async.done();
                }, 0);
            }));
            test_lib_1.it("should dispose of the existing subscription when subscribing to a new observable", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                pipe.transform(emitter);
                var newEmitter = new async_1.EventEmitter();
                test_lib_1.expect(pipe.transform(newEmitter)).toBe(null);
                // this should not affect the pipe
                async_1.ObservableWrapper.callNext(emitter, message);
                async_1.TimerWrapper.setTimeout(function () {
                    test_lib_1.expect(pipe.transform(newEmitter)).toBe(null);
                    async.done();
                }, 0);
            }));
            test_lib_1.it("should request a change detection check upon receiving a new value", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                pipe.transform(emitter);
                async_1.ObservableWrapper.callNext(emitter, message);
                async_1.TimerWrapper.setTimeout(function () {
                    test_lib_1.expect(ref.spy('requestCheck')).toHaveBeenCalled();
                    async.done();
                }, 0);
            }));
        });
        test_lib_1.describe("onDestroy", function () {
            test_lib_1.it("should do nothing when no subscription", function () { test_lib_1.expect(function () { return pipe.onDestroy(); }).not.toThrow(); });
            test_lib_1.it("should dispose of the existing subscription", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                pipe.transform(emitter);
                pipe.onDestroy();
                async_1.ObservableWrapper.callNext(emitter, message);
                async_1.TimerWrapper.setTimeout(function () {
                    test_lib_1.expect(pipe.transform(emitter)).toBe(null);
                    async.done();
                }, 0);
            }));
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
//# sourceMappingURL=observable_pipe_spec.js.map