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
var angular2_1 = require('angular2/angular2');
var di_1 = require('angular2/di');
var control_container_directive_1 = require('./control_container_directive');
var control_directive_1 = require('./control_directive');
var shared_1 = require('./shared');
var controlNameBinding = lang_1.CONST_EXPR(new di_1.Binding(control_directive_1.ControlDirective, { toAlias: di_1.FORWARD_REF(function () { return ControlNameDirective; }) }));
/**
 * Binds a control to a DOM element.
 *
 * # Example
 *
 * In this example, we bind the control to an input element. When the value of the input element
 * changes, the value of
 * the control will reflect that change. Likewise, if the value of the control changes, the input
 * element reflects that
 * change.
 *
 * Here we use {@link formDirectives}, rather than importing each form directive individually, e.g.
 * `ControlDirective`, `ControlGroupDirective`. This is just a shorthand for the same end result.
 *
 *  ```
 * @Component({selector: "login-comp"})
 * @View({
 *      directives: [formDirectives],
 *      template: "<input type='text' [control]='loginControl'>"
 *      })
 * class LoginComp {
 *  loginControl:Control;
 *
 *  constructor() {
 *    this.loginControl = new Control('');
 *  }
 * }
 *
 *  ```
 *
 * @exportedAs angular2/forms
 */
var ControlNameDirective = (function (_super) {
    __extends(ControlNameDirective, _super);
    function ControlNameDirective(_parent) {
        _super.call(this);
        this._parent = _parent;
    }
    ControlNameDirective.prototype.onInit = function () { this.formDirective.addControl(this); };
    ControlNameDirective.prototype.onDestroy = function () { this.formDirective.removeControl(this); };
    Object.defineProperty(ControlNameDirective.prototype, "path", {
        get: function () { return shared_1.controlPath(this.name, this._parent); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ControlNameDirective.prototype, "formDirective", {
        get: function () { return this._parent.formDirective; },
        enumerable: true,
        configurable: true
    });
    ControlNameDirective = __decorate([
        angular2_1.Directive({
            selector: '[control]',
            hostInjector: [controlNameBinding],
            properties: ['name: control'],
            lifecycle: [angular2_1.onDestroy, angular2_1.onInit]
        }),
        __param(0, angular2_1.Ancestor()), 
        __metadata('design:paramtypes', [control_container_directive_1.ControlContainerDirective])
    ], ControlNameDirective);
    return ControlNameDirective;
})(control_directive_1.ControlDirective);
exports.ControlNameDirective = ControlNameDirective;
//# sourceMappingURL=control_name_directive.js.map