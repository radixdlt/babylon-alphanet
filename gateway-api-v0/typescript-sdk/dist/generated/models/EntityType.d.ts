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
export declare const EntityType: {
    readonly System: "System";
    readonly ResourceManager: "ResourceManager";
    readonly Component: "Component";
    readonly Package: "Package";
    readonly Vault: "Vault";
    readonly KeyValueStore: "KeyValueStore";
};
export declare type EntityType = typeof EntityType[keyof typeof EntityType];
export declare function EntityTypeFromJSON(json: any): EntityType;
export declare function EntityTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): EntityType;
export declare function EntityTypeToJSON(value?: EntityType | null): any;