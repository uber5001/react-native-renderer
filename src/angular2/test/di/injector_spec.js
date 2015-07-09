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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var lang_1 = require('angular2/src/facade/lang');
var test_lib_1 = require('angular2/test_lib');
var di_1 = require('angular2/di');
var decorators_1 = require('angular2/src/di/decorators');
var ann = require('angular2/src/di/annotations_impl');
var CustomDependencyAnnotation = (function (_super) {
    __extends(CustomDependencyAnnotation, _super);
    function CustomDependencyAnnotation() {
        _super.apply(this, arguments);
    }
    return CustomDependencyAnnotation;
})(di_1.DependencyAnnotation);
var Engine = (function () {
    function Engine() {
    }
    return Engine;
})();
var BrokenEngine = (function () {
    function BrokenEngine() {
        throw new lang_1.BaseException("Broken Engine");
    }
    return BrokenEngine;
})();
var DashboardSoftware = (function () {
    function DashboardSoftware() {
    }
    return DashboardSoftware;
})();
var Dashboard = (function () {
    function Dashboard(software) {
    }
    Dashboard = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [DashboardSoftware])
    ], Dashboard);
    return Dashboard;
})();
var TurboEngine = (function (_super) {
    __extends(TurboEngine, _super);
    function TurboEngine() {
        _super.apply(this, arguments);
    }
    return TurboEngine;
})(Engine);
var Car = (function () {
    function Car(engine) {
        this.engine = engine;
    }
    Car = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [Engine])
    ], Car);
    return Car;
})();
var CarWithLazyEngine = (function () {
    function CarWithLazyEngine(engineFactory) {
        this.engineFactory = engineFactory;
    }
    CarWithLazyEngine = __decorate([
        di_1.Injectable(),
        __param(0, decorators_1.InjectLazy(Engine)), 
        __metadata('design:paramtypes', [Object])
    ], CarWithLazyEngine);
    return CarWithLazyEngine;
})();
var CarWithOptionalEngine = (function () {
    function CarWithOptionalEngine(engine) {
        this.engine = engine;
    }
    CarWithOptionalEngine = __decorate([
        di_1.Injectable(),
        __param(0, decorators_1.Optional()), 
        __metadata('design:paramtypes', [Engine])
    ], CarWithOptionalEngine);
    return CarWithOptionalEngine;
})();
var CarWithDashboard = (function () {
    function CarWithDashboard(engine, dashboard) {
        this.engine = engine;
        this.dashboard = dashboard;
    }
    CarWithDashboard = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [Engine, Dashboard])
    ], CarWithDashboard);
    return CarWithDashboard;
})();
var SportsCar = (function (_super) {
    __extends(SportsCar, _super);
    function SportsCar(engine) {
        _super.call(this, engine);
    }
    SportsCar = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [Engine])
    ], SportsCar);
    return SportsCar;
})(Car);
var CarWithInject = (function () {
    function CarWithInject(engine) {
        this.engine = engine;
    }
    CarWithInject = __decorate([
        di_1.Injectable(),
        __param(0, decorators_1.Inject(TurboEngine)), 
        __metadata('design:paramtypes', [Engine])
    ], CarWithInject);
    return CarWithInject;
})();
var CyclicEngine = (function () {
    function CyclicEngine(car) {
    }
    CyclicEngine = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [Car])
    ], CyclicEngine);
    return CyclicEngine;
})();
var NoAnnotations = (function () {
    function NoAnnotations(secretDependency) {
    }
    return NoAnnotations;
})();
function main() {
    test_lib_1.describe('injector', function () {
        test_lib_1.it('should instantiate a class without dependencies', function () {
            var injector = di_1.Injector.resolveAndCreate([Engine]);
            var engine = injector.get(Engine);
            test_lib_1.expect(engine).toBeAnInstanceOf(Engine);
        });
        test_lib_1.it('should resolve dependencies based on type information', function () {
            var injector = di_1.Injector.resolveAndCreate([Engine, Car]);
            var car = injector.get(Car);
            test_lib_1.expect(car).toBeAnInstanceOf(Car);
            test_lib_1.expect(car.engine).toBeAnInstanceOf(Engine);
        });
        test_lib_1.it('should resolve dependencies based on @Inject annotation', function () {
            var injector = di_1.Injector.resolveAndCreate([TurboEngine, Engine, CarWithInject]);
            var car = injector.get(CarWithInject);
            test_lib_1.expect(car).toBeAnInstanceOf(CarWithInject);
            test_lib_1.expect(car.engine).toBeAnInstanceOf(TurboEngine);
        });
        test_lib_1.it('should throw when no type and not @Inject', function () {
            test_lib_1.expect(function () { return di_1.Injector.resolveAndCreate([NoAnnotations]); })
                .toThrowError('Cannot resolve all parameters for NoAnnotations. ' +
                'Make sure they all have valid type or annotations.');
        });
        test_lib_1.it('should cache instances', function () {
            var injector = di_1.Injector.resolveAndCreate([Engine]);
            var e1 = injector.get(Engine);
            var e2 = injector.get(Engine);
            test_lib_1.expect(e1).toBe(e2);
        });
        test_lib_1.it('should bind to a value', function () {
            var injector = di_1.Injector.resolveAndCreate([di_1.bind(Engine).toValue("fake engine")]);
            var engine = injector.get(Engine);
            test_lib_1.expect(engine).toEqual("fake engine");
        });
        test_lib_1.it('should bind to a factory', function () {
            function sportsCarFactory(e) { return new SportsCar(e); }
            var injector = di_1.Injector.resolveAndCreate([Engine, di_1.bind(Car).toFactory(sportsCarFactory, [Engine])]);
            var car = injector.get(Car);
            test_lib_1.expect(car).toBeAnInstanceOf(SportsCar);
            test_lib_1.expect(car.engine).toBeAnInstanceOf(Engine);
        });
        test_lib_1.it('should bind to an alias', function () {
            var injector = di_1.Injector.resolveAndCreate([Engine, di_1.bind(SportsCar).toClass(SportsCar), di_1.bind(Car).toAlias(SportsCar)]);
            var car = injector.get(Car);
            var sportsCar = injector.get(SportsCar);
            test_lib_1.expect(car).toBeAnInstanceOf(SportsCar);
            test_lib_1.expect(car).toBe(sportsCar);
        });
        test_lib_1.it('should throw when the aliased binding does not exist', function () {
            var injector = di_1.Injector.resolveAndCreate([di_1.bind('car').toAlias(SportsCar)]);
            var e = "No provider for " + lang_1.stringify(SportsCar) + "! (car -> " + lang_1.stringify(SportsCar) + ")";
            test_lib_1.expect(function () { return injector.get('car'); }).toThrowError(e);
        });
        test_lib_1.it('should throw with a meaningful message when the aliased binding is blank', function () {
            test_lib_1.expect(function () { return di_1.bind('car').toAlias(null); }).toThrowError('Can not alias car to a blank value!');
        });
        test_lib_1.it('should handle forwardRef in toAlias', function () {
            var injector = di_1.Injector.resolveAndCreate([
                di_1.bind('originalEngine')
                    .toClass(di_1.forwardRef(function () { return Engine; })),
                di_1.bind('aliasedEngine').toAlias(di_1.forwardRef(function () { return 'originalEngine'; }))
            ]);
            test_lib_1.expect(injector.get('aliasedEngine')).toBeAnInstanceOf(Engine);
        });
        test_lib_1.it('should support overriding factory dependencies', function () {
            var injector = di_1.Injector
                .resolveAndCreate([Engine, di_1.bind(Car).toFactory(function (e) { return new SportsCar(e); }, [Engine])]);
            var car = injector.get(Car);
            test_lib_1.expect(car).toBeAnInstanceOf(SportsCar);
            test_lib_1.expect(car.engine).toBeAnInstanceOf(Engine);
        });
        test_lib_1.it('should support optional dependencies', function () {
            var injector = di_1.Injector.resolveAndCreate([CarWithOptionalEngine]);
            var car = injector.get(CarWithOptionalEngine);
            test_lib_1.expect(car.engine).toEqual(null);
        });
        test_lib_1.it("should flatten passed-in bindings", function () {
            var injector = di_1.Injector.resolveAndCreate([[[Engine, Car]]]);
            var car = injector.get(Car);
            test_lib_1.expect(car).toBeAnInstanceOf(Car);
        });
        test_lib_1.it("should use the last binding when there are multiple bindings for same token", function () {
            var injector = di_1.Injector
                .resolveAndCreate([di_1.bind(Engine).toClass(Engine), di_1.bind(Engine).toClass(TurboEngine)]);
            test_lib_1.expect(injector.get(Engine)).toBeAnInstanceOf(TurboEngine);
        });
        test_lib_1.it('should use non-type tokens', function () {
            var injector = di_1.Injector.resolveAndCreate([di_1.bind('token').toValue('value')]);
            test_lib_1.expect(injector.get('token')).toEqual('value');
        });
        test_lib_1.it('should throw when given invalid bindings', function () {
            test_lib_1.expect(function () { return di_1.Injector.resolveAndCreate(["blah"]); })
                .toThrowError('Invalid binding - only instances of Binding and Type are allowed, got: blah');
            test_lib_1.expect(function () { return di_1.Injector.resolveAndCreate([di_1.bind("blah")]); })
                .toThrowError('Invalid binding - only instances of Binding and Type are allowed, ' +
                'got: blah');
        });
        test_lib_1.it('should provide itself', function () {
            var parent = di_1.Injector.resolveAndCreate([]);
            var child = parent.resolveAndCreateChild([]);
            test_lib_1.expect(child.get(di_1.Injector)).toBe(child);
        });
        test_lib_1.it('should throw when no provider defined', function () {
            var injector = di_1.Injector.resolveAndCreate([]);
            test_lib_1.expect(function () { return injector.get('NonExisting'); }).toThrowError('No provider for NonExisting!');
        });
        test_lib_1.it('should show the full path when no provider', function () {
            var injector = di_1.Injector.resolveAndCreate([CarWithDashboard, Engine, Dashboard]);
            test_lib_1.expect(function () { return injector.get(CarWithDashboard); })
                .toThrowError("No provider for DashboardSoftware! (" + lang_1.stringify(CarWithDashboard) + " -> " + lang_1.stringify(Dashboard) + " -> DashboardSoftware)");
        });
        test_lib_1.it('should throw when trying to instantiate a cyclic dependency', function () {
            var injector = di_1.Injector.resolveAndCreate([Car, di_1.bind(Engine).toClass(CyclicEngine)]);
            test_lib_1.expect(function () { return injector.get(Car); })
                .toThrowError("Cannot instantiate cyclic dependency! (" + lang_1.stringify(Car) + " -> " + lang_1.stringify(Engine) + " -> " + lang_1.stringify(Car) + ")");
            test_lib_1.expect(function () { return injector.asyncGet(Car); })
                .toThrowError("Cannot instantiate cyclic dependency! (" + lang_1.stringify(Car) + " -> " + lang_1.stringify(Engine) + " -> " + lang_1.stringify(Car) + ")");
        });
        test_lib_1.it('should show the full path when error happens in a constructor', function () {
            var injector = di_1.Injector.resolveAndCreate([Car, di_1.bind(Engine).toClass(BrokenEngine)]);
            try {
                injector.get(Car);
                throw "Must throw";
            }
            catch (e) {
                test_lib_1.expect(e.message)
                    .toContain("Error during instantiation of Engine! (" + lang_1.stringify(Car) + " -> Engine)");
                test_lib_1.expect(e.cause instanceof lang_1.BaseException).toBeTruthy();
                test_lib_1.expect(e.causeKey.token).toEqual(Engine);
            }
        });
        test_lib_1.it('should instantiate an object after a failed attempt', function () {
            var isBroken = true;
            var injector = di_1.Injector.resolveAndCreate([Car, di_1.bind(Engine).toFactory(function () { return isBroken ? new BrokenEngine() : new Engine(); })]);
            test_lib_1.expect(function () { return injector.get(Car); }).toThrowError(new RegExp("Error"));
            isBroken = false;
            test_lib_1.expect(injector.get(Car)).toBeAnInstanceOf(Car);
        });
        test_lib_1.it('should support null values', function () {
            var injector = di_1.Injector.resolveAndCreate([di_1.bind('null').toValue(null)]);
            test_lib_1.expect(injector.get('null')).toBe(null);
        });
        test_lib_1.describe("default bindings", function () {
            test_lib_1.it("should be used when no matching binding found", function () {
                var injector = di_1.Injector.resolveAndCreate([], { defaultBindings: true });
                var car = injector.get(Car);
                test_lib_1.expect(car).toBeAnInstanceOf(Car);
            });
            test_lib_1.it("should use the matching binding when it is available", function () {
                var injector = di_1.Injector.resolveAndCreate([di_1.bind(Car).toClass(SportsCar)], { defaultBindings: true });
                var car = injector.get(Car);
                test_lib_1.expect(car).toBeAnInstanceOf(SportsCar);
            });
        });
        test_lib_1.describe("child", function () {
            test_lib_1.it('should load instances from parent injector', function () {
                var parent = di_1.Injector.resolveAndCreate([Engine]);
                var child = parent.resolveAndCreateChild([]);
                var engineFromParent = parent.get(Engine);
                var engineFromChild = child.get(Engine);
                test_lib_1.expect(engineFromChild).toBe(engineFromParent);
            });
            test_lib_1.it("should not use the child bindings when resolving the dependencies of a parent binding", function () {
                var parent = di_1.Injector.resolveAndCreate([Car, Engine]);
                var child = parent.resolveAndCreateChild([di_1.bind(Engine).toClass(TurboEngine)]);
                var carFromChild = child.get(Car);
                test_lib_1.expect(carFromChild.engine).toBeAnInstanceOf(Engine);
            });
            test_lib_1.it('should create new instance in a child injector', function () {
                var parent = di_1.Injector.resolveAndCreate([Engine]);
                var child = parent.resolveAndCreateChild([di_1.bind(Engine).toClass(TurboEngine)]);
                var engineFromParent = parent.get(Engine);
                var engineFromChild = child.get(Engine);
                test_lib_1.expect(engineFromParent).not.toBe(engineFromChild);
                test_lib_1.expect(engineFromChild).toBeAnInstanceOf(TurboEngine);
            });
            test_lib_1.it("should create child injectors without default bindings", function () {
                var parent = di_1.Injector.resolveAndCreate([], { defaultBindings: true });
                var child = parent.resolveAndCreateChild([]);
                // child delegates to parent the creation of Car
                var childCar = child.get(Car);
                var parentCar = parent.get(Car);
                test_lib_1.expect(childCar).toBe(parentCar);
            });
            test_lib_1.it("should give access to direct parent", function () {
                var parent = di_1.Injector.resolveAndCreate([]);
                var child = parent.resolveAndCreateChild([]);
                test_lib_1.expect(child.parent).toBe(parent);
            });
        });
        test_lib_1.describe("lazy", function () {
            test_lib_1.it("should create dependencies lazily", function () {
                var injector = di_1.Injector.resolveAndCreate([Engine, CarWithLazyEngine]);
                var car = injector.get(CarWithLazyEngine);
                test_lib_1.expect(car.engineFactory()).toBeAnInstanceOf(Engine);
            });
            test_lib_1.it("should cache instance created lazily", function () {
                var injector = di_1.Injector.resolveAndCreate([Engine, CarWithLazyEngine]);
                var car = injector.get(CarWithLazyEngine);
                var e1 = car.engineFactory();
                var e2 = car.engineFactory();
                test_lib_1.expect(e1).toBe(e2);
            });
        });
        test_lib_1.describe('resolve', function () {
            test_lib_1.it('should resolve and flatten', function () {
                var bindings = di_1.Injector.resolve([Engine, [BrokenEngine]]);
                bindings.forEach(function (b) {
                    if (lang_1.isBlank(b))
                        return; // the result is a sparse array
                    test_lib_1.expect(b instanceof di_1.ResolvedBinding).toBe(true);
                });
            });
            test_lib_1.it('should resolve forward references', function () {
                var bindings = di_1.Injector.resolve([
                    di_1.forwardRef(function () { return Engine; }),
                    [di_1.bind(di_1.forwardRef(function () { return BrokenEngine; })).toClass(di_1.forwardRef(function () { return Engine; }))],
                    di_1.bind(di_1.forwardRef(function () { return String; })).toFactory(function () { return 'OK'; }, [di_1.forwardRef(function () { return Engine; })]),
                    di_1.bind(di_1.forwardRef(function () { return DashboardSoftware; }))
                        .toAsyncFactory(function () { return 123; }, [di_1.forwardRef(function () { return BrokenEngine; })])
                ]);
                var engineBinding = bindings[di_1.Key.get(Engine).id];
                var brokenEngineBinding = bindings[di_1.Key.get(BrokenEngine).id];
                var stringBinding = bindings[di_1.Key.get(String).id];
                var dashboardSoftwareBinding = bindings[di_1.Key.get(DashboardSoftware).id];
                test_lib_1.expect(engineBinding.factory() instanceof Engine).toBe(true);
                test_lib_1.expect(brokenEngineBinding.factory() instanceof Engine).toBe(true);
                test_lib_1.expect(stringBinding.dependencies[0].key).toEqual(di_1.Key.get(Engine));
                test_lib_1.expect(dashboardSoftwareBinding.dependencies[0].key).toEqual(di_1.Key.get(BrokenEngine));
            });
            test_lib_1.it('should support overriding factory dependencies with dependency annotations', function () {
                var bindings = di_1.Injector.resolve([di_1.bind("token")
                        .toFactory(function (e) { return "result"; }, [[new ann.Inject("dep"), new CustomDependencyAnnotation()]])]);
                var binding = bindings[di_1.Key.get("token").id];
                test_lib_1.expect(binding.dependencies[0].key.token).toEqual("dep");
                test_lib_1.expect(binding.dependencies[0].properties).toEqual([new CustomDependencyAnnotation()]);
            });
        });
    });
}
exports.main = main;
//# sourceMappingURL=injector_spec.js.map