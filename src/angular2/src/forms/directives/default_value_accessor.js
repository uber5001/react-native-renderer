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
var angular2_1 = require('angular2/angular2');
var api_1 = require('angular2/src/render/api');
var control_directive_1 = require('./control_directive');
/**
 * The default accessor for writing a value and listening to changes that is used by a {@link
  * Control} directive.
 *
 * This is the default strategy that Angular uses when no other accessor is applied.
 *
 *  # Example
 *  ```
 *  <input type="text" [control]="loginControl">
 *  ```
 *
 * @exportedAs angular2/forms
 */
var DefaultValueAccessor = (function () {
    function DefaultValueAccessor(cd, _elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.value = null;
        this.onChange = function (_) { };
        cd.valueAccessor = this;
    }
    DefaultValueAccessor.prototype.writeValue = function (value) {
        this._renderer.setElementProperty(this._elementRef.parentView.render, this._elementRef.boundElementIndex, 'value', value);
    };
    DefaultValueAccessor.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    DefaultValueAccessor = __decorate([
        angular2_1.Directive({
            selector: 'input:not([type=checkbox])[control],textarea[control],input:not([type=checkbox])[form-control],textarea[form-control]',
            hostListeners: { 'change': 'onChange($event.target.value)', 'input': 'onChange($event.target.value)' },
            hostProperties: { 'value': 'value' }
        }), 
        __metadata('design:paramtypes', [control_directive_1.ControlDirective, angular2_1.ElementRef, api_1.Renderer])
    ], DefaultValueAccessor);
    return DefaultValueAccessor;
})();
exports.DefaultValueAccessor = DefaultValueAccessor;
//# sourceMappingURL=default_value_accessor.js.map