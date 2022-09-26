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
import type { DataStruct } from './DataStruct';
/**
 * Only present if the non fungible isn't deleted
 * @export
 * @interface NonFungibleData
 */
export interface NonFungibleData {
    /**
     *
     * @type {DataStruct}
     * @memberof NonFungibleData
     */
    immutable_data: DataStruct;
    /**
     *
     * @type {DataStruct}
     * @memberof NonFungibleData
     */
    mutable_data: DataStruct;
}
/**
 * Check if a given object implements the NonFungibleData interface.
 */
export declare function instanceOfNonFungibleData(value: object): boolean;
export declare function NonFungibleDataFromJSON(json: any): NonFungibleData;
export declare function NonFungibleDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): NonFungibleData;
export declare function NonFungibleDataToJSON(value?: NonFungibleData | null): any;