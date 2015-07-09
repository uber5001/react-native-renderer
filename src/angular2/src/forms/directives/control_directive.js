var validators_1 = require('../validators');
var ControlDirective = (function () {
    function ControlDirective() {
        this.name = null;
        this.valueAccessor = null;
        this.validator = validators_1.Validators.nullValidator;
    }
    Object.defineProperty(ControlDirective.prototype, "path", {
        get: function () { return null; },
        enumerable: true,
        configurable: true
    });
    return ControlDirective;
})();
exports.ControlDirective = ControlDirective;
//# sourceMappingURL=control_directive.js.map