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
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var collection_1 = require('angular2/src/facade/collection');
var async_1 = require('angular2/src/facade/async');
var di_1 = require('angular2/di');
var annotations_1 = require('angular2/annotations');
var ng_for_1 = require('angular2/src/directives/ng_for');
var Logger = (function () {
    function Logger() {
        this.log = collection_1.ListWrapper.create();
    }
    Logger.prototype.add = function (thing) { collection_1.ListWrapper.push(this.log, thing); };
    Logger = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], Logger);
    return Logger;
})();
var MessageDir = (function () {
    function MessageDir(logger) {
        this.logger = logger;
    }
    Object.defineProperty(MessageDir.prototype, "message", {
        set: function (newMessage) { this.logger.add(newMessage); },
        enumerable: true,
        configurable: true
    });
    MessageDir = __decorate([
        annotations_1.Directive({ selector: '[message]', properties: ['message'] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [Logger])
    ], MessageDir);
    return MessageDir;
})();
var ChildComp = (function () {
    function ChildComp() {
        this.childBinding = 'Original';
    }
    ChildComp = __decorate([
        annotations_1.Component({ selector: 'child-comp' }),
        annotations_1.View({
            template: "<div class=\"child\" message=\"child\">\n               <span class=\"childnested\" message=\"nestedchild\">Child</span>\n             </div>\n             <span class=\"child\">{{childBinding}}</span>",
            directives: [MessageDir]
        }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ChildComp);
    return ChildComp;
})();
var ParentComp = (function () {
    function ParentComp() {
        this.parentBinding = 'OriginalParent';
    }
    ParentComp = __decorate([
        annotations_1.Component({ selector: 'parent-comp', appInjector: [Logger] }),
        annotations_1.View({
            template: "<div class=\"parent\" message=\"parent\">\n               <span class=\"parentnested\" message=\"nestedparent\">Parent</span>\n             </div>\n             <span class=\"parent\">{{parentBinding}}</span>\n             <child-comp class=\"child-comp-class\"></child-comp>",
            directives: [ChildComp, MessageDir]
        }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ParentComp);
    return ParentComp;
})();
var CustomEmitter = (function () {
    function CustomEmitter() {
        this.myevent = new async_1.EventEmitter();
    }
    CustomEmitter = __decorate([
        annotations_1.Directive({ selector: 'custom-emitter', events: ['myevent'] }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], CustomEmitter);
    return CustomEmitter;
})();
var EventsComp = (function () {
    function EventsComp() {
        this.clicked = false;
        this.customed = false;
    }
    EventsComp.prototype.handleClick = function () { this.clicked = true; };
    EventsComp.prototype.handleCustom = function () { this.customed = true; };
    EventsComp = __decorate([
        annotations_1.Component({ selector: 'events-comp' }),
        annotations_1.View({
            template: "<button (click)=\"handleClick()\"></button>\n             <custom-emitter (myevent)=\"handleCustom()\"></custom-emitter>",
            directives: [CustomEmitter]
        }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], EventsComp);
    return EventsComp;
})();
var UsingFor = (function () {
    function UsingFor() {
        this.stuff = ['one', 'two', 'three'];
    }
    UsingFor = __decorate([
        annotations_1.Component({ selector: 'using-for', appInjector: [Logger] }),
        annotations_1.View({
            template: "<span *ng-for=\"#thing of stuff\">{{thing}}</span>\n            <ul message=\"list\">\n              <li *ng-for=\"#item of stuff\">{{item}}</li>\n            </ul>",
            directives: [ng_for_1.NgFor, MessageDir]
        }),
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], UsingFor);
    return UsingFor;
})();
function main() {
    test_lib_1.describe('debug element', function () {
        test_lib_1.it('should list component child elements', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(ParentComp)
                .then(function (rootTestComponent) {
                rootTestComponent.detectChanges();
                var childEls = rootTestComponent.children;
                // The root is a lone component, and has no children in the light dom.
                test_lib_1.expect(childEls.length).toEqual(0);
                var rootCompChildren = rootTestComponent.componentViewChildren;
                // The root component has 3 elements in its shadow view.
                test_lib_1.expect(rootCompChildren.length).toEqual(3);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(rootCompChildren[0].domElement, 'parent')).toBe(true);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(rootCompChildren[1].domElement, 'parent')).toBe(true);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(rootCompChildren[2].domElement, 'child-comp-class')).toBe(true);
                var nested = rootCompChildren[0].children;
                test_lib_1.expect(nested.length).toEqual(1);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(nested[0].domElement, 'parentnested')).toBe(true);
                var childComponent = rootCompChildren[2];
                test_lib_1.expect(childComponent.children.length).toEqual(0);
                var childCompChildren = childComponent.componentViewChildren;
                test_lib_1.expect(childCompChildren.length).toEqual(2);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(childCompChildren[0].domElement, 'child')).toBe(true);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(childCompChildren[1].domElement, 'child')).toBe(true);
                var childNested = childCompChildren[0].children;
                test_lib_1.expect(childNested.length).toEqual(1);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(childNested[0].domElement, 'childnested')).toBe(true);
                async.done();
            });
        }));
        test_lib_1.it('should list child elements within viewports', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(UsingFor).then(function (rootTestComponent) {
                rootTestComponent.detectChanges();
                var childEls = rootTestComponent.componentViewChildren;
                // TODO should this count include the <template> element?
                test_lib_1.expect(childEls.length).toEqual(5);
                var list = childEls[4];
                test_lib_1.expect(list.children.length).toEqual(4);
                async.done();
            });
        }));
        test_lib_1.it('should query child elements', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(ParentComp)
                .then(function (rootTestComponent) {
                rootTestComponent.detectChanges();
                var childTestEls = rootTestComponent.queryAll(test_lib_1.By.directive(MessageDir));
                test_lib_1.expect(childTestEls.length).toBe(4);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(childTestEls[0].domElement, 'parent')).toBe(true);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(childTestEls[1].domElement, 'parentnested')).toBe(true);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(childTestEls[2].domElement, 'child')).toBe(true);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(childTestEls[3].domElement, 'childnested')).toBe(true);
                async.done();
            });
        }));
        test_lib_1.it('should query child elements in the light DOM', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(ParentComp)
                .then(function (rootTestComponent) {
                rootTestComponent.detectChanges();
                var parentEl = rootTestComponent.componentViewChildren[0];
                var childTestEls = parentEl.queryAll(test_lib_1.By.directive(MessageDir), test_lib_1.Scope.light);
                test_lib_1.expect(childTestEls.length).toBe(1);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(childTestEls[0].domElement, 'parentnested')).toBe(true);
                async.done();
            });
        }));
        test_lib_1.it('should query child elements in the current component view DOM', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(ParentComp)
                .then(function (rootTestComponent) {
                rootTestComponent.detectChanges();
                var childTestEls = rootTestComponent.queryAll(test_lib_1.By.directive(MessageDir), test_lib_1.Scope.view);
                test_lib_1.expect(childTestEls.length).toBe(2);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(childTestEls[0].domElement, 'parent')).toBe(true);
                test_lib_1.expect(dom_adapter_1.DOM.hasClass(childTestEls[1].domElement, 'parentnested')).toBe(true);
                async.done();
            });
        }));
        test_lib_1.it('should allow injecting from the element injector', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(ParentComp)
                .then(function (rootTestComponent) {
                rootTestComponent.detectChanges();
                test_lib_1.expect(rootTestComponent.componentViewChildren[0].inject(Logger).log)
                    .toEqual(['parent', 'nestedparent', 'child', 'nestedchild']);
                async.done();
            });
        }));
        test_lib_1.it('should trigger event handlers', test_lib_1.inject([test_lib_1.TestComponentBuilder, test_lib_1.AsyncTestCompleter], function (tcb, async) {
            tcb.createAsync(EventsComp)
                .then(function (rootTestComponent) {
                rootTestComponent.detectChanges();
                test_lib_1.expect(rootTestComponent.componentInstance.clicked).toBe(false);
                test_lib_1.expect(rootTestComponent.componentInstance.customed).toBe(false);
                rootTestComponent.componentViewChildren[0].triggerEventHandler('click', {});
                test_lib_1.expect(rootTestComponent.componentInstance.clicked).toBe(true);
                rootTestComponent.componentViewChildren[1].triggerEventHandler('myevent', {});
                test_lib_1.expect(rootTestComponent.componentInstance.customed).toBe(true);
                async.done();
            });
        }));
    });
}
exports.main = main;
//# sourceMappingURL=debug_element_spec.js.map