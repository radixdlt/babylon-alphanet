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
 * @interface V0TransactionSubmitRequest
 */
export interface V0TransactionSubmitRequest {
    /**
     * A hex-encoded, compiled notarized transaction.
     * @type {string}
     * @memberof V0TransactionSubmitRequest
     */
    notarized_transaction_hex: string;
}

/**
 * Check if a given object implements the V0TransactionSubmitRequest interface.
 */
export function instanceOfV0TransactionSubmitRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "notarized_transaction_hex" in value;

    return isInstance;
}

export function V0TransactionSubmitRequestFromJSON(json: any): V0TransactionSubmitRequest {
    return V0TransactionSubmitRequestFromJSONTyped(json, false);
}

export function V0TransactionSubmitRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): V0TransactionSubmitRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'notarized_transaction_hex': json['notarized_transaction_hex'],
    };
}

export function V0TransactionSubmitRequestToJSON(value?: V0TransactionSubmitRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'notarized_transaction_hex': value.notarized_transaction_hex,
    };
}
