var test_lib_1 = require('angular2/test_lib');
var key_events_1 = require('angular2/src/render/dom/events/key_events');
function main() {
    test_lib_1.describe('KeyEvents', function () {
        test_lib_1.it('should ignore unrecognized events', function () {
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keydown')).toEqual(null);
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup')).toEqual(null);
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.unknownmodifier.enter')).toEqual(null);
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.unknownmodifier.enter')).toEqual(null);
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('unknownevent.control.shift.enter')).toEqual(null);
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('unknownevent.enter')).toEqual(null);
        });
        test_lib_1.it('should correctly parse event names', function () {
            // key with no modifier
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.enter'))
                .toEqual({ 'domEventName': 'keydown', 'fullKey': 'enter' });
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.enter'))
                .toEqual({ 'domEventName': 'keyup', 'fullKey': 'enter' });
            // key with modifiers:
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.control.shift.enter'))
                .toEqual({ 'domEventName': 'keydown', 'fullKey': 'control.shift.enter' });
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.shift.enter'))
                .toEqual({ 'domEventName': 'keyup', 'fullKey': 'control.shift.enter' });
            // key with modifiers in a different order:
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.shift.control.enter'))
                .toEqual({ 'domEventName': 'keydown', 'fullKey': 'control.shift.enter' });
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.shift.control.enter'))
                .toEqual({ 'domEventName': 'keyup', 'fullKey': 'control.shift.enter' });
            // key that is also a modifier:
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.shift.control'))
                .toEqual({ 'domEventName': 'keydown', 'fullKey': 'shift.control' });
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.shift.control'))
                .toEqual({ 'domEventName': 'keyup', 'fullKey': 'shift.control' });
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keydown.control.shift'))
                .toEqual({ 'domEventName': 'keydown', 'fullKey': 'control.shift' });
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.shift'))
                .toEqual({ 'domEventName': 'keyup', 'fullKey': 'control.shift' });
        });
        test_lib_1.it('should alias esc to escape', function () {
            test_lib_1.expect(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.esc'))
                .toEqual(key_events_1.KeyEventsPlugin.parseEventName('keyup.control.escape'));
        });
    });
}
exports.main = main;
//# sourceMappingURL=key_events_spec.js.map