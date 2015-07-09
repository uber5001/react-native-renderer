var collection_1 = require('angular2/src/facade/collection');
var api_1 = require('angular2/src/render/api');
var convert_1 = require('angular2/src/render/dom/convert');
var test_lib_1 = require('angular2/test_lib');
function main() {
    test_lib_1.describe('convert', function () {
        test_lib_1.it('directiveMetadataToMap', function () {
            var someComponent = new api_1.DirectiveMetadata({
                compileChildren: false,
                hostListeners: collection_1.MapWrapper.createFromPairs([['listenKey', 'listenVal']]),
                hostProperties: collection_1.MapWrapper.createFromPairs([['hostPropKey', 'hostPropVal']]),
                hostActions: collection_1.MapWrapper.createFromPairs([['hostActionKey', 'hostActionVal']]),
                id: 'someComponent',
                properties: ['propKey: propVal'],
                readAttributes: ['read1', 'read2'],
                selector: 'some-comp',
                type: api_1.DirectiveMetadata.COMPONENT_TYPE,
                callOnDestroy: true,
                callOnChange: true,
                callOnCheck: true,
                callOnInit: true,
                callOnAllChangesDone: true
            });
            var map = convert_1.directiveMetadataToMap(someComponent);
            test_lib_1.expect(collection_1.MapWrapper.get(map, 'compileChildren')).toEqual(false);
            test_lib_1.expect(collection_1.MapWrapper.get(map, 'hostListeners'))
                .toEqual(collection_1.MapWrapper.createFromPairs([['listenKey', 'listenVal']]));
            test_lib_1.expect(collection_1.MapWrapper.get(map, 'hostProperties'))
                .toEqual(collection_1.MapWrapper.createFromPairs([['hostPropKey', 'hostPropVal']]));
            test_lib_1.expect(collection_1.MapWrapper.get(map, 'hostActions'))
                .toEqual(collection_1.MapWrapper.createFromPairs([['hostActionKey', 'hostActionVal']]));
            test_lib_1.expect(collection_1.MapWrapper.get(map, 'id')).toEqual('someComponent');
            test_lib_1.expect(collection_1.MapWrapper.get(map, 'properties')).toEqual(['propKey: propVal']);
            test_lib_1.expect(collection_1.MapWrapper.get(map, 'readAttributes')).toEqual(['read1', 'read2']);
            test_lib_1.expect(collection_1.MapWrapper.get(map, 'selector')).toEqual('some-comp');
            test_lib_1.expect(collection_1.MapWrapper.get(map, 'type')).toEqual(api_1.DirectiveMetadata.COMPONENT_TYPE);
            test_lib_1.expect(collection_1.MapWrapper.get(map, 'callOnDestroy')).toEqual(true);
            test_lib_1.expect(collection_1.MapWrapper.get(map, 'callOnCheck')).toEqual(true);
            test_lib_1.expect(collection_1.MapWrapper.get(map, 'callOnChange')).toEqual(true);
            test_lib_1.expect(collection_1.MapWrapper.get(map, 'callOnInit')).toEqual(true);
            test_lib_1.expect(collection_1.MapWrapper.get(map, 'callOnAllChangesDone')).toEqual(true);
        });
        test_lib_1.it('mapToDirectiveMetadata', function () {
            var map = collection_1.MapWrapper.createFromPairs([
                ['compileChildren', false],
                ['hostListeners', collection_1.MapWrapper.createFromPairs([['testKey', 'testVal']])],
                ['hostProperties', collection_1.MapWrapper.createFromPairs([['hostPropKey', 'hostPropVal']])],
                ['hostActions', collection_1.MapWrapper.createFromPairs([['hostActionKey', 'hostActionVal']])],
                ['id', 'testId'],
                ['properties', ['propKey: propVal']],
                ['readAttributes', ['readTest1', 'readTest2']],
                ['selector', 'testSelector'],
                ['type', api_1.DirectiveMetadata.DIRECTIVE_TYPE],
                ['callOnDestroy', true],
                ['callOnCheck', true],
                ['callOnInit', true],
                ['callOnChange', true],
                ['callOnAllChangesDone', true]
            ]);
            var meta = convert_1.directiveMetadataFromMap(map);
            test_lib_1.expect(meta.compileChildren).toEqual(false);
            test_lib_1.expect(meta.hostListeners).toEqual(collection_1.MapWrapper.createFromPairs([['testKey', 'testVal']]));
            test_lib_1.expect(meta.hostProperties)
                .toEqual(collection_1.MapWrapper.createFromPairs([['hostPropKey', 'hostPropVal']]));
            test_lib_1.expect(meta.hostActions)
                .toEqual(collection_1.MapWrapper.createFromPairs([['hostActionKey', 'hostActionVal']]));
            test_lib_1.expect(meta.id).toEqual('testId');
            test_lib_1.expect(meta.properties).toEqual(['propKey: propVal']);
            test_lib_1.expect(meta.readAttributes).toEqual(['readTest1', 'readTest2']);
            test_lib_1.expect(meta.selector).toEqual('testSelector');
            test_lib_1.expect(meta.type).toEqual(api_1.DirectiveMetadata.DIRECTIVE_TYPE);
            test_lib_1.expect(meta.callOnDestroy).toEqual(true);
            test_lib_1.expect(meta.callOnCheck).toEqual(true);
            test_lib_1.expect(meta.callOnInit).toEqual(true);
            test_lib_1.expect(meta.callOnChange).toEqual(true);
            test_lib_1.expect(meta.callOnAllChangesDone).toEqual(true);
        });
    });
}
exports.main = main;
//# sourceMappingURL=convert_spec.js.map