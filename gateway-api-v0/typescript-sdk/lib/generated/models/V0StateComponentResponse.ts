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
import type { Substate } from './Substate';
import {
    SubstateFromJSON,
    SubstateFromJSONTyped,
    SubstateToJSON,
} from './Substate';
import type { V0StateComponentDescendentId } from './V0StateComponentDescendentId';
import {
    V0StateComponentDescendentIdFromJSON,
    V0StateComponentDescendentIdFromJSONTyped,
    V0StateComponentDescendentIdToJSON,
} from './V0StateComponentDescendentId';

/**
 * 
 * @export
 * @interface V0StateComponentResponse
 */
export interface V0StateComponentResponse {
    /**
     * 
     * @type {Substate}
     * @memberof V0StateComponentResponse
     */
    info: Substate;
    /**
     * 
     * @type {Substate}
     * @memberof V0StateComponentResponse
     */
    state: Substate;
    /**
     * Any vaults owned directly or indirectly by the component
     * @type {Array<Substate>}
     * @memberof V0StateComponentResponse
     */
    owned_vaults: Array<Substate>;
    /**
     * Any descendent nodes owned directly or indirectly by the component
     * @type {Array<V0StateComponentDescendentId>}
     * @memberof V0StateComponentResponse
     */
    descendent_ids: Array<V0StateComponentDescendentId>;
}

/**
 * Check if a given object implements the V0StateComponentResponse interface.
 */
export function instanceOfV0StateComponentResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "info" in value;
    isInstance = isInstance && "state" in value;
    isInstance = isInstance && "owned_vaults" in value;
    isInstance = isInstance && "descendent_ids" in value;

    return isInstance;
}

export function V0StateComponentResponseFromJSON(json: any): V0StateComponentResponse {
    return V0StateComponentResponseFromJSONTyped(json, false);
}

export function V0StateComponentResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): V0StateComponentResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'info': SubstateFromJSON(json['info']),
        'state': SubstateFromJSON(json['state']),
        'owned_vaults': ((json['owned_vaults'] as Array<any>).map(SubstateFromJSON)),
        'descendent_ids': ((json['descendent_ids'] as Array<any>).map(V0StateComponentDescendentIdFromJSON)),
    };
}

export function V0StateComponentResponseToJSON(value?: V0StateComponentResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'info': SubstateToJSON(value.info),
        'state': SubstateToJSON(value.state),
        'owned_vaults': ((value.owned_vaults as Array<any>).map(SubstateToJSON)),
        'descendent_ids': ((value.descendent_ids as Array<any>).map(V0StateComponentDescendentIdToJSON)),
    };
}
