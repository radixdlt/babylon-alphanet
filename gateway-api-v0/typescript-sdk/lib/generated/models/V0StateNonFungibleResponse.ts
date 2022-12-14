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
import type { Substate } from './Substate';
import {
    SubstateFromJSON,
    SubstateFromJSONTyped,
    SubstateToJSON,
} from './Substate';

/**
 * 
 * @export
 * @interface V0StateNonFungibleResponse
 */
export interface V0StateNonFungibleResponse {
    /**
     * 
     * @type {Substate}
     * @memberof V0StateNonFungibleResponse
     */
    non_fungible: Substate;
}

/**
 * Check if a given object implements the V0StateNonFungibleResponse interface.
 */
export function instanceOfV0StateNonFungibleResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "non_fungible" in value;

    return isInstance;
}

export function V0StateNonFungibleResponseFromJSON(json: any): V0StateNonFungibleResponse {
    return V0StateNonFungibleResponseFromJSONTyped(json, false);
}

export function V0StateNonFungibleResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): V0StateNonFungibleResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'non_fungible': SubstateFromJSON(json['non_fungible']),
    };
}

export function V0StateNonFungibleResponseToJSON(value?: V0StateNonFungibleResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'non_fungible': SubstateToJSON(value.non_fungible),
    };
}

