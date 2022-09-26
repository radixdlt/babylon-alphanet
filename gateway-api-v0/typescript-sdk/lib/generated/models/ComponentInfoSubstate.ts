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
import type { ComponentInfoSubstateAllOf } from './ComponentInfoSubstateAllOf';
import {
    ComponentInfoSubstateAllOfFromJSON,
    ComponentInfoSubstateAllOfFromJSONTyped,
    ComponentInfoSubstateAllOfToJSON,
} from './ComponentInfoSubstateAllOf';
import type { EntityType } from './EntityType';
import {
    EntityTypeFromJSON,
    EntityTypeFromJSONTyped,
    EntityTypeToJSON,
} from './EntityType';
import type { SubstateBase } from './SubstateBase';
import {
    SubstateBaseFromJSON,
    SubstateBaseFromJSONTyped,
    SubstateBaseToJSON,
} from './SubstateBase';
import type { SubstateType } from './SubstateType';
import {
    SubstateTypeFromJSON,
    SubstateTypeFromJSONTyped,
    SubstateTypeToJSON,
} from './SubstateType';

/**
 * 
 * @export
 * @interface ComponentInfoSubstate
 */
export interface ComponentInfoSubstate {
    /**
     * 
     * @type {EntityType}
     * @memberof ComponentInfoSubstate
     */
    entity_type: EntityType;
    /**
     * 
     * @type {SubstateType}
     * @memberof ComponentInfoSubstate
     */
    substate_type: SubstateType;
    /**
     * The Bech32m-encoded human readable version of the package address
     * @type {string}
     * @memberof ComponentInfoSubstate
     */
    package_address: string;
    /**
     * 
     * @type {string}
     * @memberof ComponentInfoSubstate
     */
    blueprint_name: string;
}

/**
 * Check if a given object implements the ComponentInfoSubstate interface.
 */
export function instanceOfComponentInfoSubstate(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "entity_type" in value;
    isInstance = isInstance && "substate_type" in value;
    isInstance = isInstance && "package_address" in value;
    isInstance = isInstance && "blueprint_name" in value;

    return isInstance;
}

export function ComponentInfoSubstateFromJSON(json: any): ComponentInfoSubstate {
    return ComponentInfoSubstateFromJSONTyped(json, false);
}

export function ComponentInfoSubstateFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComponentInfoSubstate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entity_type': EntityTypeFromJSON(json['entity_type']),
        'substate_type': SubstateTypeFromJSON(json['substate_type']),
        'package_address': json['package_address'],
        'blueprint_name': json['blueprint_name'],
    };
}

export function ComponentInfoSubstateToJSON(value?: ComponentInfoSubstate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entity_type': EntityTypeToJSON(value.entity_type),
        'substate_type': SubstateTypeToJSON(value.substate_type),
        'package_address': value.package_address,
        'blueprint_name': value.blueprint_name,
    };
}
