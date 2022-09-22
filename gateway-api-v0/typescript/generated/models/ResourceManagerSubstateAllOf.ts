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
import type { ResourceManagerSubstateAllOfMetadata } from './ResourceManagerSubstateAllOfMetadata';
import {
    ResourceManagerSubstateAllOfMetadataFromJSON,
    ResourceManagerSubstateAllOfMetadataFromJSONTyped,
    ResourceManagerSubstateAllOfMetadataToJSON,
} from './ResourceManagerSubstateAllOfMetadata';
import type { ResourceType } from './ResourceType';
import {
    ResourceTypeFromJSON,
    ResourceTypeFromJSONTyped,
    ResourceTypeToJSON,
} from './ResourceType';

/**
 * 
 * @export
 * @interface ResourceManagerSubstateAllOf
 */
export interface ResourceManagerSubstateAllOf {
    /**
     * 
     * @type {ResourceType}
     * @memberof ResourceManagerSubstateAllOf
     */
    resourceType: ResourceType;
    /**
     * 
     * @type {number}
     * @memberof ResourceManagerSubstateAllOf
     */
    fungibleDivisibility?: number;
    /**
     * 
     * @type {Array<ResourceManagerSubstateAllOfMetadata>}
     * @memberof ResourceManagerSubstateAllOf
     */
    metadata: Array<ResourceManagerSubstateAllOfMetadata>;
    /**
     * A decimal-string-encoded integer between 0 and 2^255-1, which represents the total number of 10^(-18) subunits in
     * the total supply of this resource.
     * @type {string}
     * @memberof ResourceManagerSubstateAllOf
     */
    totalSupplyAttos: string;
}

/**
 * Check if a given object implements the ResourceManagerSubstateAllOf interface.
 */
export function instanceOfResourceManagerSubstateAllOf(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "resourceType" in value;
    isInstance = isInstance && "metadata" in value;
    isInstance = isInstance && "totalSupplyAttos" in value;

    return isInstance;
}

export function ResourceManagerSubstateAllOfFromJSON(json: any): ResourceManagerSubstateAllOf {
    return ResourceManagerSubstateAllOfFromJSONTyped(json, false);
}

export function ResourceManagerSubstateAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): ResourceManagerSubstateAllOf {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'resourceType': ResourceTypeFromJSON(json['resource_type']),
        'fungibleDivisibility': !exists(json, 'fungible_divisibility') ? undefined : json['fungible_divisibility'],
        'metadata': ((json['metadata'] as Array<any>).map(ResourceManagerSubstateAllOfMetadataFromJSON)),
        'totalSupplyAttos': json['total_supply_attos'],
    };
}

export function ResourceManagerSubstateAllOfToJSON(value?: ResourceManagerSubstateAllOf | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'resource_type': ResourceTypeToJSON(value.resourceType),
        'fungible_divisibility': value.fungibleDivisibility,
        'metadata': ((value.metadata as Array<any>).map(ResourceManagerSubstateAllOfMetadataToJSON)),
        'total_supply_attos': value.totalSupplyAttos,
    };
}
