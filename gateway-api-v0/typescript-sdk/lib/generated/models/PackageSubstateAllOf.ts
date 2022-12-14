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
/**
 * 
 * @export
 * @interface PackageSubstateAllOf
 */
export interface PackageSubstateAllOf {
    /**
     * The hex-encoded package code
     * @type {string}
     * @memberof PackageSubstateAllOf
     */
    code_hex: string;
}

/**
 * Check if a given object implements the PackageSubstateAllOf interface.
 */
export function instanceOfPackageSubstateAllOf(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "code_hex" in value;

    return isInstance;
}

export function PackageSubstateAllOfFromJSON(json: any): PackageSubstateAllOf {
    return PackageSubstateAllOfFromJSONTyped(json, false);
}

export function PackageSubstateAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): PackageSubstateAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'code_hex': json['code_hex'],
    };
}

export function PackageSubstateAllOfToJSON(value?: PackageSubstateAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'code_hex': value.code_hex,
    };
}

