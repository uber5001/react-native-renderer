import { AbstractChangeDetector } from './abstract_change_detector';
import { BindingRecord } from './binding_record';
import { PipeRegistry } from './pipes/pipe_registry';
import { SimpleChange } from './change_detection_util';
import { ProtoRecord } from './proto_record';
export declare class DynamicChangeDetector extends AbstractChangeDetector {
    private changeControlStrategy;
    private dispatcher;
    private pipeRegistry;
    private protos;
    private directiveRecords;
    locals: any;
    values: List<any>;
    changes: List<any>;
    pipes: List<any>;
    prevContexts: List<any>;
    directives: any;
    alreadyChecked: boolean;
    constructor(changeControlStrategy: string, dispatcher: any, pipeRegistry: PipeRegistry, protos: List<ProtoRecord>, directiveRecords: List<any>);
    hydrate(context: any, locals: any, directives: any): void;
    dehydrate(): void;
    _destroyPipes(): void;
    hydrated(): boolean;
    detectChangesInRecords(throwOnChange: boolean): void;
    callOnAllChangesDone(): void;
    _updateDirectiveOrElement(change: any, bindingRecord: any): void;
    _addChange(bindingRecord: BindingRecord, change: any, changes: any): any;
    _getDirectiveFor(directiveIndex: any): any;
    _getDetectorFor(directiveIndex: any): any;
    _check(proto: ProtoRecord, throwOnChange: boolean): SimpleChange;
    _referenceCheck(proto: ProtoRecord, throwOnChange: boolean): SimpleChange;
    _calculateCurrValue(proto: ProtoRecord): any;
    _pipeCheck(proto: ProtoRecord, throwOnChange: boolean): SimpleChange;
    _pipeFor(proto: ProtoRecord, context: any): any;
    _readContext(proto: ProtoRecord): any;
    _readSelf(proto: ProtoRecord): any;
    _writeSelf(proto: ProtoRecord, value: any): void;
    _readPipe(proto: ProtoRecord): any;
    _writePipe(proto: ProtoRecord, value: any): void;
    _setChanged(proto: ProtoRecord, value: boolean): void;
    _pureFuncAndArgsDidNotChange(proto: ProtoRecord): boolean;
    _argsChanged(proto: ProtoRecord): boolean;
    _readArgs(proto: ProtoRecord): List<any>;
}
