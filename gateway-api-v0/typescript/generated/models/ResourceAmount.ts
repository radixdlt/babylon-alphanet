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

import {
    FungibleResourceAmount,
    instanceOfFungibleResourceAmount,
    FungibleResourceAmountFromJSON,
    FungibleResourceAmountFromJSONTyped,
    FungibleResourceAmountToJSON,
} from './FungibleResourceAmount';
import {
    NonFungibleResourceAmount,
    instanceOfNonFungibleResourceAmount,
    NonFungibleResourceAmountFromJSON,
    NonFungibleResourceAmountFromJSONTyped,
    NonFungibleResourceAmountToJSON,
} from './NonFungibleResourceAmount';

/**
 * @type ResourceAmount
 * 
 * @export
 */
export type ResourceAmount = { resourceType: 'Fungible' } & FungibleResourceAmount | { resourceType: 'NonFungible' } & NonFungibleResourceAmount;

export function ResourceAmountFromJSON(json: any): ResourceAmount {
    return ResourceAmountFromJSONTyped(json, false);
}

export function ResourceAmountFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResourceAmount {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    switch (json['resourceType']) {
        case 'Fungible':
            return {...FungibleResourceAmountFromJSONTyped(json, true), resourceType: 'Fungible'};
        case 'NonFungible':
            return {...NonFungibleResourceAmountFromJSONTyped(json, true), resourceType: 'NonFungible'};
        default:
            throw new Error(`No variant of ResourceAmount exists with 'resourceType=${json['resourceType']}'`);
    }
}

export function ResourceAmountToJSON(value?: ResourceAmount | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    switch (value['resourceType']) {
        case 'Fungible':
            return FungibleResourceAmountToJSON(value);
        case 'NonFungible':
            return NonFungibleResourceAmountToJSON(value);
        default:
            throw new Error(`No variant of ResourceAmount exists with 'resourceType=${value['resourceType']}'`);
    }

}
