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
import type { EntityType } from './EntityType';
/**
 *
 * @export
 * @interface GlobalEntityId
 */
export interface GlobalEntityId {
    /**
     *
     * @type {EntityType}
     * @memberof GlobalEntityId
     */
    entity_type: EntityType;
    /**
     * The hex-encoded bytes of the entity address
     * @type {string}
     * @memberof GlobalEntityId
     */
    entity_address_hex: string;
    /**
     * The hex-encoded bytes of the entity's global address. This is currently the same as entity_address, but may change in future.
     * @type {string}
     * @memberof GlobalEntityId
     */
    global_address_hex: string;
    /**
     * The Bech32m-encoded human readable version of the entity's global address
     * @type {string}
     * @memberof GlobalEntityId
     */
    global_address: string;
}
/**
 * Check if a given object implements the GlobalEntityId interface.
 */
export declare function instanceOfGlobalEntityId(value: object): boolean;
export declare function GlobalEntityIdFromJSON(json: any): GlobalEntityId;
export declare function GlobalEntityIdFromJSONTyped(json: any, ignoreDiscriminator: boolean): GlobalEntityId;
export declare function GlobalEntityIdToJSON(value?: GlobalEntityId | null): any;