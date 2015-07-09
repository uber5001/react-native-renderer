import { ElementRef } from 'angular2/angular2';
import { Renderer } from 'angular2/src/render/api';
import { ControlDirective } from './control_directive';
import { ControlValueAccessor } from './control_value_accessor';
/**
 * The default accessor for writing a value and listening to changes that is used by a {@link
  * Control} directive.
 *
 * This is the default strategy that Angular uses when no other accessor is applied.
 *
 *  # Example
 *  ```
 *  <input type="text" [control]="loginControl">
 *  ```
 *
 * @exportedAs angular2/forms
 */
export declare class DefaultValueAccessor implements ControlValueAccessor {
    private _elementRef;
    private _renderer;
    value: any;
    onChange: Function;
    constructor(cd: ControlDirective, _elementRef: ElementRef, _renderer: Renderer);
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
}
