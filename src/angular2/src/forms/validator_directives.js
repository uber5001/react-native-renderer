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
var validators_1 = require('./validators');
var directives_1 = require('./directives');
var RequiredValidatorDirective = (function () {
    function RequiredValidatorDirective(c) {
        c.validator = validators_1.Validators.compose([c.validator, validators_1.Validators.required]);
    }
    RequiredValidatorDirective = __decorate([
        angular2_1.Directive({ selector: '[required]' }), 
        __metadata('design:paramtypes', [directives_1.ControlDirective])
    ], RequiredValidatorDirective);
    return RequiredValidatorDirective;
})();
exports.RequiredValidatorDirective = RequiredValidatorDirective;
//# sourceMappingURL=validator_directives.js.map