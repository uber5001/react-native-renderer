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
var async_1 = require('angular2/src/facade/async');
var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var decorators_1 = require('angular2/src/core/annotations/decorators');
var di_1 = require('angular2/di');
var control_container_directive_1 = require('./control_container_directive');
var model_1 = require('../model');
var shared_1 = require('./shared');
var formDirectiveBinding = lang_1.CONST_EXPR(new di_1.Binding(control_container_directive_1.ControlContainerDirective, { toAlias: di_1.FORWARD_REF(function () { return TemplateDrivenFormDirective; }) }));
var TemplateDrivenFormDirective = (function (_super) {
    __extends(TemplateDrivenFormDirective, _super);
    function TemplateDrivenFormDirective() {
        _super.call(this);
        this.form = new model_1.ControlGroup({});
    }
    Object.defineProperty(TemplateDrivenFormDirective.prototype, "formDirective", {
        get: function () { return this; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateDrivenFormDirective.prototype, "path", {
        get: function () { return []; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateDrivenFormDirective.prototype, "controls", {
        get: function () { return this.form.controls; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TemplateDrivenFormDirective.prototype, "value", {
        get: function () { return this.form.value; },
        enumerable: true,
        configurable: true
    });
    TemplateDrivenFormDirective.prototype.addControl = function (dir) {
        var _this = this;
        this._later(function (_) {
            var group = _this._findContainer(dir.path);
            var c = new model_1.Control("");
            shared_1.setUpControl(c, dir);
            group.addControl(dir.name, c);
        });
    };
    TemplateDrivenFormDirective.prototype.removeControl = function (dir) {
        var _this = this;
        this._later(function (_) {
            var c = _this._findContainer(dir.path);
            if (lang_1.isPresent(c))
                c.removeControl(dir.name);
        });
    };
    TemplateDrivenFormDirective.prototype.addControlGroup = function (dir) {
        var _this = this;
        this._later(function (_) {
            var group = _this._findContainer(dir.path);
            var c = new model_1.ControlGroup({});
            group.addControl(dir.name, c);
        });
    };
    TemplateDrivenFormDirective.prototype.removeControlGroup = function (dir) {
        var _this = this;
        this._later(function (_) {
            var c = _this._findContainer(dir.path);
            if (lang_1.isPresent(c))
                c.removeControl(dir.name);
        });
    };
    TemplateDrivenFormDirective.prototype._findContainer = function (path) {
        collection_1.ListWrapper.removeLast(path);
        return this.form.find(path);
    };
    TemplateDrivenFormDirective.prototype._later = function (fn) {
        var c = async_1.PromiseWrapper.completer();
        async_1.PromiseWrapper.then(c.promise, fn, function (_) { });
        c.resolve(null);
    };
    TemplateDrivenFormDirective = __decorate([
        decorators_1.Directive({ selector: '[form]', hostInjector: [formDirectiveBinding] }), 
        __metadata('design:paramtypes', [])
    ], TemplateDrivenFormDirective);
    return TemplateDrivenFormDirective;
})(control_container_directive_1.ControlContainerDirective);
exports.TemplateDrivenFormDirective = TemplateDrivenFormDirective;
//# sourceMappingURL=template_driven_form_directive.js.map