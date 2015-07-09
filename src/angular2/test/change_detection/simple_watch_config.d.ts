import { ChangeDetectorDefinition } from 'angular2/change_detection';
/**
 * In this case, we expect `id` and `expression` to be the same string.
 */
export declare function getDefinition(id: string, propName: string): ChangeDetectorDefinition;
/**
 * Get all available ChangeDetectorDefinition objects. Used to pre-generate Dart
 * `ChangeDetector` classes.
 */
export declare function getAllDefinitions(propName: string): List<ChangeDetectorDefinition>;
