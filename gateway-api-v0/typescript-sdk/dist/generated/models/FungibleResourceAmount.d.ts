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
import type { ResourceType } from './ResourceType';
/**
 *
 * @export
 * @interface FungibleResourceAmount
 */
export interface FungibleResourceAmount {
    /**
     *
     * @type {ResourceType}
     * @memberof FungibleResourceAmount
     */
    resource_type: ResourceType;
    /**
     * The Bech32m-encoded human readable version of the resource address
     * @type {string}
     * @memberof FungibleResourceAmount
     */
    resource_address: string;
    /**
     * The string-encoded decimal subunits of the amount (10^-18) in a signed 256-bit integer.
     * This is string-encoded as it doesn't fit well into common numeric types.
     * @type {string}
     * @memberof FungibleResourceAmount
     */
    amount_attos: string;
}
/**
 * Check if a given object implements the FungibleResourceAmount interface.
 */
export declare function instanceOfFungibleResourceAmount(value: object): boolean;
export declare function FungibleResourceAmountFromJSON(json: any): FungibleResourceAmount;
export declare function FungibleResourceAmountFromJSONTyped(json: any, ignoreDiscriminator: boolean): FungibleResourceAmount;
export declare function FungibleResourceAmountToJSON(value?: FungibleResourceAmount | null): any;