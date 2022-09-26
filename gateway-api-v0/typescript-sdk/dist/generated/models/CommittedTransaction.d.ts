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
import type { NotarizedTransaction } from './NotarizedTransaction';
import type { TransactionReceipt } from './TransactionReceipt';
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
export declare function instanceOfCommittedTransaction(value: object): boolean;
export declare function CommittedTransactionFromJSON(json: any): CommittedTransaction;
export declare function CommittedTransactionFromJSONTyped(json: any, ignoreDiscriminator: boolean): CommittedTransaction;
export declare function CommittedTransactionToJSON(value?: CommittedTransaction | null): any;