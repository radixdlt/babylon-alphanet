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
import type { CommittedTransaction } from './CommittedTransaction';
/**
 *
 * @export
 * @interface V0CommittedTransactionResponse
 */
export interface V0CommittedTransactionResponse {
    /**
     *
     * @type {CommittedTransaction}
     * @memberof V0CommittedTransactionResponse
     */
    committed: CommittedTransaction;
}
/**
 * Check if a given object implements the V0CommittedTransactionResponse interface.
 */
export declare function instanceOfV0CommittedTransactionResponse(value: object): boolean;
export declare function V0CommittedTransactionResponseFromJSON(json: any): V0CommittedTransactionResponse;
export declare function V0CommittedTransactionResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): V0CommittedTransactionResponse;
export declare function V0CommittedTransactionResponseToJSON(value?: V0CommittedTransactionResponse | null): any;