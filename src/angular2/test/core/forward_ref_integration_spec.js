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
var test_bed_1 = require('angular2/src/test_lib/test_bed');
var annotations_1 = require('angular2/annotations');
var angular2_1 = require('angular2/angular2');
var di_1 = require('angular2/di');
function main() {
    test_lib_1.describe("forwardRef integration", function () {
        test_lib_1.it('should instantiate components which are declared using forwardRef', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            tb.createView(App).then(function (view) {
                view.detectChanges();
                test_lib_1.expect(view.rootNodes).toHaveText('frame(lock)');
                async.done();
            });
        }));
    });
}
exports.main = main;
var App = (function () {
    function App() {
    }
    App = __decorate([
        annotations_1.Component({ selector: 'app', appInjector: [di_1.forwardRef(function () { return Frame; })] }),
        annotations_1.View({
            template: "<door><lock></lock></door>",
            directives: [
                di_1.bind(di_1.forwardRef(function () { return Door; }))
                    .toClass(di_1.forwardRef(function () { return Door; })),
                di_1.bind(di_1.forwardRef(function () { return Lock; })).toClass(di_1.forwardRef(function () { return Lock; }))
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
})();
var Door = (function () {
    function Door(locks, frame) {
        this.frame = frame;
        this.locks = locks;
    }
    Door = __decorate([
        annotations_1.Component({ selector: 'Lock' }),
        annotations_1.View({
            directives: [angular2_1.NgFor],
            template: "{{frame.name}}(<span *ng-for=\"var lock of locks\">{{lock.name}}</span>)"
        }),
        __param(0, annotations_1.Query(di_1.forwardRef(function () { return Lock; }))),
        __param(1, di_1.Inject(di_1.forwardRef(function () { return Frame; }))), 
        __metadata('design:paramtypes', [angular2_1.QueryList, Frame])
    ], Door);
    return Door;
})();
var Frame = (function () {
    function Frame() {
        this.name = 'frame';
    }
    return Frame;
})();
var Lock = (function () {
    function Lock() {
        this.name = 'lock';
    }
    Lock = __decorate([
        annotations_1.Directive({ selector: 'lock' }), 
        __metadata('design:paramtypes', [])
    ], Lock);
    return Lock;
})();
//# sourceMappingURL=forward_ref_integration_spec.js.map