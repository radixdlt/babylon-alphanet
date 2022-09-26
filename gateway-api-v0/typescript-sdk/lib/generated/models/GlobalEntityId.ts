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
import type { EntityType } from './EntityType';
import {
    EntityTypeFromJSON,
    EntityTypeFromJSONTyped,
    EntityTypeToJSON,
} from './EntityType';

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
export function instanceOfGlobalEntityId(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "entity_type" in value;
    isInstance = isInstance && "entity_address_hex" in value;
    isInstance = isInstance && "global_address_hex" in value;
    isInstance = isInstance && "global_address" in value;

    return isInstance;
}

export function GlobalEntityIdFromJSON(json: any): GlobalEntityId {
    return GlobalEntityIdFromJSONTyped(json, false);
}

export function GlobalEntityIdFromJSONTyped(json: any, ignoreDiscriminator: boolean): GlobalEntityId {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entity_type': EntityTypeFromJSON(json['entity_type']),
        'entity_address_hex': json['entity_address_hex'],
        'global_address_hex': json['global_address_hex'],
        'global_address': json['global_address'],
    };
}

export function GlobalEntityIdToJSON(value?: GlobalEntityId | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entity_type': EntityTypeToJSON(value.entity_type),
        'entity_address_hex': value.entity_address_hex,
        'global_address_hex': value.global_address_hex,
        'global_address': value.global_address,
    };
}
