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
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var TestObj = (function () {
    function TestObj(prop) {
        this.prop = prop;
    }
    TestObj.prototype.someFunc = function () { return -1; };
    TestObj.prototype.someComplexFunc = function (a) { return a; };
    return TestObj;
})();
var SpyTestObj = (function (_super) {
    __extends(SpyTestObj, _super);
    function SpyTestObj() {
        _super.call(this, TestObj);
    }
    SpyTestObj.prototype.noSuchMethod = function (m) { return _super.prototype.noSuchMethod.call(this, m); };
    SpyTestObj = __decorate([
        test_lib_1.proxy,
        lang_1.IMPLEMENTS(TestObj), 
        __metadata('design:paramtypes', [])
    ], SpyTestObj);
    return SpyTestObj;
})(test_lib_1.SpyObject);
function main() {
    test_lib_1.describe('test_lib', function () {
        test_lib_1.describe('equality', function () {
            test_lib_1.it('should structurally compare objects', function () {
                var expected = new TestObj(new TestObj({ 'one': [1, 2] }));
                var actual = new TestObj(new TestObj({ 'one': [1, 2] }));
                var falseActual = new TestObj(new TestObj({ 'one': [1, 3] }));
                test_lib_1.expect(actual).toEqual(expected);
                test_lib_1.expect(falseActual).not.toEqual(expected);
            });
        });
        test_lib_1.describe('toEqual for Maps', function () {
            test_lib_1.it('should detect equality for same reference', function () {
                var m1 = collection_1.MapWrapper.createFromStringMap({ 'a': 1 });
                test_lib_1.expect(m1).toEqual(m1);
            });
            test_lib_1.it('should detect equality for same content', function () {
                test_lib_1.expect(collection_1.MapWrapper.createFromStringMap({ 'a': 1 }))
                    .toEqual(collection_1.MapWrapper.createFromStringMap({ 'a': 1 }));
            });
            test_lib_1.it('should detect missing entries', function () {
                test_lib_1.expect(collection_1.MapWrapper.createFromStringMap({ 'a': 1 }))
                    .not.toEqual(collection_1.MapWrapper.createFromStringMap({}));
            });
            test_lib_1.it('should detect different values', function () {
                test_lib_1.expect(collection_1.MapWrapper.createFromStringMap({ 'a': 1 }))
                    .not.toEqual(collection_1.MapWrapper.createFromStringMap({ 'a': 2 }));
            });
            test_lib_1.it('should detect additional entries', function () {
                test_lib_1.expect(collection_1.MapWrapper.createFromStringMap({ 'a': 1 }))
                    .not.toEqual(collection_1.MapWrapper.createFromStringMap({ 'a': 1, 'b': 1 }));
            });
        });
        test_lib_1.describe("spy objects", function () {
            var spyObj;
            test_lib_1.beforeEach(function () { spyObj = new SpyTestObj(); });
            test_lib_1.it("should pass the runtime check", function () {
                var t = spyObj;
                test_lib_1.expect(t).toBeDefined();
            });
            test_lib_1.it("should return a new spy func with no calls", function () { test_lib_1.expect(spyObj.spy("someFunc")).not.toHaveBeenCalled(); });
            test_lib_1.it("should record function calls", function () {
                spyObj.spy("someFunc").andCallFake(function (a, b) { return a + b; });
                test_lib_1.expect(spyObj.someFunc(1, 2)).toEqual(3);
                test_lib_1.expect(spyObj.spy("someFunc")).toHaveBeenCalledWith(1, 2);
            });
            test_lib_1.it("should match multiple function calls", function () {
                spyObj.someFunc(1, 2);
                spyObj.someFunc(3, 4);
                test_lib_1.expect(spyObj.spy("someFunc")).toHaveBeenCalledWith(1, 2);
                test_lib_1.expect(spyObj.spy("someFunc")).toHaveBeenCalledWith(3, 4);
            });
            test_lib_1.it("should match null arguments", function () {
                spyObj.someFunc(null, "hello");
                test_lib_1.expect(spyObj.spy("someFunc")).toHaveBeenCalledWith(null, "hello");
            });
            test_lib_1.it("should match using deep equality", function () {
                spyObj.someComplexFunc([1]);
                test_lib_1.expect(spyObj.spy("someComplexFunc")).toHaveBeenCalledWith([1]);
            });
            test_lib_1.it("should support stubs", function () {
                var s = test_lib_1.SpyObject.stub({ "a": 1 }, { "b": 2 });
                test_lib_1.expect(s.a()).toEqual(1);
                test_lib_1.expect(s.b()).toEqual(2);
            });
            test_lib_1.it('should create spys for all methods', function () { test_lib_1.expect(function () { return spyObj.someFunc(); }).not.toThrow(); });
            test_lib_1.it('should create a default spy that does not fail for numbers', function () {
                // Need to return null instead of undefined so that rtts assert does
                // not fail...
                test_lib_1.expect(spyObj.someFunc()).toBe(null);
            });
        });
        test_lib_1.describe('containsRegexp', function () {
            test_lib_1.it('should allow any prefix and suffix', function () {
                test_lib_1.expect(lang_1.RegExpWrapper.firstMatch(test_lib_1.containsRegexp('b'), 'abc')).toBeTruthy();
                test_lib_1.expect(lang_1.RegExpWrapper.firstMatch(test_lib_1.containsRegexp('b'), 'adc')).toBeFalsy();
            });
            test_lib_1.it('should match various special characters', function () {
                test_lib_1.expect(lang_1.RegExpWrapper.firstMatch(test_lib_1.containsRegexp('a.b'), 'a.b')).toBeTruthy();
                test_lib_1.expect(lang_1.RegExpWrapper.firstMatch(test_lib_1.containsRegexp('axb'), 'a.b')).toBeFalsy();
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=test_lib_spec.js.map