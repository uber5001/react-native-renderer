import { ControlDirective } from './control_directive';
import { FormDirective } from './form_directive';
import { ControlGroupDirective } from './control_group_directive';
import { ControlContainerDirective } from './control_container_directive';
import { AbstractControl, ControlGroup } from '../model';
export declare class TemplateDrivenFormDirective extends ControlContainerDirective implements FormDirective {
    form: ControlGroup;
    constructor();
    formDirective: FormDirective;
    path: List<string>;
    controls: StringMap<string, AbstractControl>;
    value: any;
    addControl(dir: ControlDirective): void;
    removeControl(dir: ControlDirective): void;
    addControlGroup(dir: ControlGroupDirective): void;
    removeControlGroup(dir: ControlGroupDirective): void;
    _findContainer(path: List<string>): ControlGroup;
    _later(fn: any): void;
}
