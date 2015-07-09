import { ControlValueAccessor } from './control_value_accessor';
export declare class ControlDirective {
    name: string;
    valueAccessor: ControlValueAccessor;
    validator: Function;
    path: List<string>;
    constructor();
}
