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
/**
 *
 * @export
 * @interface PackageSubstateAllOf
 */
export interface PackageSubstateAllOf {
    /**
     * The hex-encoded package code
     * @type {string}
     * @memberof PackageSubstateAllOf
     */
    code_hex: string;
}
/**
 * Check if a given object implements the PackageSubstateAllOf interface.
 */
export declare function instanceOfPackageSubstateAllOf(value: object): boolean;
export declare function PackageSubstateAllOfFromJSON(json: any): PackageSubstateAllOf;
export declare function PackageSubstateAllOfFromJSONTyped(json: any, ignoreDiscriminator: boolean): PackageSubstateAllOf;
export declare function PackageSubstateAllOfToJSON(value?: PackageSubstateAllOf | null): any;
