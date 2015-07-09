var test_lib_1 = require('angular2/test_lib');
var dom_adapter_1 = require('angular2/src/dom/dom_adapter');
var content_tag_1 = require('angular2/src/render/dom/shadow_dom/content_tag');
var _scriptStart = "<script start=\"\"></script>";
var _scriptEnd = "<script end=\"\"></script>";
function main() {
    test_lib_1.describe('Content', function () {
        var parent;
        var content;
        test_lib_1.beforeEach(function () {
            parent = test_lib_1.el("<div>" + _scriptStart + _scriptEnd);
            content = dom_adapter_1.DOM.firstChild(parent);
        });
        test_lib_1.it("should insert the nodes", function () {
            var c = new content_tag_1.Content(content, '');
            c.init(null);
            c.insert([test_lib_1.el("<a></a>"), test_lib_1.el("<b></b>")]);
            test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(parent))
                .toEqual(_scriptStart + "<a></a><b></b>" + _scriptEnd);
        });
        test_lib_1.it("should remove the nodes from the previous insertion", function () {
            var c = new content_tag_1.Content(content, '');
            c.init(null);
            c.insert([test_lib_1.el("<a></a>")]);
            c.insert([test_lib_1.el("<b></b>")]);
            test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(parent)).toEqual(_scriptStart + "<b></b>" + _scriptEnd);
        });
        test_lib_1.it("should insert empty list", function () {
            var c = new content_tag_1.Content(content, '');
            c.init(null);
            c.insert([test_lib_1.el("<a></a>")]);
            c.insert([]);
            test_lib_1.expect(dom_adapter_1.DOM.getInnerHTML(parent)).toEqual("" + _scriptStart + _scriptEnd);
        });
    });
}
exports.main = main;
//# sourceMappingURL=content_tag_spec.js.map