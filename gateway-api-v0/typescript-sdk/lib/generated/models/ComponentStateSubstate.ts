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
import type { ComponentStateSubstateAllOf } from './ComponentStateSubstateAllOf';
import {
    ComponentStateSubstateAllOfFromJSON,
    ComponentStateSubstateAllOfFromJSONTyped,
    ComponentStateSubstateAllOfToJSON,
} from './ComponentStateSubstateAllOf';
import type { DataStruct } from './DataStruct';
import {
    DataStructFromJSON,
    DataStructFromJSONTyped,
    DataStructToJSON,
} from './DataStruct';
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
 * @interface ComponentStateSubstate
 */
export interface ComponentStateSubstate {
    /**
     * 
     * @type {EntityType}
     * @memberof ComponentStateSubstate
     */
    entity_type: EntityType;
    /**
     * 
     * @type {SubstateType}
     * @memberof ComponentStateSubstate
     */
    substate_type: SubstateType;
    /**
     * 
     * @type {DataStruct}
     * @memberof ComponentStateSubstate
     */
    data_struct: DataStruct;
}

/**
 * Check if a given object implements the ComponentStateSubstate interface.
 */
export function instanceOfComponentStateSubstate(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "entity_type" in value;
    isInstance = isInstance && "substate_type" in value;
    isInstance = isInstance && "data_struct" in value;

    return isInstance;
}

export function ComponentStateSubstateFromJSON(json: any): ComponentStateSubstate {
    return ComponentStateSubstateFromJSONTyped(json, false);
}

export function ComponentStateSubstateFromJSONTyped(json: any, ignoreDiscriminator: boolean): ComponentStateSubstate {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'entity_type': EntityTypeFromJSON(json['entity_type']),
        'substate_type': SubstateTypeFromJSON(json['substate_type']),
        'data_struct': DataStructFromJSON(json['data_struct']),
    };
}

export function ComponentStateSubstateToJSON(value?: ComponentStateSubstate | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'entity_type': EntityTypeToJSON(value.entity_type),
        'substate_type': SubstateTypeToJSON(value.substate_type),
        'data_struct': DataStructToJSON(value.data_struct),
    };
}

