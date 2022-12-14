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
import type { EntityType } from './EntityType';
import type { SubstateType } from './SubstateType';
/**
 *
 * @export
 * @interface ComponentInfoSubstate
 */
export interface ComponentInfoSubstate {
    /**
     *
     * @type {EntityType}
     * @memberof ComponentInfoSubstate
     */
    entity_type: EntityType;
    /**
     *
     * @type {SubstateType}
     * @memberof ComponentInfoSubstate
     */
    substate_type: SubstateType;
    /**
     * The Bech32m-encoded human readable version of the package address
     * @type {string}
     * @memberof ComponentInfoSubstate
     */
    package_address: string;
    /**
     *
     * @type {string}
     * @memberof ComponentInfoSubstate
     */
    blueprint_name: string;
}
/**
 * Check if a given object implements the ComponentInfoSubstate interface.
 */
export declare function instanceOfComponentInfoSubstate(value: object): boolean;
export declare function ComponentInfoSubstateFromJSON(json: any): ComponentInfoSubstate;
export declare function ComponentInfoSubstateFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComponentInfoSubstate;
export declare function ComponentInfoSubstateToJSON(value?: ComponentInfoSubstate | null): any;
