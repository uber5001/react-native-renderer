var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var test_lib_1 = require('angular2/test_lib');
var event_manager_1 = require('angular2/src/render/dom/events/event_manager');
var ng_zone_1 = require('angular2/src/core/zone/ng_zone');
var collection_1 = require('angular2/src/facade/collection');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
function main() {
    var domEventPlugin;
    test_lib_1.beforeEach(function () { domEventPlugin = new event_manager_1.DomEventsPlugin(); });
    test_lib_1.describe('EventManager', function () {
        test_lib_1.it('should delegate event bindings to plugins', function () {
            var element = test_lib_1.el('<div></div>');
            var handler = function (e) { return e; };
            var plugin = new FakeEventManagerPlugin(['click']);
            var manager = new event_manager_1.EventManager([plugin, domEventPlugin], new FakeNgZone());
            manager.addEventListener(element, 'click', handler);
            test_lib_1.expect(collection_1.MapWrapper.get(plugin._nonBubbleEventHandlers, 'click')).toBe(handler);
        });
        test_lib_1.it('should delegate bubbling events to plugins', function () {
            var element = test_lib_1.el('<div></div>');
            var handler = function (e) { return e; };
            var plugin = new FakeEventManagerPlugin(['click']);
            var manager = new event_manager_1.EventManager([plugin, domEventPlugin], new FakeNgZone());
            manager.addEventListener(element, '^click', handler);
            test_lib_1.expect(collection_1.MapWrapper.get(plugin._bubbleEventHandlers, 'click')).toBe(handler);
        });
        test_lib_1.it('should delegate event bindings to the first plugin supporting the event', function () {
            var element = test_lib_1.el('<div></div>');
            var clickHandler = function (e) { return e; };
            var dblClickHandler = function (e) { return e; };
            var plugin1 = new FakeEventManagerPlugin(['dblclick']);
            var plugin2 = new FakeEventManagerPlugin(['click', 'dblclick']);
            var manager = new event_manager_1.EventManager([plugin1, plugin2], new FakeNgZone());
            manager.addEventListener(element, 'click', clickHandler);
            manager.addEventListener(element, 'dblclick', dblClickHandler);
            test_lib_1.expect(collection_1.MapWrapper.contains(plugin1._nonBubbleEventHandlers, 'click')).toBe(false);
            test_lib_1.expect(collection_1.MapWrapper.get(plugin2._nonBubbleEventHandlers, 'click')).toBe(clickHandler);
            test_lib_1.expect(collection_1.MapWrapper.contains(plugin2._nonBubbleEventHandlers, 'dblclick')).toBe(false);
            test_lib_1.expect(collection_1.MapWrapper.get(plugin1._nonBubbleEventHandlers, 'dblclick')).toBe(dblClickHandler);
        });
        test_lib_1.it('should throw when no plugin can handle the event', function () {
            var element = test_lib_1.el('<div></div>');
            var plugin = new FakeEventManagerPlugin(['dblclick']);
            var manager = new event_manager_1.EventManager([plugin], new FakeNgZone());
            test_lib_1.expect(function () { return manager.addEventListener(element, 'click', null); })
                .toThrowError('No event manager plugin found for event click');
        });
        test_lib_1.it('by default events are only caught on same element', function () {
            var element = test_lib_1.el('<div><div></div></div>');
            var child = dom_adapter_1.DOM.firstChild(element);
            var dispatchedEvent = dom_adapter_1.DOM.createMouseEvent('click');
            var receivedEvent = null;
            var handler = function (e) { receivedEvent = e; };
            var manager = new event_manager_1.EventManager([domEventPlugin], new FakeNgZone());
            manager.addEventListener(element, 'click', handler);
            dom_adapter_1.DOM.dispatchEvent(child, dispatchedEvent);
            test_lib_1.expect(receivedEvent).toBe(null);
        });
        test_lib_1.it('bubbled events are caught when fired from a child', function () {
            var element = test_lib_1.el('<div><div></div></div>');
            // Workaround for https://bugs.webkit.org/show_bug.cgi?id=122755
            dom_adapter_1.DOM.appendChild(dom_adapter_1.DOM.defaultDoc().body, element);
            var child = dom_adapter_1.DOM.firstChild(element);
            var dispatchedEvent = dom_adapter_1.DOM.createMouseEvent('click');
            var receivedEvent = null;
            var handler = function (e) { receivedEvent = e; };
            var manager = new event_manager_1.EventManager([domEventPlugin], new FakeNgZone());
            manager.addEventListener(element, '^click', handler);
            dom_adapter_1.DOM.dispatchEvent(child, dispatchedEvent);
            test_lib_1.expect(receivedEvent).toBe(dispatchedEvent);
        });
        test_lib_1.it('should add and remove global event listeners with correct bubbling', function () {
            var element = test_lib_1.el('<div><div></div></div>');
            dom_adapter_1.DOM.appendChild(dom_adapter_1.DOM.defaultDoc().body, element);
            var dispatchedEvent = dom_adapter_1.DOM.createMouseEvent('click');
            var receivedEvent = null;
            var handler = function (e) { receivedEvent = e; };
            var manager = new event_manager_1.EventManager([domEventPlugin], new FakeNgZone());
            var remover = manager.addGlobalEventListener("document", '^click', handler);
            dom_adapter_1.DOM.dispatchEvent(element, dispatchedEvent);
            test_lib_1.expect(receivedEvent).toBe(dispatchedEvent);
            receivedEvent = null;
            remover();
            dom_adapter_1.DOM.dispatchEvent(element, dispatchedEvent);
            test_lib_1.expect(receivedEvent).toBe(null);
            remover = manager.addGlobalEventListener("document", 'click', handler);
            dom_adapter_1.DOM.dispatchEvent(element, dispatchedEvent);
            test_lib_1.expect(receivedEvent).toBe(null);
        });
    });
}
exports.main = main;
var FakeEventManagerPlugin = (function (_super) {
    __extends(FakeEventManagerPlugin, _super);
    function FakeEventManagerPlugin(supports) {
        _super.call(this);
        this._supports = supports;
        this._nonBubbleEventHandlers = collection_1.MapWrapper.create();
        this._bubbleEventHandlers = collection_1.MapWrapper.create();
    }
    FakeEventManagerPlugin.prototype.supports = function (eventName) { return collection_1.ListWrapper.contains(this._supports, eventName); };
    FakeEventManagerPlugin.prototype.addEventListener = function (element, eventName, handler, shouldSupportBubble) {
        var _this = this;
        collection_1.MapWrapper.set(shouldSupportBubble ? this._bubbleEventHandlers : this._nonBubbleEventHandlers, eventName, handler);
        return function () {
            collection_1.MapWrapper.delete(shouldSupportBubble ? _this._bubbleEventHandlers : _this._nonBubbleEventHandlers, eventName);
        };
    };
    return FakeEventManagerPlugin;
})(event_manager_1.EventManagerPlugin);
var FakeNgZone = (function (_super) {
    __extends(FakeNgZone, _super);
    function FakeNgZone() {
        _super.call(this, { enableLongStackTrace: false });
    }
    FakeNgZone.prototype.run = function (fn) { fn(); };
    FakeNgZone.prototype.runOutsideAngular = function (fn) { return fn(); };
    return FakeNgZone;
})(ng_zone_1.NgZone);
//# sourceMappingURL=event_manager_spec.js.map