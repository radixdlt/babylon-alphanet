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
import type { NotarizedTransaction } from './NotarizedTransaction';
import {
    NotarizedTransactionFromJSON,
    NotarizedTransactionFromJSONTyped,
    NotarizedTransactionToJSON,
} from './NotarizedTransaction';
import type { TransactionReceipt } from './TransactionReceipt';
import {
    TransactionReceiptFromJSON,
    TransactionReceiptFromJSONTyped,
    TransactionReceiptToJSON,
} from './TransactionReceipt';

/**
 * 
 * @export
 * @interface CommittedTransaction
 */
export interface CommittedTransaction {
    /**
     * An integer between 1 and 10^13, giving the resultant state version after the transaction has been committed
     * @type {number}
     * @memberof CommittedTransaction
     */
    state_version: number;
    /**
     * 
     * @type {NotarizedTransaction}
     * @memberof CommittedTransaction
     */
    notarized_transaction?: NotarizedTransaction;
    /**
     * 
     * @type {TransactionReceipt}
     * @memberof CommittedTransaction
     */
    receipt: TransactionReceipt;
}

/**
 * Check if a given object implements the CommittedTransaction interface.
 */
export function instanceOfCommittedTransaction(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "state_version" in value;
    isInstance = isInstance && "receipt" in value;

    return isInstance;
}

export function CommittedTransactionFromJSON(json: any): CommittedTransaction {
    return CommittedTransactionFromJSONTyped(json, false);
}

export function CommittedTransactionFromJSONTyped(json: any, ignoreDiscriminator: boolean): CommittedTransaction {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'state_version': json['state_version'],
        'notarized_transaction': !exists(json, 'notarized_transaction') ? undefined : NotarizedTransactionFromJSON(json['notarized_transaction']),
        'receipt': TransactionReceiptFromJSON(json['receipt']),
    };
}

export function CommittedTransactionToJSON(value?: CommittedTransaction | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'state_version': value.state_version,
        'notarized_transaction': NotarizedTransactionToJSON(value.notarized_transaction),
        'receipt': TransactionReceiptToJSON(value.receipt),
    };
}
