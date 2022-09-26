/* tslint:disable */
/* eslint-disable */
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

import { exists, mapValues } from '../runtime';
import type { SubstateId } from './SubstateId';
import {
    SubstateIdFromJSON,
    SubstateIdFromJSONTyped,
    SubstateIdToJSON,
} from './SubstateId';

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
export function instanceOfDownSubstate(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "substate_id" in value;
    isInstance = isInstance && "substate_data_hash" in value;
    isInstance = isInstance && "version" in value;

    return isInstance;
}

export function DownSubstateFromJSON(json: any): DownSubstate {
    return DownSubstateFromJSONTyped(json, false);
}

export function DownSubstateFromJSONTyped(json: any, ignoreDiscriminator: boolean): DownSubstate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'substate_id': SubstateIdFromJSON(json['substate_id']),
        'substate_data_hash': json['substate_data_hash'],
        'version': json['version'],
    };
}

export function DownSubstateToJSON(value?: DownSubstate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'substate_id': SubstateIdToJSON(value.substate_id),
        'substate_data_hash': value.substate_data_hash,
        'version': value.version,
    };
}
