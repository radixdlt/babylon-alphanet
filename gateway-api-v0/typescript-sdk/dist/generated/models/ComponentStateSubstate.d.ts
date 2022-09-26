/**
 * Babylon Alphanet v0 API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import type { DataStruct } from './DataStruct';
import type { EntityType } from './EntityType';
import type { SubstateType } from './SubstateType';
/**
 *
 * @export
 * @interface ComponentStateSubstate
 */
export interface ComponentStateSubstate {
    /**
     *
     * @type {EntityType}
     * @memberof ComponentStateSubstate
     */
    entity_type: EntityType;
    /**
     *
     * @type {SubstateType}
     * @memberof ComponentStateSubstate
     */
    substate_type: SubstateType;
    /**
     *
     * @type {DataStruct}
     * @memberof ComponentStateSubstate
     */
    data_struct: DataStruct;
}
/**
 * Check if a given object implements the ComponentStateSubstate interface.
 */
export declare function instanceOfComponentStateSubstate(value: object): boolean;
export declare function ComponentStateSubstateFromJSON(json: any): ComponentStateSubstate;
export declare function ComponentStateSubstateFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComponentStateSubstate;
export declare function ComponentStateSubstateToJSON(value?: ComponentStateSubstate | null): any;