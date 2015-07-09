import { ElementRef } from 'angular2/angular2';
import { Renderer } from 'angular2/src/render/api';
import { ControlDirective } from './control_directive';
import { ControlValueAccessor } from './control_value_accessor';
/**
 * The accessor for writing a value and listening to changes on a checkbox input element.
 *
 *
 *  # Example
 *  ```
 *  <input type="checkbox" [control]="rememberLogin">
 *  ```
 *
 * @exportedAs angular2/forms
 */
export declare class CheckboxControlValueAccessor implements ControlValueAccessor {
    private _elementRef;
    private _renderer;
    checked: boolean;
    onChange: Function;
    constructor(cd: ControlDirective, _elementRef: ElementRef, _renderer: Renderer);
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
}
