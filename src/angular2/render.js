/**
 * @module
 * @public
 * @description
 * This module provides advanced support for extending dom strategy.
 */
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require('./src/render/dom/compiler/template_loader'));
__export(require('./src/render/dom/shadow_dom/shadow_dom_strategy'));
__export(require('./src/render/dom/shadow_dom/native_shadow_dom_strategy'));
__export(require('./src/render/dom/shadow_dom/emulated_scoped_shadow_dom_strategy'));
__export(require('./src/render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy'));
__export(require('./src/render/api'));
//# sourceMappingURL=render.js.map