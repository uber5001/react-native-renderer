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
var reflection_1 = require('angular2/src/reflection/reflection');
var reflection_capabilities_1 = require('angular2/src/reflection/reflection_capabilities');
var reflector_common_1 = require('./reflector_common');
var AType = (function () {
    function AType(value) {
        this.value = value;
    }
    return AType;
})();
var ClassWithDecorators = (function () {
    function ClassWithDecorators(a, b) {
        this.a = a;
        this.b = b;
    }
    ClassWithDecorators = __decorate([
        reflector_common_1.ClassDecorator('class'),
        __param(0, reflector_common_1.ParamDecorator("a")),
        __param(1, reflector_common_1.ParamDecorator("b")), 
        __metadata('design:paramtypes', [AType, AType])
    ], ClassWithDecorators);
    return ClassWithDecorators;
})();
var ClassWithoutDecorators = (function () {
    function ClassWithoutDecorators(a, b) {
    }
    return ClassWithoutDecorators;
})();
var TestObjWith11Args = (function () {
    function TestObjWith11Args(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11) {
    }
    return TestObjWith11Args;
})();
var TestObj = (function () {
    function TestObj(a, b) {
        this.a = a;
        this.b = b;
    }
    TestObj.prototype.identity = function (arg) { return arg; };
    return TestObj;
})();
var Interface = (function () {
    function Interface() {
    }
    return Interface;
})();
var ClassImplementingInterface = (function () {
    function ClassImplementingInterface() {
    }
    return ClassImplementingInterface;
})();
function main() {
    test_lib_1.describe('Reflector', function () {
        var reflector;
        test_lib_1.beforeEach(function () { reflector = new reflection_1.Reflector(new reflection_capabilities_1.ReflectionCapabilities()); });
        test_lib_1.describe("factory", function () {
            test_lib_1.it("should create a factory for the given type", function () {
                var obj = reflector.factory(TestObj)(1, 2);
                test_lib_1.expect(obj.a).toEqual(1);
                test_lib_1.expect(obj.b).toEqual(2);
            });
            test_lib_1.it("should throw when more than 10 arguments", function () {
                test_lib_1.expect(function () { return reflector.factory(TestObjWith11Args)(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11); })
                    .toThrowError();
            });
            test_lib_1.it("should return a registered factory if available", function () {
                reflector.registerType(TestObj, { "factory": function () { return "fake"; } });
                test_lib_1.expect(reflector.factory(TestObj)()).toEqual("fake");
            });
        });
        test_lib_1.describe("parameters", function () {
            test_lib_1.it("should return an array of parameters for a type", function () {
                var p = reflector.parameters(ClassWithDecorators);
                test_lib_1.expect(p).toEqual([[AType, reflector_common_1.paramDecorator('a')], [AType, reflector_common_1.paramDecorator('b')]]);
            });
            test_lib_1.it("should work for a class without annotations", function () {
                var p = reflector.parameters(ClassWithoutDecorators);
                test_lib_1.expect(p.length).toEqual(2);
            });
            test_lib_1.it("should return registered parameters if available", function () {
                reflector.registerType(TestObj, { "parameters": [1, 2] });
                test_lib_1.expect(reflector.parameters(TestObj)).toEqual([1, 2]);
            });
            test_lib_1.it("should return an empty list when no paramters field in the stored type info", function () {
                reflector.registerType(TestObj, {});
                test_lib_1.expect(reflector.parameters(TestObj)).toEqual([]);
            });
        });
        test_lib_1.describe("annotations", function () {
            test_lib_1.it("should return an array of annotations for a type", function () {
                var p = reflector.annotations(ClassWithDecorators);
                test_lib_1.expect(p).toEqual([reflector_common_1.classDecorator('class')]);
            });
            test_lib_1.it("should return registered annotations if available", function () {
                reflector.registerType(TestObj, { "annotations": [1, 2] });
                test_lib_1.expect(reflector.annotations(TestObj)).toEqual([1, 2]);
            });
            test_lib_1.it("should work for a class without annotations", function () {
                var p = reflector.annotations(ClassWithoutDecorators);
                test_lib_1.expect(p).toEqual([]);
            });
        });
        if (test_lib_1.IS_DARTIUM) {
            test_lib_1.describe("interfaces", function () {
                test_lib_1.it("should return an array of interfaces for a type", function () {
                    var p = reflector.interfaces(ClassImplementingInterface);
                    test_lib_1.expect(p).toEqual([Interface]);
                });
                test_lib_1.it("should return an empty array otherwise", function () {
                    var p = reflector.interfaces(ClassWithDecorators);
                    test_lib_1.expect(p).toEqual([]);
                });
            });
        }
        test_lib_1.describe("getter", function () {
            test_lib_1.it("returns a function reading a property", function () {
                var getA = reflector.getter('a');
                test_lib_1.expect(getA(new TestObj(1, 2))).toEqual(1);
            });
            test_lib_1.it("should return a registered getter if available", function () {
                reflector.registerGetters({ "abc": function (obj) { return "fake"; } });
                test_lib_1.expect(reflector.getter("abc")("anything")).toEqual("fake");
            });
        });
        test_lib_1.describe("setter", function () {
            test_lib_1.it("returns a function setting a property", function () {
                var setA = reflector.setter('a');
                var obj = new TestObj(1, 2);
                setA(obj, 100);
                test_lib_1.expect(obj.a).toEqual(100);
            });
            test_lib_1.it("should return a registered setter if available", function () {
                var updateMe;
                reflector.registerSetters({ "abc": function (obj, value) { updateMe = value; } });
                reflector.setter("abc")("anything", "fake");
                test_lib_1.expect(updateMe).toEqual("fake");
            });
        });
        test_lib_1.describe("method", function () {
            test_lib_1.it("returns a function invoking a method", function () {
                var func = reflector.method('identity');
                var obj = new TestObj(1, 2);
                test_lib_1.expect(func(obj, ['value'])).toEqual('value');
            });
            test_lib_1.it("should return a registered method if available", function () {
                reflector.registerMethods({ "abc": function (obj, args) { return args; } });
                test_lib_1.expect(reflector.method("abc")("anything", ["fake"])).toEqual(['fake']);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=reflector_spec.js.map