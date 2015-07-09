var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var test_lib_1 = require('angular2/test_lib');
var lang_1 = require('angular2/src/facade/lang');
var collection_1 = require('angular2/src/facade/collection');
var change_detection_1 = require('angular2/change_detection');
var simple_watch_config_1 = require('./simple_watch_config');
var simple_watch_classes_1 = require('./generated/simple_watch_classes');
function main() {
    // These tests also run against pre-generated Dart Change Detectors. We will move tests up from
    // the loop below as they are converted.
    collection_1.ListWrapper.forEach(['dynamic', 'JIT', 'Pregen'], function (cdType) {
        if (cdType == "JIT" && test_lib_1.IS_DARTIUM)
            return;
        if (cdType == "Pregen" && !test_lib_1.IS_DARTIUM)
            return;
        test_lib_1.describe(cdType + " Change Detector", function () {
            function _getProtoChangeDetector(def) {
                var registry = null;
                switch (cdType) {
                    case 'dynamic':
                        return new change_detection_1.DynamicProtoChangeDetector(registry, def);
                    case 'JIT':
                        return new change_detection_1.JitProtoChangeDetector(registry, def);
                    case 'Pregen':
                        return simple_watch_classes_1.getFactoryById(def.id)(registry, def);
                    default:
                        return null;
                }
            }
            function _bindConstValue(expression) {
                var dispatcher = new TestDispatcher();
                var protoCd = _getProtoChangeDetector(simple_watch_config_1.getDefinition(expression, 'propName'));
                var cd = protoCd.instantiate(dispatcher);
                var context = null;
                var locals = null;
                cd.hydrate(context, locals, null);
                cd.detectChanges();
                return dispatcher.log;
            }
            test_lib_1.it('should support literals', function () { test_lib_1.expect(_bindConstValue('10')).toEqual(['propName=10']); });
            test_lib_1.it('should strip quotes from literals', function () { test_lib_1.expect(_bindConstValue('"str"')).toEqual(['propName=str']); });
            test_lib_1.it('should support newlines in literals', function () { test_lib_1.expect(_bindConstValue('"a\n\nb"')).toEqual(['propName=a\n\nb']); });
            test_lib_1.it('should support + operations', function () { test_lib_1.expect(_bindConstValue('10 + 2')).toEqual(['propName=12']); });
            test_lib_1.it('should support - operations', function () { test_lib_1.expect(_bindConstValue('10 - 2')).toEqual(['propName=8']); });
            test_lib_1.it('should support * operations', function () { test_lib_1.expect(_bindConstValue('10 * 2')).toEqual(['propName=20']); });
            test_lib_1.it('should support / operations', function () {
                test_lib_1.expect(_bindConstValue('10 / 2')).toEqual([("propName=" + 5.0)]);
            }); // dart exp=5.0, js exp=5
            test_lib_1.it('should support % operations', function () { test_lib_1.expect(_bindConstValue('11 % 2')).toEqual(['propName=1']); });
            test_lib_1.it('should support == operations on identical', function () { test_lib_1.expect(_bindConstValue('1 == 1')).toEqual(['propName=true']); });
            test_lib_1.it('should support != operations', function () { test_lib_1.expect(_bindConstValue('1 != 1')).toEqual(['propName=false']); });
            test_lib_1.it('should support == operations on coerceible', function () {
                var expectedValue = test_lib_1.IS_DARTIUM ? 'false' : 'true';
                test_lib_1.expect(_bindConstValue('1 == true')).toEqual([("propName=" + expectedValue)]);
            });
            test_lib_1.it('should support === operations on identical', function () { test_lib_1.expect(_bindConstValue('1 === 1')).toEqual(['propName=true']); });
            test_lib_1.it('should support !== operations', function () { test_lib_1.expect(_bindConstValue('1 !== 1')).toEqual(['propName=false']); });
            test_lib_1.it('should support === operations on coerceible', function () { test_lib_1.expect(_bindConstValue('1 === true')).toEqual(['propName=false']); });
            test_lib_1.it('should support true < operations', function () { test_lib_1.expect(_bindConstValue('1 < 2')).toEqual(['propName=true']); });
            test_lib_1.it('should support false < operations', function () { test_lib_1.expect(_bindConstValue('2 < 1')).toEqual(['propName=false']); });
            test_lib_1.it('should support false > operations', function () { test_lib_1.expect(_bindConstValue('1 > 2')).toEqual(['propName=false']); });
            test_lib_1.it('should support true > operations', function () { test_lib_1.expect(_bindConstValue('2 > 1')).toEqual(['propName=true']); });
            test_lib_1.it('should support true <= operations', function () { test_lib_1.expect(_bindConstValue('1 <= 2')).toEqual(['propName=true']); });
            test_lib_1.it('should support equal <= operations', function () { test_lib_1.expect(_bindConstValue('2 <= 2')).toEqual(['propName=true']); });
            test_lib_1.it('should support false <= operations', function () { test_lib_1.expect(_bindConstValue('2 <= 1')).toEqual(['propName=false']); });
            test_lib_1.it('should support true >= operations', function () { test_lib_1.expect(_bindConstValue('2 >= 1')).toEqual(['propName=true']); });
            test_lib_1.it('should support equal >= operations', function () { test_lib_1.expect(_bindConstValue('2 >= 2')).toEqual(['propName=true']); });
            test_lib_1.it('should support false >= operations', function () { test_lib_1.expect(_bindConstValue('1 >= 2')).toEqual(['propName=false']); });
            test_lib_1.it('should support true && operations', function () { test_lib_1.expect(_bindConstValue('true && true')).toEqual(['propName=true']); });
            test_lib_1.it('should support false && operations', function () { test_lib_1.expect(_bindConstValue('true && false')).toEqual(['propName=false']); });
            test_lib_1.it('should support true || operations', function () { test_lib_1.expect(_bindConstValue('true || false')).toEqual(['propName=true']); });
            test_lib_1.it('should support false || operations', function () { test_lib_1.expect(_bindConstValue('false || false')).toEqual(['propName=false']); });
            test_lib_1.it('should support negate', function () { test_lib_1.expect(_bindConstValue('!true')).toEqual(['propName=false']); });
            test_lib_1.it('should support double negate', function () { test_lib_1.expect(_bindConstValue('!!true')).toEqual(['propName=true']); });
            test_lib_1.it('should support true conditionals', function () { test_lib_1.expect(_bindConstValue('1 < 2 ? 1 : 2')).toEqual(['propName=1']); });
            test_lib_1.it('should support false conditionals', function () { test_lib_1.expect(_bindConstValue('1 > 2 ? 1 : 2')).toEqual(['propName=2']); });
            test_lib_1.it('should support keyed access to a list item', function () { test_lib_1.expect(_bindConstValue('["foo", "bar"][0]')).toEqual(['propName=foo']); });
            test_lib_1.it('should support keyed access to a map item', function () { test_lib_1.expect(_bindConstValue('{"foo": "bar"}["foo"]')).toEqual(['propName=bar']); });
        });
    });
    test_lib_1.describe("change detection", function () {
        collection_1.StringMapWrapper.forEach({
            "dynamic": function (bindingRecords, variableBindings, directiveRecords, registry, strategy) {
                if (variableBindings === void 0) { variableBindings = null; }
                if (directiveRecords === void 0) { directiveRecords = null; }
                if (registry === void 0) { registry = null; }
                if (strategy === void 0) { strategy = null; }
                return new change_detection_1.DynamicProtoChangeDetector(registry, new change_detection_1.ChangeDetectorDefinition(null, strategy, lang_1.isBlank(variableBindings) ? [] : variableBindings, lang_1.isBlank(bindingRecords) ? [] : bindingRecords, lang_1.isBlank(directiveRecords) ? [] : directiveRecords));
            },
            "JIT": function (bindingRecords, variableBindings, directiveRecords, registry, strategy) {
                if (variableBindings === void 0) { variableBindings = null; }
                if (directiveRecords === void 0) { directiveRecords = null; }
                if (registry === void 0) { registry = null; }
                if (strategy === void 0) { strategy = null; }
                return new change_detection_1.JitProtoChangeDetector(registry, new change_detection_1.ChangeDetectorDefinition(null, strategy, lang_1.isBlank(variableBindings) ? [] :
                    variableBindings, lang_1.isBlank(bindingRecords) ? [] : bindingRecords, lang_1.isBlank(directiveRecords) ? [] : directiveRecords));
            }
        }, function (createProtoChangeDetector, name) {
            if (name == "JIT" && test_lib_1.IS_DARTIUM)
                return;
            var parser = new change_detection_1.Parser(new change_detection_1.Lexer());
            function ast(exp, location) {
                if (location === void 0) { location = 'location'; }
                return parser.parseBinding(exp, location);
            }
            function dirs(directives) { return new FakeDirectives(directives, []); }
            function convertLocalsToVariableBindings(locals) {
                var variableBindings = [];
                var loc = locals;
                while (lang_1.isPresent(loc)) {
                    collection_1.MapWrapper.forEach(loc.current, function (v, k) { return collection_1.ListWrapper.push(variableBindings, k); });
                    loc = loc.parent;
                }
                return variableBindings;
            }
            function createChangeDetector(propName, exp, context, locals, registry) {
                if (context === void 0) { context = null; }
                if (locals === void 0) { locals = null; }
                if (registry === void 0) { registry = null; }
                var dispatcher = new TestDispatcher();
                var variableBindings = convertLocalsToVariableBindings(locals);
                var records = [change_detection_1.BindingRecord.createForElement(ast(exp), 0, propName)];
                var pcd = createProtoChangeDetector(records, variableBindings, [], registry);
                var cd = pcd.instantiate(dispatcher);
                cd.hydrate(context, locals, null);
                return { "changeDetector": cd, "dispatcher": dispatcher };
            }
            function executeWatch(memo, exp, context, locals) {
                if (context === void 0) { context = null; }
                if (locals === void 0) { locals = null; }
                var res = createChangeDetector(memo, exp, context, locals);
                res["changeDetector"].detectChanges();
                return res["dispatcher"].log;
            }
            test_lib_1.describe(name + " change detection", function () {
                var dispatcher;
                test_lib_1.beforeEach(function () { dispatcher = new TestDispatcher(); });
                test_lib_1.it('should do simple watching', function () {
                    var person = new Person("misko");
                    var c = createChangeDetector('name', 'name', person);
                    var cd = c["changeDetector"];
                    var dispatcher = c["dispatcher"];
                    cd.detectChanges();
                    test_lib_1.expect(dispatcher.log).toEqual(['name=misko']);
                    dispatcher.clear();
                    cd.detectChanges();
                    test_lib_1.expect(dispatcher.log).toEqual([]);
                    dispatcher.clear();
                    person.name = "Misko";
                    cd.detectChanges();
                    test_lib_1.expect(dispatcher.log).toEqual(['name=Misko']);
                });
                test_lib_1.it('should report all changes on the first run including uninitialized values', function () {
                    test_lib_1.expect(executeWatch('value', 'value', new Uninitialized())).toEqual(['value=null']);
                });
                test_lib_1.it('should report all changes on the first run including null values', function () {
                    var td = new TestData(null);
                    test_lib_1.expect(executeWatch('a', 'a', td)).toEqual(['a=null']);
                });
                test_lib_1.it('should support simple chained property access', function () {
                    var address = new Address('Grenoble');
                    var person = new Person('Victor', address);
                    test_lib_1.expect(executeWatch('address.city', 'address.city', person))
                        .toEqual(['address.city=Grenoble']);
                });
                test_lib_1.it('should support the safe navigation operator', function () {
                    var person = new Person('Victor', null);
                    test_lib_1.expect(executeWatch('city', 'address?.city', person)).toEqual(['city=null']);
                    test_lib_1.expect(executeWatch('city', 'address?.toString()', person)).toEqual(['city=null']);
                    person.address = new Address('MTV');
                    test_lib_1.expect(executeWatch('city', 'address?.city', person)).toEqual(['city=MTV']);
                    test_lib_1.expect(executeWatch('city', 'address?.toString()', person)).toEqual(['city=MTV']);
                });
                test_lib_1.it("should support method calls", function () {
                    var person = new Person('Victor');
                    test_lib_1.expect(executeWatch('m', 'sayHi("Jim")', person)).toEqual(['m=Hi, Jim']);
                });
                test_lib_1.it("should support function calls", function () {
                    var td = new TestData(function () { return function (a) { return a; }; });
                    test_lib_1.expect(executeWatch('value', 'a()(99)', td)).toEqual(['value=99']);
                });
                test_lib_1.it("should support chained method calls", function () {
                    var person = new Person('Victor');
                    var td = new TestData(person);
                    test_lib_1.expect(executeWatch('m', 'a.sayHi("Jim")', td)).toEqual(['m=Hi, Jim']);
                });
                test_lib_1.it("should support literal array", function () {
                    var c = createChangeDetector('array', '[1,2]');
                    c["changeDetector"].detectChanges();
                    test_lib_1.expect(c["dispatcher"].loggedValues).toEqual([[1, 2]]);
                    c = createChangeDetector('array', '[1,a]', new TestData(2));
                    c["changeDetector"].detectChanges();
                    test_lib_1.expect(c["dispatcher"].loggedValues).toEqual([[1, 2]]);
                });
                test_lib_1.it("should support literal maps", function () {
                    var c = createChangeDetector('map', '{z:1}');
                    c["changeDetector"].detectChanges();
                    test_lib_1.expect(c["dispatcher"].loggedValues[0]['z']).toEqual(1);
                    c = createChangeDetector('map', '{z:a}', new TestData(1));
                    c["changeDetector"].detectChanges();
                    test_lib_1.expect(c["dispatcher"].loggedValues[0]['z']).toEqual(1);
                });
                test_lib_1.it("should support interpolation", function () {
                    var ast = parser.parseInterpolation("B{{a}}A", "location");
                    var pcd = createProtoChangeDetector([change_detection_1.BindingRecord.createForElement(ast, 0, "memo")]);
                    var cd = pcd.instantiate(dispatcher);
                    cd.hydrate(new TestData("value"), null, null);
                    cd.detectChanges();
                    test_lib_1.expect(dispatcher.log).toEqual(["memo=BvalueA"]);
                });
                test_lib_1.describe("change notification", function () {
                    test_lib_1.describe("simple checks", function () {
                        test_lib_1.it("should pass a change record to the dispatcher", function () {
                            var person = new Person('bob');
                            var c = createChangeDetector('name', 'name', person);
                            var cd = c["changeDetector"];
                            var dispatcher = c["dispatcher"];
                            cd.detectChanges();
                            test_lib_1.expect(dispatcher.loggedValues).toEqual(['bob']);
                        });
                    });
                    test_lib_1.describe("pipes", function () {
                        test_lib_1.it("should pass a change record to the dispatcher", function () {
                            var registry = new FakePipeRegistry('pipe', function () { return new CountingPipe(); });
                            var person = new Person('bob');
                            var c = createChangeDetector('name', 'name | pipe', person, null, registry);
                            var cd = c["changeDetector"];
                            var dispatcher = c["dispatcher"];
                            cd.detectChanges();
                            test_lib_1.expect(dispatcher.loggedValues).toEqual(['bob state:0']);
                        });
                    });
                    test_lib_1.describe("updating directives", function () {
                        var dirRecord1 = new change_detection_1.DirectiveRecord({
                            directiveIndex: new change_detection_1.DirectiveIndex(0, 0),
                            callOnChange: true,
                            callOnCheck: true,
                            callOnAllChangesDone: true
                        });
                        var dirRecord2 = new change_detection_1.DirectiveRecord({
                            directiveIndex: new change_detection_1.DirectiveIndex(0, 1),
                            callOnChange: true,
                            callOnCheck: true,
                            callOnAllChangesDone: true
                        });
                        var dirRecordNoCallbacks = new change_detection_1.DirectiveRecord({
                            directiveIndex: new change_detection_1.DirectiveIndex(0, 0),
                            callOnChange: false,
                            callOnCheck: false,
                            callOnAllChangesDone: false
                        });
                        function updateA(exp, dirRecord) {
                            return change_detection_1.BindingRecord.createForDirective(ast(exp), "a", function (o, v) { return o.a = v; }, dirRecord);
                        }
                        function updateB(exp, dirRecord) {
                            return change_detection_1.BindingRecord.createForDirective(ast(exp), "b", function (o, v) { return o.b = v; }, dirRecord);
                        }
                        var directive1;
                        var directive2;
                        test_lib_1.beforeEach(function () {
                            directive1 = new TestDirective();
                            directive2 = new TestDirective();
                        });
                        test_lib_1.it("should happen directly, without invoking the dispatcher", function () {
                            var pcd = createProtoChangeDetector([updateA("42", dirRecord1)], [], [dirRecord1]);
                            var cd = pcd.instantiate(dispatcher);
                            cd.hydrate(null, null, dirs([directive1]));
                            cd.detectChanges();
                            test_lib_1.expect(dispatcher.loggedValues).toEqual([]);
                            test_lib_1.expect(directive1.a).toEqual(42);
                        });
                        test_lib_1.describe("onChange", function () {
                            test_lib_1.it("should notify the directive when a group of records changes", function () {
                                var pcd = createProtoChangeDetector([
                                    updateA("1", dirRecord1),
                                    updateB("2", dirRecord1),
                                    change_detection_1.BindingRecord.createDirectiveOnChange(dirRecord1),
                                    updateA("3", dirRecord2),
                                    change_detection_1.BindingRecord.createDirectiveOnChange(dirRecord2)
                                ], [], [dirRecord1, dirRecord2]);
                                var cd = pcd.instantiate(dispatcher);
                                cd.hydrate(null, null, dirs([directive1, directive2]));
                                cd.detectChanges();
                                test_lib_1.expect(directive1.changes).toEqual({ 'a': 1, 'b': 2 });
                                test_lib_1.expect(directive2.changes).toEqual({ 'a': 3 });
                            });
                        });
                        test_lib_1.describe("onCheck", function () {
                            test_lib_1.it("should notify the directive when it is checked", function () {
                                var pcd = createProtoChangeDetector([change_detection_1.BindingRecord.createDirectiveOnCheck(dirRecord1)], [], [dirRecord1]);
                                var cd = pcd.instantiate(dispatcher);
                                cd.hydrate(null, null, dirs([directive1]));
                                cd.detectChanges();
                                test_lib_1.expect(directive1.onCheckCalled).toBe(true);
                                directive1.onCheckCalled = false;
                                cd.detectChanges();
                                test_lib_1.expect(directive1.onCheckCalled).toBe(true);
                            });
                            test_lib_1.it("should not call onCheck in detectNoChanges", function () {
                                var pcd = createProtoChangeDetector([change_detection_1.BindingRecord.createDirectiveOnCheck(dirRecord1)], [], [dirRecord1]);
                                var cd = pcd.instantiate(dispatcher);
                                cd.hydrate(null, null, dirs([directive1]));
                                cd.checkNoChanges();
                                test_lib_1.expect(directive1.onCheckCalled).toBe(false);
                            });
                        });
                        test_lib_1.describe("onInit", function () {
                            test_lib_1.it("should notify the directive after it has been checked the first time", function () {
                                var pcd = createProtoChangeDetector([change_detection_1.BindingRecord.createDirectiveOnInit(dirRecord1)], [], [dirRecord1]);
                                var cd = pcd.instantiate(dispatcher);
                                cd.hydrate(null, null, dirs([directive1]));
                                cd.detectChanges();
                                test_lib_1.expect(directive1.onInitCalled).toBe(true);
                                directive1.onInitCalled = false;
                                cd.detectChanges();
                                test_lib_1.expect(directive1.onInitCalled).toBe(false);
                            });
                            test_lib_1.it("should not call onInit in detectNoChanges", function () {
                                var pcd = createProtoChangeDetector([change_detection_1.BindingRecord.createDirectiveOnInit(dirRecord1)], [], [dirRecord1]);
                                var cd = pcd.instantiate(dispatcher);
                                cd.hydrate(null, null, dirs([directive1]));
                                cd.checkNoChanges();
                                test_lib_1.expect(directive1.onInitCalled).toBe(false);
                            });
                        });
                        test_lib_1.describe("onAllChangesDone", function () {
                            test_lib_1.it("should be called after processing all the children", function () {
                                var pcd = createProtoChangeDetector([], [], [dirRecord1, dirRecord2]);
                                var cd = pcd.instantiate(dispatcher);
                                cd.hydrate(null, null, dirs([directive1, directive2]));
                                cd.detectChanges();
                                test_lib_1.expect(directive1.onChangesDoneCalled).toBe(true);
                                test_lib_1.expect(directive2.onChangesDoneCalled).toBe(true);
                                // reset directives
                                directive1.onChangesDoneCalled = false;
                                directive2.onChangesDoneCalled = false;
                                // Verify that checking should not call them.
                                cd.checkNoChanges();
                                test_lib_1.expect(directive1.onChangesDoneCalled).toBe(false);
                                test_lib_1.expect(directive2.onChangesDoneCalled).toBe(false);
                                // re-verify that changes are still detected
                                cd.detectChanges();
                                test_lib_1.expect(directive1.onChangesDoneCalled).toBe(true);
                                test_lib_1.expect(directive2.onChangesDoneCalled).toBe(true);
                            });
                            test_lib_1.it("should not be called when onAllChangesDone is false", function () {
                                var pcd = createProtoChangeDetector([updateA("1", dirRecordNoCallbacks)], [], [dirRecordNoCallbacks]);
                                var cd = pcd.instantiate(dispatcher);
                                cd.hydrate(null, null, dirs([directive1]));
                                cd.detectChanges();
                                test_lib_1.expect(directive1.onChangesDoneCalled).toEqual(false);
                            });
                            test_lib_1.it("should be called in reverse order so the child is always notified before the parent", function () {
                                var pcd = createProtoChangeDetector([], [], [dirRecord1, dirRecord2]);
                                var cd = pcd.instantiate(dispatcher);
                                var onChangesDoneCalls = [];
                                var td1;
                                td1 = new TestDirective(function () { return collection_1.ListWrapper.push(onChangesDoneCalls, td1); });
                                var td2;
                                td2 = new TestDirective(function () { return collection_1.ListWrapper.push(onChangesDoneCalls, td2); });
                                cd.hydrate(null, null, dirs([td1, td2]));
                                cd.detectChanges();
                                test_lib_1.expect(onChangesDoneCalls).toEqual([td2, td1]);
                            });
                            test_lib_1.it("should be called before processing shadow dom children", function () {
                                var pcd = createProtoChangeDetector([], null, [dirRecord1]);
                                var shadowDomChildPCD = createProtoChangeDetector([updateA("1", dirRecord1)], null, [dirRecord1]);
                                var parent = pcd.instantiate(dispatcher);
                                var child = shadowDomChildPCD.instantiate(dispatcher);
                                parent.addShadowDomChild(child);
                                var directiveInShadowDom = new TestDirective();
                                var parentDirective = new TestDirective(function () { test_lib_1.expect(directiveInShadowDom.a).toBe(null); });
                                parent.hydrate(null, null, dirs([parentDirective]));
                                child.hydrate(null, null, dirs([directiveInShadowDom]));
                                parent.detectChanges();
                            });
                        });
                    });
                });
                test_lib_1.describe("reading directives", function () {
                    var index = new change_detection_1.DirectiveIndex(0, 0);
                    var dirRecord = new change_detection_1.DirectiveRecord({ directiveIndex: new change_detection_1.DirectiveIndex(0, 0) });
                    test_lib_1.it("should read directive properties", function () {
                        var directive = new TestDirective();
                        directive.a = "aaa";
                        var pcd = createProtoChangeDetector([change_detection_1.BindingRecord.createForHostProperty(index, ast("a"), "prop")], null, [dirRecord]);
                        var cd = pcd.instantiate(dispatcher);
                        cd.hydrate(null, null, dirs([directive]));
                        cd.detectChanges();
                        test_lib_1.expect(dispatcher.loggedValues).toEqual(['aaa']);
                    });
                });
                test_lib_1.describe("enforce no new changes", function () {
                    test_lib_1.it("should throw when a record gets changed after it has been checked", function () {
                        var pcd = createProtoChangeDetector([change_detection_1.BindingRecord.createForElement(ast("a"), 0, "a")]);
                        var dispatcher = new TestDispatcher();
                        var cd = pcd.instantiate(dispatcher);
                        cd.hydrate(new TestData('value'), null, null);
                        test_lib_1.expect(function () { cd.checkNoChanges(); })
                            .toThrowError(new RegExp("Expression 'a in location' has changed after it was checked"));
                    });
                    test_lib_1.it("should not break the next run", function () {
                        var pcd = createProtoChangeDetector([change_detection_1.BindingRecord.createForElement(ast("a"), 0, "a")]);
                        var dispatcher = new TestDispatcher();
                        var cd = pcd.instantiate(dispatcher);
                        cd.hydrate(new TestData('value'), null, null);
                        test_lib_1.expect(function () { return cd.checkNoChanges(); })
                            .toThrowError(new RegExp("Expression 'a in location' has changed after it was checked."));
                        cd.detectChanges();
                        test_lib_1.expect(dispatcher.loggedValues).toEqual(['value']);
                    });
                });
                // TODO vsavkin: implement it
                test_lib_1.describe("error handling", function () {
                    test_lib_1.xit("should wrap exceptions into ChangeDetectionError", function () {
                        var pcd = createProtoChangeDetector();
                        var cd = pcd.instantiate(new TestDispatcher(), [change_detection_1.BindingRecord.createForElement(ast("invalidProp"), 0, "a")], null, []);
                        cd.hydrate(null, null);
                        try {
                            cd.detectChanges();
                            throw new lang_1.BaseException("fail");
                        }
                        catch (e) {
                            test_lib_1.expect(e).toBeAnInstanceOf(change_detection_1.ChangeDetectionError);
                            test_lib_1.expect(e.location).toEqual("invalidProp in someComponent");
                        }
                    });
                });
                test_lib_1.describe("Locals", function () {
                    test_lib_1.it('should read a value from locals', function () {
                        var locals = new change_detection_1.Locals(null, collection_1.MapWrapper.createFromPairs([["key", "value"]]));
                        test_lib_1.expect(executeWatch('key', 'key', null, locals)).toEqual(['key=value']);
                    });
                    test_lib_1.it('should invoke a function from local', function () {
                        var locals = new change_detection_1.Locals(null, collection_1.MapWrapper.createFromPairs([["key", function () { return "value"; }]]));
                        test_lib_1.expect(executeWatch('key', 'key()', null, locals)).toEqual(['key=value']);
                    });
                    test_lib_1.it('should handle nested locals', function () {
                        var nested = new change_detection_1.Locals(null, collection_1.MapWrapper.createFromPairs([["key", "value"]]));
                        var locals = new change_detection_1.Locals(nested, collection_1.MapWrapper.create());
                        test_lib_1.expect(executeWatch('key', 'key', null, locals)).toEqual(['key=value']);
                    });
                    test_lib_1.it("should fall back to a regular field read when the locals map" +
                        "does not have the requested field", function () {
                        var locals = new change_detection_1.Locals(null, collection_1.MapWrapper.createFromPairs([["key", "value"]]));
                        test_lib_1.expect(executeWatch('name', 'name', new Person("Jim"), locals))
                            .toEqual(['name=Jim']);
                    });
                    test_lib_1.it('should correctly handle nested properties', function () {
                        var address = new Address('Grenoble');
                        var person = new Person('Victor', address);
                        var locals = new change_detection_1.Locals(null, collection_1.MapWrapper.createFromPairs([['city', 'MTV']]));
                        test_lib_1.expect(executeWatch('address.city', 'address.city', person, locals))
                            .toEqual(['address.city=Grenoble']);
                        test_lib_1.expect(executeWatch('city', 'city', person, locals)).toEqual(['city=MTV']);
                    });
                });
                test_lib_1.describe("handle children", function () {
                    var parent, child;
                    test_lib_1.beforeEach(function () {
                        parent = createProtoChangeDetector([]).instantiate(null);
                        child = createProtoChangeDetector([]).instantiate(null);
                    });
                    test_lib_1.it("should add light dom children", function () {
                        parent.addChild(child);
                        test_lib_1.expect(parent.lightDomChildren.length).toEqual(1);
                        test_lib_1.expect(parent.lightDomChildren[0]).toBe(child);
                    });
                    test_lib_1.it("should add shadow dom children", function () {
                        parent.addShadowDomChild(child);
                        test_lib_1.expect(parent.shadowDomChildren.length).toEqual(1);
                        test_lib_1.expect(parent.shadowDomChildren[0]).toBe(child);
                    });
                    test_lib_1.it("should remove light dom children", function () {
                        parent.addChild(child);
                        parent.removeChild(child);
                        test_lib_1.expect(parent.lightDomChildren).toEqual([]);
                    });
                    test_lib_1.it("should remove shadow dom children", function () {
                        parent.addShadowDomChild(child);
                        parent.removeShadowDomChild(child);
                        test_lib_1.expect(parent.shadowDomChildren.length).toEqual(0);
                    });
                });
            });
            test_lib_1.describe("mode", function () {
                test_lib_1.it("should set the mode to CHECK_ALWAYS when the default change detection is used", function () {
                    var proto = createProtoChangeDetector([], [], [], null, change_detection_1.DEFAULT);
                    var cd = proto.instantiate(null);
                    test_lib_1.expect(cd.mode).toEqual(null);
                    cd.hydrate(null, null, null);
                    test_lib_1.expect(cd.mode).toEqual(change_detection_1.CHECK_ALWAYS);
                });
                test_lib_1.it("should set the mode to CHECK_ONCE when the push change detection is used", function () {
                    var proto = createProtoChangeDetector([], [], [], null, change_detection_1.ON_PUSH);
                    var cd = proto.instantiate(null);
                    cd.hydrate(null, null, null);
                    test_lib_1.expect(cd.mode).toEqual(change_detection_1.CHECK_ONCE);
                });
                test_lib_1.it("should not check a detached change detector", function () {
                    var c = createChangeDetector('name', 'a', new TestData("value"));
                    var cd = c["changeDetector"];
                    var dispatcher = c["dispatcher"];
                    cd.mode = change_detection_1.DETACHED;
                    cd.detectChanges();
                    test_lib_1.expect(dispatcher.log).toEqual([]);
                });
                test_lib_1.it("should not check a checked change detector", function () {
                    var c = createChangeDetector('name', 'a', new TestData("value"));
                    var cd = c["changeDetector"];
                    var dispatcher = c["dispatcher"];
                    cd.mode = change_detection_1.CHECKED;
                    cd.detectChanges();
                    test_lib_1.expect(dispatcher.log).toEqual([]);
                });
                test_lib_1.it("should change CHECK_ONCE to CHECKED", function () {
                    var cd = createProtoChangeDetector([]).instantiate(null);
                    cd.mode = change_detection_1.CHECK_ONCE;
                    cd.detectChanges();
                    test_lib_1.expect(cd.mode).toEqual(change_detection_1.CHECKED);
                });
                test_lib_1.it("should not change the CHECK_ALWAYS", function () {
                    var cd = createProtoChangeDetector([]).instantiate(null);
                    cd.mode = change_detection_1.CHECK_ALWAYS;
                    cd.detectChanges();
                    test_lib_1.expect(cd.mode).toEqual(change_detection_1.CHECK_ALWAYS);
                });
                test_lib_1.describe("marking ON_PUSH detectors as CHECK_ONCE after an update", function () {
                    var checkedDetector;
                    var dirRecordWithOnPush;
                    var updateDirWithOnPushRecord;
                    var directives;
                    test_lib_1.beforeEach(function () {
                        var proto = createProtoChangeDetector([], [], [], null, change_detection_1.ON_PUSH);
                        checkedDetector = proto.instantiate(null);
                        checkedDetector.hydrate(null, null, null);
                        checkedDetector.mode = change_detection_1.CHECKED;
                        // this directive is a component with ON_PUSH change detection
                        dirRecordWithOnPush = new change_detection_1.DirectiveRecord({ directiveIndex: new change_detection_1.DirectiveIndex(0, 0), changeDetection: change_detection_1.ON_PUSH });
                        // a record updating a component
                        updateDirWithOnPushRecord = change_detection_1.BindingRecord.createForDirective(ast("42"), "a", function (o, v) { return o.a = v; }, dirRecordWithOnPush);
                        var targetDirective = new TestData(null);
                        directives = new FakeDirectives([targetDirective], [checkedDetector]);
                    });
                    test_lib_1.it("should set the mode to CHECK_ONCE when a binding is updated", function () {
                        var proto = createProtoChangeDetector([updateDirWithOnPushRecord], [], [dirRecordWithOnPush]);
                        var cd = proto.instantiate(null);
                        cd.hydrate(null, null, directives);
                        test_lib_1.expect(checkedDetector.mode).toEqual(change_detection_1.CHECKED);
                        // evaluate the record, update the targetDirective, and mark its detector as
                        // CHECK_ONCE
                        cd.detectChanges();
                        test_lib_1.expect(checkedDetector.mode).toEqual(change_detection_1.CHECK_ONCE);
                    });
                });
            });
            test_lib_1.describe("markPathToRootAsCheckOnce", function () {
                function changeDetector(mode, parent) {
                    var cd = createProtoChangeDetector([]).instantiate(null);
                    cd.mode = mode;
                    if (lang_1.isPresent(parent))
                        parent.addChild(cd);
                    return cd;
                }
                test_lib_1.it("should mark all checked detectors as CHECK_ONCE " + "until reaching a detached one", function () {
                    var root = changeDetector(change_detection_1.CHECK_ALWAYS, null);
                    var disabled = changeDetector(change_detection_1.DETACHED, root);
                    var parent = changeDetector(change_detection_1.CHECKED, disabled);
                    var checkAlwaysChild = changeDetector(change_detection_1.CHECK_ALWAYS, parent);
                    var checkOnceChild = changeDetector(change_detection_1.CHECK_ONCE, checkAlwaysChild);
                    var checkedChild = changeDetector(change_detection_1.CHECKED, checkOnceChild);
                    checkedChild.markPathToRootAsCheckOnce();
                    test_lib_1.expect(root.mode).toEqual(change_detection_1.CHECK_ALWAYS);
                    test_lib_1.expect(disabled.mode).toEqual(change_detection_1.DETACHED);
                    test_lib_1.expect(parent.mode).toEqual(change_detection_1.CHECK_ONCE);
                    test_lib_1.expect(checkAlwaysChild.mode).toEqual(change_detection_1.CHECK_ALWAYS);
                    test_lib_1.expect(checkOnceChild.mode).toEqual(change_detection_1.CHECK_ONCE);
                    test_lib_1.expect(checkedChild.mode).toEqual(change_detection_1.CHECK_ONCE);
                });
            });
            test_lib_1.describe("hydration", function () {
                test_lib_1.it("should be able to rehydrate a change detector", function () {
                    var c = createChangeDetector("memo", "name");
                    var cd = c["changeDetector"];
                    cd.hydrate("some context", null, null);
                    test_lib_1.expect(cd.hydrated()).toBe(true);
                    cd.dehydrate();
                    test_lib_1.expect(cd.hydrated()).toBe(false);
                    cd.hydrate("other context", null, null);
                    test_lib_1.expect(cd.hydrated()).toBe(true);
                });
                test_lib_1.it("should destroy all active pipes during dehyration", function () {
                    var pipe = new OncePipe();
                    var registry = new FakePipeRegistry('pipe', function () { return pipe; });
                    var c = createChangeDetector("memo", "name | pipe", new Person('bob'), null, registry);
                    var cd = c["changeDetector"];
                    cd.detectChanges();
                    cd.dehydrate();
                    test_lib_1.expect(pipe.destroyCalled).toBe(true);
                });
            });
            test_lib_1.describe("pipes", function () {
                test_lib_1.it("should support pipes", function () {
                    var registry = new FakePipeRegistry('pipe', function () { return new CountingPipe(); });
                    var ctx = new Person("Megatron");
                    var c = createChangeDetector("memo", "name | pipe", ctx, null, registry);
                    var cd = c["changeDetector"];
                    var dispatcher = c["dispatcher"];
                    cd.detectChanges();
                    test_lib_1.expect(dispatcher.log).toEqual(['memo=Megatron state:0']);
                    dispatcher.clear();
                    cd.detectChanges();
                    test_lib_1.expect(dispatcher.log).toEqual(['memo=Megatron state:1']);
                });
                test_lib_1.it("should lookup pipes in the registry when the context is not supported", function () {
                    var registry = new FakePipeRegistry('pipe', function () { return new OncePipe(); });
                    var ctx = new Person("Megatron");
                    var c = createChangeDetector("memo", "name | pipe", ctx, null, registry);
                    var cd = c["changeDetector"];
                    cd.detectChanges();
                    test_lib_1.expect(registry.numberOfLookups).toEqual(1);
                    ctx.name = "Optimus Prime";
                    cd.detectChanges();
                    test_lib_1.expect(registry.numberOfLookups).toEqual(2);
                });
                test_lib_1.it("should invoke onDestroy on a pipe before switching to another one", function () {
                    var pipe = new OncePipe();
                    var registry = new FakePipeRegistry('pipe', function () { return pipe; });
                    var ctx = new Person("Megatron");
                    var c = createChangeDetector("memo", "name | pipe", ctx, null, registry);
                    var cd = c["changeDetector"];
                    cd.detectChanges();
                    ctx.name = "Optimus Prime";
                    cd.detectChanges();
                    test_lib_1.expect(pipe.destroyCalled).toEqual(true);
                });
                test_lib_1.it("should inject the ChangeDetectorRef " + "of the encompassing component into a pipe", function () {
                    var registry = new FakePipeRegistry('pipe', function () { return new IdentityPipe(); });
                    var c = createChangeDetector("memo", "name | pipe", new Person('bob'), null, registry);
                    var cd = c["changeDetector"];
                    cd.detectChanges();
                    test_lib_1.expect(registry.cdRef).toBe(cd.ref);
                });
            });
            test_lib_1.it("should do nothing when no change", function () {
                var registry = new FakePipeRegistry('pipe', function () { return new IdentityPipe(); });
                var ctx = new Person("Megatron");
                var c = createChangeDetector("memo", "name | pipe", ctx, null, registry);
                var cd = c["changeDetector"];
                var dispatcher = c["dispatcher"];
                cd.detectChanges();
                test_lib_1.expect(dispatcher.log).toEqual(['memo=Megatron']);
                dispatcher.clear();
                cd.detectChanges();
                test_lib_1.expect(dispatcher.log).toEqual([]);
            });
            test_lib_1.it("should unwrap the wrapped value", function () {
                var registry = new FakePipeRegistry('pipe', function () { return new WrappedPipe(); });
                var ctx = new Person("Megatron");
                var c = createChangeDetector("memo", "name | pipe", ctx, null, registry);
                var cd = c["changeDetector"];
                var dispatcher = c["dispatcher"];
                cd.detectChanges();
                test_lib_1.expect(dispatcher.log).toEqual(['memo=Megatron']);
            });
        });
    });
}
exports.main = main;
var CountingPipe = (function (_super) {
    __extends(CountingPipe, _super);
    function CountingPipe() {
        _super.call(this);
        this.state = 0;
    }
    CountingPipe.prototype.supports = function (newValue) { return true; };
    CountingPipe.prototype.transform = function (value) { return value + " state:" + this.state++; };
    return CountingPipe;
})(change_detection_1.Pipe);
var OncePipe = (function (_super) {
    __extends(OncePipe, _super);
    function OncePipe() {
        _super.call(this);
        this.called = false;
        this.destroyCalled = false;
    }
    OncePipe.prototype.supports = function (newValue) { return !this.called; };
    OncePipe.prototype.onDestroy = function () { this.destroyCalled = true; };
    OncePipe.prototype.transform = function (value) {
        this.called = true;
        return value;
    };
    return OncePipe;
})(change_detection_1.Pipe);
var IdentityPipe = (function (_super) {
    __extends(IdentityPipe, _super);
    function IdentityPipe() {
        _super.apply(this, arguments);
    }
    IdentityPipe.prototype.transform = function (value) { return value; };
    return IdentityPipe;
})(change_detection_1.Pipe);
var WrappedPipe = (function (_super) {
    __extends(WrappedPipe, _super);
    function WrappedPipe() {
        _super.apply(this, arguments);
    }
    WrappedPipe.prototype.transform = function (value) { return change_detection_1.WrappedValue.wrap(value); };
    return WrappedPipe;
})(change_detection_1.Pipe);
var FakePipeRegistry = (function (_super) {
    __extends(FakePipeRegistry, _super);
    function FakePipeRegistry(pipeType, factory) {
        _super.call(this, {});
        this.pipeType = pipeType;
        this.factory = factory;
        this.numberOfLookups = 0;
    }
    FakePipeRegistry.prototype.get = function (type, obj, cdRef) {
        if (type != this.pipeType)
            return null;
        this.numberOfLookups++;
        this.cdRef = cdRef;
        return this.factory();
    };
    return FakePipeRegistry;
})(change_detection_1.PipeRegistry);
var TestDirective = (function () {
    function TestDirective(onChangesDoneSpy) {
        if (onChangesDoneSpy === void 0) { onChangesDoneSpy = null; }
        this.onChangesDoneCalled = false;
        this.onCheckCalled = false;
        this.onInitCalled = false;
        this.onChangesDoneSpy = onChangesDoneSpy;
        this.a = null;
        this.b = null;
        this.changes = null;
    }
    TestDirective.prototype.onCheck = function () { this.onCheckCalled = true; };
    TestDirective.prototype.onInit = function () { this.onInitCalled = true; };
    TestDirective.prototype.onChange = function (changes) {
        var r = {};
        collection_1.StringMapWrapper.forEach(changes, function (c, key) { return r[key] = c.currentValue; });
        this.changes = r;
    };
    TestDirective.prototype.onAllChangesDone = function () {
        this.onChangesDoneCalled = true;
        if (lang_1.isPresent(this.onChangesDoneSpy)) {
            this.onChangesDoneSpy();
        }
    };
    return TestDirective;
})();
var Person = (function () {
    function Person(name, address) {
        if (address === void 0) { address = null; }
        this.name = name;
        this.address = address;
    }
    Person.prototype.sayHi = function (m) { return "Hi, " + m; };
    Person.prototype.toString = function () {
        var address = this.address == null ? '' : ' address=' + this.address.toString();
        return 'name=' + this.name + address;
    };
    return Person;
})();
var Address = (function () {
    function Address(city) {
        this.city = city;
    }
    Address.prototype.toString = function () { return lang_1.isBlank(this.city) ? '-' : this.city; };
    return Address;
})();
var Uninitialized = (function () {
    function Uninitialized() {
    }
    return Uninitialized;
})();
var TestData = (function () {
    function TestData(a) {
        this.a = a;
    }
    return TestData;
})();
var FakeDirectives = (function () {
    function FakeDirectives(directives, detectors) {
        this.directives = directives;
        this.detectors = detectors;
    }
    FakeDirectives.prototype.getDirectiveFor = function (di) { return this.directives[di.directiveIndex]; };
    FakeDirectives.prototype.getDetectorFor = function (di) { return this.detectors[di.directiveIndex]; };
    return FakeDirectives;
})();
var TestDispatcher = (function (_super) {
    __extends(TestDispatcher, _super);
    function TestDispatcher() {
        _super.call(this);
        this.clear();
    }
    TestDispatcher.prototype.clear = function () {
        this.log = collection_1.ListWrapper.create();
        this.loggedValues = collection_1.ListWrapper.create();
    };
    TestDispatcher.prototype.notifyOnBinding = function (binding, value) {
        collection_1.ListWrapper.push(this.log, binding.propertyName + "=" + this._asString(value));
        collection_1.ListWrapper.push(this.loggedValues, value);
    };
    TestDispatcher.prototype._asString = function (value) { return (lang_1.isBlank(value) ? 'null' : value.toString()); };
    return TestDispatcher;
})(change_detection_1.ChangeDispatcher);
//# sourceMappingURL=change_detector_spec.js.map