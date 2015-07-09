import { ControlDirective } from './control_directive';
import { ControlGroupDirective } from './control_group_directive';
import { ControlContainerDirective } from './control_container_directive';
import { FormDirective } from './form_directive';
import { ControlGroup } from '../model';
export declare class FormModelDirective extends ControlContainerDirective implements FormDirective {
    form: ControlGroup;
    directives: List<ControlDirective>;
    constructor();
    onChange(_: any): void;
    formDirective: FormDirective;
    path: List<string>;
    addControl(dir: ControlDirective): void;
    removeControl(dir: ControlDirective): void;
    addControlGroup(dir: ControlGroupDirective): void;
    removeControlGroup(dir: ControlGroupDirective): void;
    _updateDomValue(): void;
}
