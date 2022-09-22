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
 * @interface V0StatePackageResponse
 */
export interface V0StatePackageResponse {
    /**
     * 
     * @type {Substate}
     * @memberof V0StatePackageResponse
     */
    _package: Substate;
}

/**
 * Check if a given object implements the V0StatePackageResponse interface.
 */
export function instanceOfV0StatePackageResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "_package" in value;

    return isInstance;
}

export function V0StatePackageResponseFromJSON(json: any): V0StatePackageResponse {
    return V0StatePackageResponseFromJSONTyped(json, false);
}

export function V0StatePackageResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): V0StatePackageResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        '_package': SubstateFromJSON(json['package']),
    };
}

export function V0StatePackageResponseToJSON(value?: V0StatePackageResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'package': SubstateToJSON(value._package),
    };
}
