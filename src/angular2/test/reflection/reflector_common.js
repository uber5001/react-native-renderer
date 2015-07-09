var decorators_1 = require('angular2/src/util/decorators');
var ClassDecoratorImpl = (function () {
    function ClassDecoratorImpl(value) {
        this.value = value;
    }
    return ClassDecoratorImpl;
})();
exports.ClassDecoratorImpl = ClassDecoratorImpl;
var ParamDecoratorImpl = (function () {
    function ParamDecoratorImpl(value) {
        this.value = value;
    }
    return ParamDecoratorImpl;
})();
exports.ParamDecoratorImpl = ParamDecoratorImpl;
function classDecorator(value) {
    return new ClassDecoratorImpl(value);
}
exports.classDecorator = classDecorator;
function paramDecorator(value) {
    return new ParamDecoratorImpl(value);
}
exports.paramDecorator = paramDecorator;
exports.ClassDecorator = decorators_1.makeDecorator(ClassDecoratorImpl);
exports.ParamDecorator = decorators_1.makeParamDecorator(ParamDecoratorImpl);
//# sourceMappingURL=reflector_common.js.map