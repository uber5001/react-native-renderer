export declare class ClassDecoratorImpl {
    value: any;
    constructor(value: any);
}
export declare class ParamDecoratorImpl {
    value: any;
    constructor(value: any);
}
export declare function classDecorator(value: any): ClassDecoratorImpl;
export declare function paramDecorator(value: any): ParamDecoratorImpl;
export declare var ClassDecorator: (...args: any[]) => (cls: any) => any;
export declare var ParamDecorator: any;
