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
import type { DownSubstate } from './DownSubstate';
import {
    DownSubstateFromJSON,
    DownSubstateFromJSONTyped,
    DownSubstateToJSON,
} from './DownSubstate';
import type { GlobalEntityId } from './GlobalEntityId';
import {
    GlobalEntityIdFromJSON,
    GlobalEntityIdFromJSONTyped,
    GlobalEntityIdToJSON,
} from './GlobalEntityId';
import type { SubstateId } from './SubstateId';
import {
    SubstateIdFromJSON,
    SubstateIdFromJSONTyped,
    SubstateIdToJSON,
} from './SubstateId';
import type { UpSubstate } from './UpSubstate';
import {
    UpSubstateFromJSON,
    UpSubstateFromJSONTyped,
    UpSubstateToJSON,
} from './UpSubstate';

/**
 * Transaction state updates (only present if status is Succeeded or Failed)
 * @export
 * @interface StateUpdates
 */
export interface StateUpdates {
    /**
     * 
     * @type {Array<SubstateId>}
     * @memberof StateUpdates
     */
    down_virtual_substates: Array<SubstateId>;
    /**
     * 
     * @type {Array<UpSubstate>}
     * @memberof StateUpdates
     */
    up_substates: Array<UpSubstate>;
    /**
     * 
     * @type {Array<DownSubstate>}
     * @memberof StateUpdates
     */
    down_substates: Array<DownSubstate>;
    /**
     * 
     * @type {Array<GlobalEntityId>}
     * @memberof StateUpdates
     */
    new_global_entities: Array<GlobalEntityId>;
}

/**
 * Check if a given object implements the StateUpdates interface.
 */
export function instanceOfStateUpdates(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "down_virtual_substates" in value;
    isInstance = isInstance && "up_substates" in value;
    isInstance = isInstance && "down_substates" in value;
    isInstance = isInstance && "new_global_entities" in value;

    return isInstance;
}

export function StateUpdatesFromJSON(json: any): StateUpdates {
    return StateUpdatesFromJSONTyped(json, false);
}

export function StateUpdatesFromJSONTyped(json: any, ignoreDiscriminator: boolean): StateUpdates {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'down_virtual_substates': ((json['down_virtual_substates'] as Array<any>).map(SubstateIdFromJSON)),
        'up_substates': ((json['up_substates'] as Array<any>).map(UpSubstateFromJSON)),
        'down_substates': ((json['down_substates'] as Array<any>).map(DownSubstateFromJSON)),
        'new_global_entities': ((json['new_global_entities'] as Array<any>).map(GlobalEntityIdFromJSON)),
    };
}

export function StateUpdatesToJSON(value?: StateUpdates | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'down_virtual_substates': ((value.down_virtual_substates as Array<any>).map(SubstateIdToJSON)),
        'up_substates': ((value.up_substates as Array<any>).map(UpSubstateToJSON)),
        'down_substates': ((value.down_substates as Array<any>).map(DownSubstateToJSON)),
        'new_global_entities': ((value.new_global_entities as Array<any>).map(GlobalEntityIdToJSON)),
    };
}

