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
 * @interface TransactionIdentifiers
 */
export interface TransactionIdentifiers {
    /**
     * The hex-encoded transaction intent hash. This is also known as the Transaction Identifier hash for user transactions. This hash is SHA256(SHA256(compiled_intent))
     * @type {string}
     * @memberof TransactionIdentifiers
     */
    intent_hash: string;
    /**
     * The hex-encoded signed transaction hash. This is the hash which is signed as part of notarization. This hash is SHA256(SHA256(compiled_signed_transaction))
     * @type {string}
     * @memberof TransactionIdentifiers
     */
    signatures_hash: string;
    /**
     * The hex-encoded notarized transaction hash. This is also known as the payload hash. This hash is SHA256(SHA256(compiled_notarized_transaction))
     * @type {string}
     * @memberof TransactionIdentifiers
     */
    payload_hash: string;
}

/**
 * Check if a given object implements the TransactionIdentifiers interface.
 */
export function instanceOfTransactionIdentifiers(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "intent_hash" in value;
    isInstance = isInstance && "signatures_hash" in value;
    isInstance = isInstance && "payload_hash" in value;

    return isInstance;
}

export function TransactionIdentifiersFromJSON(json: any): TransactionIdentifiers {
    return TransactionIdentifiersFromJSONTyped(json, false);
}

export function TransactionIdentifiersFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionIdentifiers {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'intent_hash': json['intent_hash'],
        'signatures_hash': json['signatures_hash'],
        'payload_hash': json['payload_hash'],
    };
}

export function TransactionIdentifiersToJSON(value?: TransactionIdentifiers | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'intent_hash': value.intent_hash,
        'signatures_hash': value.signatures_hash,
        'payload_hash': value.payload_hash,
    };
}
