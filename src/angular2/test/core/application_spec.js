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
var lang_1 = require('angular2/src/facade/lang');
var application_1 = require('angular2/src/core/application');
var annotations_1 = require('angular2/annotations');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var async_1 = require('angular2/src/facade/async');
var di_1 = require('angular2/di');
var life_cycle_1 = require('angular2/src/core/life_cycle/life_cycle');
var testability_1 = require('angular2/src/core/testability/testability');
var dom_renderer_1 = require('angular2/src/render/dom/dom_renderer');
var HelloRootCmp = (function () {
    function HelloRootCmp() {
        this.greeting = 'hello';
    }
    HelloRootCmp = __decorate([
        annotations_1.Component({ selector: 'hello-app' }),
        annotations_1.View({ template: '{{greeting}} world!' }), 
        __metadata('design:paramtypes', [])
    ], HelloRootCmp);
    return HelloRootCmp;
})();
var HelloRootCmpContent = (function () {
    function HelloRootCmpContent() {
    }
    HelloRootCmpContent = __decorate([
        annotations_1.Component({ selector: 'hello-app' }),
        annotations_1.View({ template: 'before: <content></content> after: done' }), 
        __metadata('design:paramtypes', [])
    ], HelloRootCmpContent);
    return HelloRootCmpContent;
})();
var HelloRootCmp2 = (function () {
    function HelloRootCmp2() {
        this.greeting = 'hello';
    }
    HelloRootCmp2 = __decorate([
        annotations_1.Component({ selector: 'hello-app-2' }),
        annotations_1.View({ template: '{{greeting}} world, again!' }), 
        __metadata('design:paramtypes', [])
    ], HelloRootCmp2);
    return HelloRootCmp2;
})();
var HelloRootCmp3 = (function () {
    function HelloRootCmp3(appBinding) {
        this.appBinding = appBinding;
    }
    HelloRootCmp3 = __decorate([
        annotations_1.Component({ selector: 'hello-app' }),
        annotations_1.View({ template: '' }),
        __param(0, di_1.Inject("appBinding")), 
        __metadata('design:paramtypes', [Object])
    ], HelloRootCmp3);
    return HelloRootCmp3;
})();
var HelloRootCmp4 = (function () {
    function HelloRootCmp4(lc) {
        this.lc = lc;
    }
    HelloRootCmp4 = __decorate([
        annotations_1.Component({ selector: 'hello-app' }),
        annotations_1.View({ template: '' }),
        __param(0, di_1.Inject(life_cycle_1.LifeCycle)), 
        __metadata('design:paramtypes', [Object])
    ], HelloRootCmp4);
    return HelloRootCmp4;
})();
var HelloRootMissingTemplate = (function () {
    function HelloRootMissingTemplate() {
    }
    HelloRootMissingTemplate = __decorate([
        annotations_1.Component({ selector: 'hello-app' }), 
        __metadata('design:paramtypes', [])
    ], HelloRootMissingTemplate);
    return HelloRootMissingTemplate;
})();
var HelloRootDirectiveIsNotCmp = (function () {
    function HelloRootDirectiveIsNotCmp() {
    }
    HelloRootDirectiveIsNotCmp = __decorate([
        annotations_1.Directive({ selector: 'hello-app' }), 
        __metadata('design:paramtypes', [])
    ], HelloRootDirectiveIsNotCmp);
    return HelloRootDirectiveIsNotCmp;
})();
function main() {
    var fakeDoc, el, el2, testBindings, lightDom;
    test_lib_1.beforeEach(function () {
        fakeDoc = dom_adapter_1.DOM.createHtmlDocument();
        el = dom_adapter_1.DOM.createElement('hello-app', fakeDoc);
        el2 = dom_adapter_1.DOM.createElement('hello-app-2', fakeDoc);
        lightDom = dom_adapter_1.DOM.createElement('light-dom-el', fakeDoc);
        dom_adapter_1.DOM.appendChild(fakeDoc.body, el);
        dom_adapter_1.DOM.appendChild(fakeDoc.body, el2);
        dom_adapter_1.DOM.appendChild(el, lightDom);
        dom_adapter_1.DOM.setText(lightDom, 'loading');
        testBindings = [di_1.bind(dom_renderer_1.DOCUMENT_TOKEN).toValue(fakeDoc)];
    });
    test_lib_1.describe('bootstrap factory method', function () {
        test_lib_1.it('should throw if bootstrapped Directive is not a Component', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var refPromise = application_1.bootstrap(HelloRootDirectiveIsNotCmp, testBindings, function (e, t) { throw e; });
            async_1.PromiseWrapper.then(refPromise, null, function (reason) {
                test_lib_1.expect(reason.message)
                    .toContain("Could not load '" + lang_1.stringify(HelloRootDirectiveIsNotCmp) + "' because it is not a component.");
                async.done();
                return null;
            });
        }));
        test_lib_1.it('should throw if no element is found', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var refPromise = application_1.bootstrap(HelloRootCmp, [], function (e, t) { throw e; });
            async_1.PromiseWrapper.then(refPromise, null, function (reason) {
                test_lib_1.expect(reason.message).toContain('The selector "hello-app" did not match any elements');
                async.done();
                return null;
            });
        }));
        test_lib_1.it('should create an injector promise', function () {
            var refPromise = application_1.bootstrap(HelloRootCmp, testBindings);
            test_lib_1.expect(refPromise).not.toBe(null);
        });
        test_lib_1.it('should resolve an injector promise and contain bindings', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var refPromise = application_1.bootstrap(HelloRootCmp, testBindings);
            refPromise.then(function (ref) {
                test_lib_1.expect(ref.injector.get(HelloRootCmp)).toBeAnInstanceOf(HelloRootCmp);
                async.done();
            });
        }));
        test_lib_1.it('should provide the application component in the injector', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var refPromise = application_1.bootstrap(HelloRootCmp, testBindings);
            refPromise.then(function (ref) {
                test_lib_1.expect(ref.injector.get(HelloRootCmp)).toBeAnInstanceOf(HelloRootCmp);
                async.done();
            });
        }));
        test_lib_1.it('should display hello world', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var refPromise = application_1.bootstrap(HelloRootCmp, testBindings);
            refPromise.then(function (ref) {
                test_lib_1.expect(el).toHaveText('hello world!');
                async.done();
            });
        }));
        test_lib_1.it('should support multiple calls to bootstrap', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var refPromise1 = application_1.bootstrap(HelloRootCmp, testBindings);
            var refPromise2 = application_1.bootstrap(HelloRootCmp2, testBindings);
            async_1.PromiseWrapper.all([refPromise1, refPromise2])
                .then(function (refs) {
                test_lib_1.expect(el).toHaveText('hello world!');
                test_lib_1.expect(el2).toHaveText('hello world, again!');
                async.done();
            });
        }));
        test_lib_1.it("should make the provided bindings available to the application component", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var refPromise = application_1.bootstrap(HelloRootCmp3, [testBindings, di_1.bind("appBinding").toValue("BoundValue")]);
            refPromise.then(function (ref) {
                test_lib_1.expect(ref.injector.get(HelloRootCmp3).appBinding).toEqual("BoundValue");
                async.done();
            });
        }));
        test_lib_1.it("should avoid cyclic dependencies when root component requires Lifecycle through DI", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var refPromise = application_1.bootstrap(HelloRootCmp4, testBindings);
            refPromise.then(function (ref) {
                test_lib_1.expect(ref.injector.get(HelloRootCmp4).lc).toBe(ref.injector.get(life_cycle_1.LifeCycle));
                async.done();
            });
        }));
        test_lib_1.it("should support shadow dom content tag", test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var refPromise = application_1.bootstrap(HelloRootCmpContent, testBindings);
            refPromise.then(function (ref) {
                test_lib_1.expect(el).toHaveText('before: loading after: done');
                async.done();
            });
        }));
        test_lib_1.it('should register each application with the testability registry', test_lib_1.inject([test_lib_1.AsyncTestCompleter], function (async) {
            var refPromise1 = application_1.bootstrap(HelloRootCmp, testBindings);
            var refPromise2 = application_1.bootstrap(HelloRootCmp2, testBindings);
            async_1.PromiseWrapper.all([refPromise1, refPromise2])
                .then(function (refs) {
                var registry = refs[0].injector.get(testability_1.TestabilityRegistry);
                async_1.PromiseWrapper.all([
                    refs[0]
                        .injector.asyncGet(testability_1.Testability),
                    refs[1].injector.asyncGet(testability_1.Testability)
                ])
                    .then(function (testabilities) {
                    test_lib_1.expect(registry.findTestabilityInTree(el)).toEqual(testabilities[0]);
                    test_lib_1.expect(registry.findTestabilityInTree(el2)).toEqual(testabilities[1]);
                    async.done();
                });
            });
        }));
    });
}
exports.main = main;
//# sourceMappingURL=application_spec.js.map