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
import type { SubstateId } from './SubstateId';
/**
 *
 * @export
 * @interface DownSubstate
 */
export interface DownSubstate {
    /**
     *
     * @type {SubstateId}
     * @memberof DownSubstate
     */
    substate_id: SubstateId;
    /**
     * The hex-encoded single-SHA256 hash of the substate data bytes
     * @type {string}
     * @memberof DownSubstate
     */
    substate_data_hash: string;
    /**
     * An integer between 0 and 10^13, counting the number of times the substate was updated
     * @type {number}
     * @memberof DownSubstate
     */
    version: number;
}
/**
 * Check if a given object implements the DownSubstate interface.
 */
export declare function instanceOfDownSubstate(value: object): boolean;
export declare function DownSubstateFromJSON(json: any): DownSubstate;
export declare function DownSubstateFromJSONTyped(json: any, ignoreDiscriminator: boolean): DownSubstate;
export declare function DownSubstateToJSON(value?: DownSubstate | null): any;