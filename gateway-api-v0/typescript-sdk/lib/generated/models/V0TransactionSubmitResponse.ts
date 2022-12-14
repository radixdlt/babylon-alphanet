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
 * @interface V0TransactionSubmitResponse
 */
export interface V0TransactionSubmitResponse {
    /**
     * Is true if the transaction is a duplicate of an existing transaction in the mempool.
     * @type {boolean}
     * @memberof V0TransactionSubmitResponse
     */
    duplicate: boolean;
}

/**
 * Check if a given object implements the V0TransactionSubmitResponse interface.
 */
export function instanceOfV0TransactionSubmitResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "duplicate" in value;

    return isInstance;
}

export function V0TransactionSubmitResponseFromJSON(json: any): V0TransactionSubmitResponse {
    return V0TransactionSubmitResponseFromJSONTyped(json, false);
}

export function V0TransactionSubmitResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): V0TransactionSubmitResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'duplicate': json['duplicate'],
    };
}

export function V0TransactionSubmitResponseToJSON(value?: V0TransactionSubmitResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'duplicate': value.duplicate,
    };
}

