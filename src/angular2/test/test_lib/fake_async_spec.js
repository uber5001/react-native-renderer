var test_lib_1 = require('angular2/test_lib');
var async_1 = require('angular2/src/facade/async');
var lang_1 = require('angular2/src/facade/lang');
var change_detection_1 = require('angular2/change_detection');
function main() {
    test_lib_1.describe('fake async', function () {
        test_lib_1.it('should run synchronous code', function () {
            var ran = false;
            test_lib_1.fakeAsync(function () { ran = true; })();
            test_lib_1.expect(ran).toEqual(true);
        });
        test_lib_1.it('should pass arguments to the wrapped function', function () {
            test_lib_1.fakeAsync(function (foo, bar) {
                test_lib_1.expect(foo).toEqual('foo');
                test_lib_1.expect(bar).toEqual('bar');
            })('foo', 'bar');
        });
        test_lib_1.it('should work with inject()', test_lib_1.inject([change_detection_1.Parser], test_lib_1.fakeAsync(function (parser) { test_lib_1.expect(parser).toBeAnInstanceOf(change_detection_1.Parser); })));
        if (!test_lib_1.IS_DARTIUM) {
            test_lib_1.it('should throw on nested calls', function () {
                // TODO(vicb): re-enable once the jasmine patch from zone.js is applied
                if (!test_lib_1.IS_DARTIUM)
                    return;
                test_lib_1.expect(function () { test_lib_1.fakeAsync(function () { test_lib_1.fakeAsync(function () { return null; })(); })(); })
                    .toThrowError('fakeAsync() calls can not be nested');
            });
        }
        test_lib_1.describe('Promise', function () {
            test_lib_1.it('should run asynchronous code', test_lib_1.fakeAsync(function () {
                var thenRan = false;
                async_1.PromiseWrapper.resolve(null).then(function (_) { thenRan = true; });
                test_lib_1.expect(thenRan).toEqual(false);
                test_lib_1.flushMicrotasks();
                test_lib_1.expect(thenRan).toEqual(true);
            }));
            test_lib_1.it('should run chained thens', test_lib_1.fakeAsync(function () {
                var log = new test_lib_1.Log();
                async_1.PromiseWrapper.resolve(null).then(function (_) { return log.add(1); }).then(function (_) { return log.add(2); });
                test_lib_1.expect(log.result()).toEqual('');
                test_lib_1.flushMicrotasks();
                test_lib_1.expect(log.result()).toEqual('1; 2');
            }));
            test_lib_1.it('should run Promise created in Promise', test_lib_1.fakeAsync(function () {
                var log = new test_lib_1.Log();
                async_1.PromiseWrapper.resolve(null).then(function (_) {
                    log.add(1);
                    async_1.PromiseWrapper.resolve(null).then(function (_) { return log.add(2); });
                });
                test_lib_1.expect(log.result()).toEqual('');
                test_lib_1.flushMicrotasks();
                test_lib_1.expect(log.result()).toEqual('1; 2');
            }));
            // TODO(vicb): check why this doesn't work in JS - linked to open issues on GH ?
            test_lib_1.xit('should complain if the test throws an exception during async calls', function () {
                test_lib_1.expect(function () {
                    test_lib_1.fakeAsync(function () {
                        async_1.PromiseWrapper.resolve(null).then(function (_) { throw new lang_1.BaseException('async'); });
                        test_lib_1.flushMicrotasks();
                    })();
                }).toThrowError('async');
            });
            test_lib_1.it('should complain if a test throws an exception', function () {
                test_lib_1.expect(function () { test_lib_1.fakeAsync(function () { throw new lang_1.BaseException('sync'); })(); })
                    .toThrowError('sync');
            });
        });
        test_lib_1.describe('timers', function () {
            test_lib_1.it('should run queued zero duration timer on zero tick', test_lib_1.fakeAsync(function () {
                var ran = false;
                async_1.TimerWrapper.setTimeout(function () { ran = true; }, 0);
                test_lib_1.expect(ran).toEqual(false);
                test_lib_1.tick();
                test_lib_1.expect(ran).toEqual(true);
            }));
            test_lib_1.it('should run queued timer after sufficient clock ticks', test_lib_1.fakeAsync(function () {
                var ran = false;
                async_1.TimerWrapper.setTimeout(function () { ran = true; }, 10);
                test_lib_1.tick(6);
                test_lib_1.expect(ran).toEqual(false);
                test_lib_1.tick(6);
                test_lib_1.expect(ran).toEqual(true);
            }));
            test_lib_1.it('should run queued timer only once', test_lib_1.fakeAsync(function () {
                var cycles = 0;
                async_1.TimerWrapper.setTimeout(function () { cycles++; }, 10);
                test_lib_1.tick(10);
                test_lib_1.expect(cycles).toEqual(1);
                test_lib_1.tick(10);
                test_lib_1.expect(cycles).toEqual(1);
                test_lib_1.tick(10);
                test_lib_1.expect(cycles).toEqual(1);
            }));
            test_lib_1.it('should not run cancelled timer', test_lib_1.fakeAsync(function () {
                var ran = false;
                var id = async_1.TimerWrapper.setTimeout(function () { ran = true; }, 10);
                async_1.TimerWrapper.clearTimeout(id);
                test_lib_1.tick(10);
                test_lib_1.expect(ran).toEqual(false);
            }));
            test_lib_1.it('should throw an error on dangling timers', function () {
                // TODO(vicb): https://github.com/google/quiver-dart/issues/248
                if (test_lib_1.IS_DARTIUM)
                    return;
                test_lib_1.expect(function () { test_lib_1.fakeAsync(function () { async_1.TimerWrapper.setTimeout(function () { }, 10); })(); })
                    .toThrowError('1 timer(s) still in the queue.');
            });
            test_lib_1.it('should throw an error on dangling periodic timers', function () {
                // TODO(vicb): https://github.com/google/quiver-dart/issues/248
                if (test_lib_1.IS_DARTIUM)
                    return;
                test_lib_1.expect(function () { test_lib_1.fakeAsync(function () { async_1.TimerWrapper.setInterval(function () { }, 10); })(); })
                    .toThrowError('1 periodic timer(s) still in the queue.');
            });
            test_lib_1.it('should run periodic timers', test_lib_1.fakeAsync(function () {
                var cycles = 0;
                var id = async_1.TimerWrapper.setInterval(function () { cycles++; }, 10);
                test_lib_1.tick(10);
                test_lib_1.expect(cycles).toEqual(1);
                test_lib_1.tick(10);
                test_lib_1.expect(cycles).toEqual(2);
                test_lib_1.tick(10);
                test_lib_1.expect(cycles).toEqual(3);
                async_1.TimerWrapper.clearInterval(id);
            }));
            test_lib_1.it('should not run cancelled periodic timer', test_lib_1.fakeAsync(function () {
                var ran = false;
                var id = async_1.TimerWrapper.setInterval(function () { ran = true; }, 10);
                async_1.TimerWrapper.clearInterval(id);
                test_lib_1.tick(10);
                test_lib_1.expect(ran).toEqual(false);
            }));
            test_lib_1.it('should be able to cancel periodic timers from a callback', test_lib_1.fakeAsync(function () {
                var cycles = 0;
                var id;
                id = async_1.TimerWrapper.setInterval(function () {
                    cycles++;
                    async_1.TimerWrapper.clearInterval(id);
                }, 10);
                test_lib_1.tick(10);
                test_lib_1.expect(cycles).toEqual(1);
                test_lib_1.tick(10);
                test_lib_1.expect(cycles).toEqual(1);
            }));
            test_lib_1.it('should process microtasks before timers', test_lib_1.fakeAsync(function () {
                var log = new test_lib_1.Log();
                async_1.PromiseWrapper.resolve(null).then(function (_) { return log.add('microtask'); });
                async_1.TimerWrapper.setTimeout(function () { return log.add('timer'); }, 9);
                var id = async_1.TimerWrapper.setInterval(function () { return log.add('periodic timer'); }, 10);
                test_lib_1.expect(log.result()).toEqual('');
                test_lib_1.tick(10);
                test_lib_1.expect(log.result()).toEqual('microtask; timer; periodic timer');
                async_1.TimerWrapper.clearInterval(id);
            }));
            test_lib_1.it('should process micro-tasks created in timers before next timers', test_lib_1.fakeAsync(function () {
                var log = new test_lib_1.Log();
                async_1.PromiseWrapper.resolve(null).then(function (_) { return log.add('microtask'); });
                async_1.TimerWrapper.setTimeout(function () {
                    log.add('timer');
                    async_1.PromiseWrapper.resolve(null).then(function (_) { return log.add('t microtask'); });
                }, 9);
                var id = async_1.TimerWrapper.setInterval(function () {
                    log.add('periodic timer');
                    async_1.PromiseWrapper.resolve(null).then(function (_) { return log.add('pt microtask'); });
                }, 10);
                test_lib_1.tick(10);
                test_lib_1.expect(log.result())
                    .toEqual('microtask; timer; t microtask; periodic timer; pt microtask');
                test_lib_1.tick(10);
                test_lib_1.expect(log.result())
                    .toEqual('microtask; timer; t microtask; periodic timer; pt microtask; periodic timer; pt microtask');
                async_1.TimerWrapper.clearInterval(id);
            }));
        });
        test_lib_1.describe('outside of the fakeAsync zone', function () {
            test_lib_1.it('calling flushMicrotasks should throw', function () {
                test_lib_1.expect(function () { test_lib_1.flushMicrotasks(); })
                    .toThrowError('The code should be running in the fakeAsync zone to call this function');
            });
            test_lib_1.it('calling tick should throw', function () {
                test_lib_1.expect(function () { test_lib_1.tick(); })
                    .toThrowError('The code should be running in the fakeAsync zone to call this function');
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=fake_async_spec.js.map