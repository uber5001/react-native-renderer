var collection_1 = require('angular2/src/facade/collection');
var change_detection_1 = require('angular2/change_detection');
var _parser = new change_detection_1.Parser(new change_detection_1.Lexer());
function _createChangeDetectorDefinition(id, propName, expression) {
    var ast = _parser.parseBinding(expression, 'location');
    var bindingRecords = [change_detection_1.BindingRecord.createForElement(ast, 0, propName)];
    var strategy = null;
    var variableBindings = [];
    var directiveRecords = [];
    return new change_detection_1.ChangeDetectorDefinition(id, strategy, variableBindings, bindingRecords, directiveRecords);
}
/**
 * In this case, we expect `id` and `expression` to be the same string.
 */
function getDefinition(id, propName) {
    // TODO(kegluneq): Remove `propName`?
    if (collection_1.ListWrapper.indexOf(_availableDefinitions, id) < 0) {
        throw "No ChangeDetectorDefinition for " + id + " available. Please modify this file if necessary.";
    }
    return _createChangeDetectorDefinition(id, propName, id);
}
exports.getDefinition = getDefinition;
/**
 * Get all available ChangeDetectorDefinition objects. Used to pre-generate Dart
 * `ChangeDetector` classes.
 */
function getAllDefinitions(propName) {
    return collection_1.ListWrapper.map(_availableDefinitions, function (id) { return getDefinition(id, propName); });
}
exports.getAllDefinitions = getAllDefinitions;
var _availableDefinitions = [
    '10',
    '"str"',
    '"a\n\nb"',
    '10 + 2',
    '10 - 2',
    '10 * 2',
    '10 / 2',
    '11 % 2',
    '1 == 1',
    '1 != 1',
    '1 == true',
    '1 === 1',
    '1 !== 1',
    '1 === true',
    '1 < 2',
    '2 < 1',
    '1 > 2',
    '2 > 1',
    '1 <= 2',
    '2 <= 2',
    '2 <= 1',
    '2 >= 1',
    '2 >= 2',
    '1 >= 2',
    'true && true',
    'true && false',
    'true || false',
    'false || false',
    '!true',
    '!!true',
    '1 < 2 ? 1 : 2',
    '1 > 2 ? 1 : 2',
    '["foo", "bar"][0]',
    '{"foo": "bar"}["foo"]'
];
//# sourceMappingURL=simple_watch_config.js.map