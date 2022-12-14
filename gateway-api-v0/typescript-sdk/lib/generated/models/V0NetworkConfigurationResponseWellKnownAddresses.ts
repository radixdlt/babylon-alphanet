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
/**
 * Key addresses for this network.
 * @export
 * @interface V0NetworkConfigurationResponseWellKnownAddresses
 */
export interface V0NetworkConfigurationResponseWellKnownAddresses {
    /**
     * 
     * @type {string}
     * @memberof V0NetworkConfigurationResponseWellKnownAddresses
     */
    account_package: string;
    /**
     * 
     * @type {string}
     * @memberof V0NetworkConfigurationResponseWellKnownAddresses
     */
    faucet: string;
    /**
     * 
     * @type {string}
     * @memberof V0NetworkConfigurationResponseWellKnownAddresses
     */
    ecdsa_secp256k1: string;
    /**
     * 
     * @type {string}
     * @memberof V0NetworkConfigurationResponseWellKnownAddresses
     */
    eddsa_ed25519: string;
    /**
     * 
     * @type {string}
     * @memberof V0NetworkConfigurationResponseWellKnownAddresses
     */
    xrd: string;
}

/**
 * Check if a given object implements the V0NetworkConfigurationResponseWellKnownAddresses interface.
 */
export function instanceOfV0NetworkConfigurationResponseWellKnownAddresses(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "account_package" in value;
    isInstance = isInstance && "faucet" in value;
    isInstance = isInstance && "ecdsa_secp256k1" in value;
    isInstance = isInstance && "eddsa_ed25519" in value;
    isInstance = isInstance && "xrd" in value;

    return isInstance;
}

export function V0NetworkConfigurationResponseWellKnownAddressesFromJSON(json: any): V0NetworkConfigurationResponseWellKnownAddresses {
    return V0NetworkConfigurationResponseWellKnownAddressesFromJSONTyped(json, false);
}

export function V0NetworkConfigurationResponseWellKnownAddressesFromJSONTyped(json: any, ignoreDiscriminator: boolean): V0NetworkConfigurationResponseWellKnownAddresses {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'account_package': json['account_package'],
        'faucet': json['faucet'],
        'ecdsa_secp256k1': json['ecdsa_secp256k1'],
        'eddsa_ed25519': json['eddsa_ed25519'],
        'xrd': json['xrd'],
    };
}

export function V0NetworkConfigurationResponseWellKnownAddressesToJSON(value?: V0NetworkConfigurationResponseWellKnownAddresses | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'account_package': value.account_package,
        'faucet': value.faucet,
        'ecdsa_secp256k1': value.ecdsa_secp256k1,
        'eddsa_ed25519': value.eddsa_ed25519,
        'xrd': value.xrd,
    };
}

