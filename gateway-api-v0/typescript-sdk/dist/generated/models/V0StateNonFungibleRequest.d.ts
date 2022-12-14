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
/**
 *
 * @export
 * @interface V0StateNonFungibleRequest
 */
export interface V0StateNonFungibleRequest {
    /**
     * The Bech32m-encoded human readable version of the resource's global address
     * @type {string}
     * @memberof V0StateNonFungibleRequest
     */
    resource_address: string;
    /**
     * The hex-encoded non-fungible id
     * @type {string}
     * @memberof V0StateNonFungibleRequest
     */
    non_fungible_id_hex: string;
}
/**
 * Check if a given object implements the V0StateNonFungibleRequest interface.
 */
export declare function instanceOfV0StateNonFungibleRequest(value: object): boolean;
export declare function V0StateNonFungibleRequestFromJSON(json: any): V0StateNonFungibleRequest;
export declare function V0StateNonFungibleRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): V0StateNonFungibleRequest;
export declare function V0StateNonFungibleRequestToJSON(value?: V0StateNonFungibleRequest | null): any;
