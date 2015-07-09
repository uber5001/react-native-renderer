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
var di_1 = require('angular2/di');
var core_1 = require('angular2/core');
var annotations_1 = require('angular2/annotations');
var angular2_1 = require('angular2/angular2');
var browser_adapter_1 = require('angular2/src/dom/browser_adapter');
function main() {
    browser_adapter_1.BrowserDomAdapter.makeCurrent();
    test_lib_1.describe('Query API', function () {
        test_lib_1.it('should contain all directives in the light dom', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var template = '<div text="1"></div>' +
                '<needs-query text="2"><div text="3"></div></needs-query>' +
                '<div text="4"></div>';
            tb.createView(MyComp, { html: template })
                .then(function (view) {
                view.detectChanges();
                test_lib_1.expect(view.rootNodes).toHaveText('2|3|');
                async.done();
            });
        }));
        test_lib_1.it('should reflect dynamically inserted directives', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var template = '<div text="1"></div>' +
                '<needs-query text="2"><div *ng-if="shouldShow" [text]="\'3\'"></div></needs-query>' +
                '<div text="4"></div>';
            tb.createView(MyComp, { html: template })
                .then(function (view) {
                view.detectChanges();
                test_lib_1.expect(view.rootNodes).toHaveText('2|');
                view.context.shouldShow = true;
                view.detectChanges();
                // TODO(rado): figure out why the second tick is necessary.
                view.detectChanges();
                test_lib_1.expect(view.rootNodes).toHaveText('2|3|');
                async.done();
            });
        }));
        test_lib_1.it('should reflect moved directives', test_lib_1.inject([test_bed_1.TestBed, test_lib_1.AsyncTestCompleter], function (tb, async) {
            var template = '<div text="1"></div>' +
                '<needs-query text="2"><div *ng-for="var i of list" [text]="i"></div></needs-query>' +
                '<div text="4"></div>';
            tb.createView(MyComp, { html: template })
                .then(function (view) {
                view.detectChanges();
                view.detectChanges();
                test_lib_1.expect(view.rootNodes).toHaveText('2|1d|2d|3d|');
                view.context.list = ['3d', '2d'];
                view.detectChanges();
                view.detectChanges();
                test_lib_1.expect(view.rootNodes).toHaveText('2|3d|2d|');
                async.done();
            });
        }));
    });
}
exports.main = main;
var TextDirective = (function () {
    function TextDirective() {
    }
    TextDirective = __decorate([
        annotations_1.Directive({ selector: '[text]', properties: ['text'] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TextDirective);
    return TextDirective;
})();
var NeedsQuery = (function () {
    function NeedsQuery(query) {
        this.query = query;
    }
    NeedsQuery = __decorate([
        annotations_1.Component({ selector: 'needs-query' }),
        annotations_1.View({ directives: [angular2_1.NgFor], template: '<div *ng-for="var dir of query">{{dir.text}}|</div>' }),
        di_1.Injectable(),
        __param(0, annotations_1.Query(TextDirective)), 
        __metadata('design:paramtypes', [core_1.QueryList])
    ], NeedsQuery);
    return NeedsQuery;
})();
var _constructiontext = 0;
var MyComp = (function () {
    function MyComp() {
        this.shouldShow = false;
        this.list = ['1d', '2d', '3d'];
    }
    MyComp = __decorate([
        annotations_1.Component({ selector: 'my-comp' }),
        annotations_1.View({ directives: [NeedsQuery, TextDirective, angular2_1.NgIf, angular2_1.NgFor] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], MyComp);
    return MyComp;
})();
//# sourceMappingURL=query_integration_spec.js.map