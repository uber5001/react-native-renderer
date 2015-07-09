import { CompileElement } from 'angular2/src/render/dom/compiler/compile_element';
import { CompileStep } from 'angular2/src/render/dom/compiler/compile_step';
import { CompileControl } from 'angular2/src/render/dom/compiler/compile_control';
export declare function main(): void;
export declare class IgnoreChildrenStep implements CompileStep {
    process(parent: CompileElement, current: CompileElement, control: CompileControl): void;
}
