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
import type { NonFungibleData } from './NonFungibleData';
import {
    NonFungibleDataFromJSON,
    NonFungibleDataFromJSONTyped,
    NonFungibleDataToJSON,
} from './NonFungibleData';

/**
 * 
 * @export
 * @interface NonFungibleSubstateAllOf
 */
export interface NonFungibleSubstateAllOf {
    /**
     * The hex-encoded bytes of its non-fungible id
     * @type {string}
     * @memberof NonFungibleSubstateAllOf
     */
    nfIdHex: string;
    /**
     * 
     * @type {boolean}
     * @memberof NonFungibleSubstateAllOf
     */
    isDeleted: boolean;
    /**
     * 
     * @type {NonFungibleData}
     * @memberof NonFungibleSubstateAllOf
     */
    nonFungibleData?: NonFungibleData;
}

/**
 * Check if a given object implements the NonFungibleSubstateAllOf interface.
 */
export function instanceOfNonFungibleSubstateAllOf(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "nfIdHex" in value;
    isInstance = isInstance && "isDeleted" in value;

    return isInstance;
}

export function NonFungibleSubstateAllOfFromJSON(json: any): NonFungibleSubstateAllOf {
    return NonFungibleSubstateAllOfFromJSONTyped(json, false);
}

export function NonFungibleSubstateAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): NonFungibleSubstateAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'nfIdHex': json['nf_id_hex'],
        'isDeleted': json['is_deleted'],
        'nonFungibleData': !exists(json, 'non_fungible_data') ? undefined : NonFungibleDataFromJSON(json['non_fungible_data']),
    };
}

export function NonFungibleSubstateAllOfToJSON(value?: NonFungibleSubstateAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'nf_id_hex': value.nfIdHex,
        'is_deleted': value.isDeleted,
        'non_fungible_data': NonFungibleDataToJSON(value.nonFungibleData),
    };
}
