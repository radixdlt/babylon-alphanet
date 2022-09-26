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
import type { FeeSummary } from './FeeSummary';
import type { SborData } from './SborData';
import type { StateUpdates } from './StateUpdates';
import type { TransactionStatus } from './TransactionStatus';
/**
 * The transaction execution receipt
 * @export
 * @interface TransactionReceipt
 */
export interface TransactionReceipt {
    /**
     *
     * @type {TransactionStatus}
     * @memberof TransactionReceipt
     */
    status: TransactionStatus;
    /**
     *
     * @type {FeeSummary}
     * @memberof TransactionReceipt
     */
    fee_summary: FeeSummary;
    /**
     *
     * @type {StateUpdates}
     * @memberof TransactionReceipt
     */
    state_updates: StateUpdates;
    /**
     * The manifest line-by-line engine return data (only present if status is Succeeded)
     * @type {Array<SborData>}
     * @memberof TransactionReceipt
     */
    output?: Array<SborData>;
    /**
     * Error message (only present if status is Failed or Rejected)
     * @type {string}
     * @memberof TransactionReceipt
     */
    error_message?: string;
}
/**
 * Check if a given object implements the TransactionReceipt interface.
 */
export declare function instanceOfTransactionReceipt(value: object): boolean;
export declare function TransactionReceiptFromJSON(json: any): TransactionReceipt;
export declare function TransactionReceiptFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransactionReceipt;
export declare function TransactionReceiptToJSON(value?: TransactionReceipt | null): any;