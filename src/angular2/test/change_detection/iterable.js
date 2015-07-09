var TestIterable = (function () {
    function TestIterable() {
        this.list = [];
    }
    TestIterable.prototype[Symbol.iterator] = function () { return this.list[Symbol.iterator](); };
    return TestIterable;
})();
exports.TestIterable = TestIterable;
//# sourceMappingURL=iterable.js.map