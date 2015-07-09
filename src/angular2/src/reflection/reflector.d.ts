import { Type } from 'angular2/src/facade/lang';
import { SetterFn, GetterFn, MethodFn } from './types';
export declare class Reflector {
    _typeInfo: Map<Type, any>;
    _getters: Map<string, GetterFn>;
    _setters: Map<string, SetterFn>;
    _methods: Map<string, MethodFn>;
    reflectionCapabilities: any;
    constructor(reflectionCapabilities: any);
    registerType(type: Type, typeInfo: StringMap<string, any>): void;
    registerGetters(getters: Map<string, GetterFn>): void;
    registerSetters(setters: Map<string, SetterFn>): void;
    registerMethods(methods: Map<string, MethodFn>): void;
    factory(type: Type): Function;
    parameters(typeOrFunc: any): List<any>;
    annotations(typeOrFunc: any): List<any>;
    interfaces(type: any): List<any>;
    getter(name: string): GetterFn;
    setter(name: string): SetterFn;
    method(name: string): MethodFn;
    _getTypeInfoField(typeOrFunc: any, key: any, defaultValue: any): any;
    _containsTypeInfo(typeOrFunc: any): boolean;
}
