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
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var angular2_1 = require('angular2/angular2');
var di_1 = require('angular2/di');
var control_container_directive_1 = require('./control_container_directive');
var shared_1 = require('./shared');
var formDirectiveBinding = lang_1.CONST_EXPR(new di_1.Binding(control_container_directive_1.ControlContainerDirective, { toAlias: di_1.FORWARD_REF(function () { return FormModelDirective; }) }));
var FormModelDirective = (function (_super) {
    __extends(FormModelDirective, _super);
    function FormModelDirective() {
        _super.call(this);
        this.form = null;
        this.directives = [];
    }
    FormModelDirective.prototype.onChange = function (_) { this._updateDomValue(); };
    Object.defineProperty(FormModelDirective.prototype, "formDirective", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FormModelDirective.prototype, "path", {
        get: function () { return []; },
        enumerable: true,
        configurable: true
    });
    FormModelDirective.prototype.addControl = function (dir) {
        var c = this.form.find(dir.path);
        shared_1.setUpControl(c, dir);
        c.updateValidity();
        collection_1.ListWrapper.push(this.directives, dir);
    };
    FormModelDirective.prototype.removeControl = function (dir) { collection_1.ListWrapper.remove(this.directives, dir); };
    FormModelDirective.prototype.addControlGroup = function (dir) { };
    FormModelDirective.prototype.removeControlGroup = function (dir) { };
    FormModelDirective.prototype._updateDomValue = function () {
        var _this = this;
        collection_1.ListWrapper.forEach(this.directives, function (dir) {
            var c = _this.form.find(dir.path);
            dir.valueAccessor.writeValue(c.value);
        });
    };
    FormModelDirective = __decorate([
        angular2_1.Directive({
            selector: '[form-model]',
            hostInjector: [formDirectiveBinding],
            properties: ['form: form-model'],
            lifecycle: [angular2_1.onChange]
        }), 
        __metadata('design:paramtypes', [])
    ], FormModelDirective);
    return FormModelDirective;
})(control_container_directive_1.ControlContainerDirective);
exports.FormModelDirective = FormModelDirective;
//# sourceMappingURL=form_model_directive.js.map