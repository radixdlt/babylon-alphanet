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
 */
export declare const SubstateType: {
    readonly System: "System";
    readonly ResourceManager: "ResourceManager";
    readonly ComponentInfo: "ComponentInfo";
    readonly ComponentState: "ComponentState";
    readonly Package: "Package";
    readonly Vault: "Vault";
    readonly NonFungible: "NonFungible";
    readonly KeyValueStoreEntry: "KeyValueStoreEntry";
};
export declare type SubstateType = typeof SubstateType[keyof typeof SubstateType];
export declare function SubstateTypeFromJSON(json: any): SubstateType;
export declare function SubstateTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubstateType;
export declare function SubstateTypeToJSON(value?: SubstateType | null): any;
