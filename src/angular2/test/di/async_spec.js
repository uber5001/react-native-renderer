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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var test_lib_1 = require('angular2/test_lib');
var di_1 = require('angular2/di');
var decorators_1 = require('angular2/src/di/decorators');
var async_1 = require('angular2/src/facade/async');
var lang_1 = require('angular2/src/facade/lang');
var UserList = (function () {
    function UserList() {
    }
    return UserList;
})();
function fetchUsers() {
    return async_1.PromiseWrapper.resolve(new UserList());
}
var SynchronousUserList = (function () {
    function SynchronousUserList() {
    }
    return SynchronousUserList;
})();
var UserController = (function () {
    function UserController(list) {
        this.list = list;
    }
    UserController = __decorate([
        decorators_1.Injectable(), 
        __metadata('design:paramtypes', [UserList])
    ], UserController);
    return UserController;
})();
var AsyncUserController = (function () {
    function AsyncUserController(userList) {
        this.userList = userList;
    }
    AsyncUserController = __decorate([
        decorators_1.Injectable(),
        __param(0, decorators_1.InjectPromise(UserList)), 
        __metadata('design:paramtypes', [Object])
    ], AsyncUserController);
    return AsyncUserController;
})();
function main() {
    test_lib_1.describe("async injection", function () {
        test_lib_1.describe("asyncGet", function () {
            test_lib_1.it('should return a promise', function () {
                var injector = di_1.Injector.resolveAndCreate([di_1.bind(UserList).toAsyncFactory(fetchUsers)]);
                var p = injector.asyncGet(UserList);
                test_lib_1.expect(p).toBePromise();
            });
            test_lib_1.it('should return a promise when the binding is sync', function () {
                var injector = di_1.Injector.resolveAndCreate([SynchronousUserList]);
                var p = injector.asyncGet(SynchronousUserList);
                test_lib_1.expect(p).toBePromise();
            });
            test_lib_1.it("should return a promise when the binding is sync (from cache)", function () {
                var injector = di_1.Injector.resolveAndCreate([UserList]);
                test_lib_1.expect(injector.get(UserList)).toBeAnInstanceOf(UserList);
                test_lib_1.expect(injector.asyncGet(UserList)).toBePromise();
            });
            test_lib_1.it('should return the injector', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var injector = di_1.Injector.resolveAndCreate([]);
                var p = injector.asyncGet(di_1.Injector);
                p.then(function (injector) {
                    test_lib_1.expect(injector).toBe(injector);
                    async.done();
                });
            }));
            test_lib_1.it('should return a promise when instantiating a sync binding ' +
                'with an async dependency', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var injector = di_1.Injector
                    .resolveAndCreate([di_1.bind(UserList).toAsyncFactory(fetchUsers), UserController]);
                injector.asyncGet(UserController)
                    .then(function (userController) {
                    test_lib_1.expect(userController).toBeAnInstanceOf(UserController);
                    test_lib_1.expect(userController.list).toBeAnInstanceOf(UserList);
                    async.done();
                });
            }));
            test_lib_1.it("should create only one instance (async + async)", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var injector = di_1.Injector.resolveAndCreate([di_1.bind(UserList).toAsyncFactory(fetchUsers)]);
                var ul1 = injector.asyncGet(UserList);
                var ul2 = injector.asyncGet(UserList);
                async_1.PromiseWrapper.all([ul1, ul2])
                    .then(function (uls) {
                    test_lib_1.expect(uls[0]).toBe(uls[1]);
                    async.done();
                });
            }));
            test_lib_1.it("should create only one instance (sync + async)", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var injector = di_1.Injector.resolveAndCreate([UserList]);
                var promise = injector.asyncGet(UserList);
                var ul = injector.get(UserList);
                test_lib_1.expect(promise).toBePromise();
                test_lib_1.expect(ul).toBeAnInstanceOf(UserList);
                promise.then(function (ful) {
                    test_lib_1.expect(ful).toBe(ul);
                    async.done();
                });
            }));
            test_lib_1.it('should show the full path when error happens in a constructor', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var injector = di_1.Injector.resolveAndCreate([
                    UserController,
                    di_1.bind(UserList).toAsyncFactory(function () { throw "Broken UserList"; })
                ]);
                var promise = injector.asyncGet(UserController);
                async_1.PromiseWrapper.then(promise, null, function (e) {
                    test_lib_1.expect(e.message).toContain("Error during instantiation of UserList! (" + lang_1.stringify(UserController) + " -> UserList)");
                    async.done();
                });
            }));
        });
        test_lib_1.describe("get", function () {
            test_lib_1.it('should throw when instantiating an async binding', function () {
                var injector = di_1.Injector.resolveAndCreate([di_1.bind(UserList).toAsyncFactory(fetchUsers)]);
                test_lib_1.expect(function () { return injector.get(UserList); })
                    .toThrowError('Cannot instantiate UserList synchronously. It is provided as a promise!');
            });
            test_lib_1.it('should throw when instantiating a sync binding with an async dependency', function () {
                var injector = di_1.Injector.resolveAndCreate([di_1.bind(UserList).toAsyncFactory(fetchUsers), UserController]);
                test_lib_1.expect(function () { return injector.get(UserController); })
                    .toThrowError(new RegExp('Cannot instantiate UserList synchronously. It is provided as a promise!'));
            });
            test_lib_1.it('should not throw when instantiating a sync binding with a resolved async dependency', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
                var injector = di_1.Injector
                    .resolveAndCreate([di_1.bind(UserList).toAsyncFactory(fetchUsers), UserController]);
                injector.asyncGet(UserList).then(function (_) {
                    test_lib_1.expect(function () { injector.get(UserController); }).not.toThrow();
                    async.done();
                });
            }));
            test_lib_1.it('should resolve synchronously when an async dependency requested as a promise', function () {
                var injector = di_1.Injector.resolveAndCreate([di_1.bind(UserList).toAsyncFactory(fetchUsers), AsyncUserController]);
                var controller = injector.get(AsyncUserController);
                test_lib_1.expect(controller).toBeAnInstanceOf(AsyncUserController);
                test_lib_1.expect(controller.userList).toBePromise();
            });
            test_lib_1.it('should wrap sync dependencies into promises if required', function () {
                var injector = di_1.Injector.resolveAndCreate([di_1.bind(UserList).toFactory(function () { return new UserList(); }), AsyncUserController]);
                var controller = injector.get(AsyncUserController);
                test_lib_1.expect(controller).toBeAnInstanceOf(AsyncUserController);
                test_lib_1.expect(controller.userList).toBePromise();
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=async_spec.js.map