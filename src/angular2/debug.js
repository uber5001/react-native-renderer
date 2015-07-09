function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./src/debug/debug_element'));
var debug_element_view_listener_1 = require('./src/debug/debug_element_view_listener');
exports.inspectDomElement = debug_element_view_listener_1.inspectDomElement;
exports.ELEMENT_PROBE_CONFIG = debug_element_view_listener_1.ELEMENT_PROBE_CONFIG;
//# sourceMappingURL=debug.js.map