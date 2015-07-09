var collection_1 = require('angular2/src/facade/collection');
var lang_1 = require('angular2/src/facade/lang');
var validators_1 = require('../validators');
function controlPath(name, parent) {
    var p = collection_1.ListWrapper.clone(parent.path);
    collection_1.ListWrapper.push(p, name);
    return p;
}
exports.controlPath = controlPath;
function setUpControl(c, dir) {
    if (lang_1.isBlank(c))
        _throwError(dir, "Cannot find control");
    if (lang_1.isBlank(dir.valueAccessor))
        _throwError(dir, "No value accessor for");
    c.validator = validators_1.Validators.compose([c.validator, dir.validator]);
    dir.valueAccessor.writeValue(c.value);
    dir.valueAccessor.registerOnChange(function (newValue) { return c.updateValue(newValue); });
}
exports.setUpControl = setUpControl;
function _throwError(dir, message) {
    var path = collection_1.ListWrapper.join(dir.path, " -> ");
    throw new lang_1.BaseException(message + " '" + path + "'");
}
//# sourceMappingURL=shared.js.map