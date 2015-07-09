import { Injector } from 'angular2/di';
import { Type } from 'angular2/src/facade/lang';
import { View } from 'angular2/src/core/annotations_impl/view';
import { AppView } from 'angular2/src/core/compiler/view';
import { ComponentRef } from 'angular2/src/core/compiler/dynamic_component_loader';
import { DebugElement } from 'angular2/src/debug/debug_element';
/**
 * @exportedAs angular2/test
 */
export declare class RootTestComponent extends DebugElement {
    _componentRef: ComponentRef;
    _componentParentView: AppView;
    constructor(componentRef: ComponentRef);
    detectChanges(): void;
    destroy(): void;
}
/**
 * @exportedAs angular2/test
 *
 * Builds a RootTestComponent for use in component level tests.
 */
export declare class TestComponentBuilder {
    _injector: Injector;
    _viewOverrides: Map<Type, View>;
    _directiveOverrides: Map<Type, Map<Type, Type>>;
    _templateOverrides: Map<Type, string>;
    constructor(injector: Injector);
    _clone(): TestComponentBuilder;
    /**
     * Overrides only the html of a {@link Component}.
     * All the other propoerties of the component's {@link View} are preserved.
     *
     * @param {Type} component
     * @param {string} html
     *
     * @return {TestComponentBuilder}
     */
    overrideTemplate(componentType: Type, template: string): TestComponentBuilder;
    /**
     * Overrides a component's {@link View}.
     *
     * @param {Type} component
     * @param {view} View
     *
     * @return {TestComponentBuilder}
     */
    overrideView(componentType: Type, view: View): TestComponentBuilder;
    /**
     * Overrides the directives from the component {@link View}.
     *
     * @param {Type} component
     * @param {Type} from
     * @param {Type} to
     *
     * @return {TestComponentBuilder}
     */
    overrideDirective(componentType: Type, from: Type, to: Type): TestComponentBuilder;
    /**
     * Builds and returns a RootTestComponent.
     *
     * @return {Promise<RootTestComponent>}
     */
    createAsync(rootComponentType: Type): Promise<RootTestComponent>;
}
