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
import { EcdsaSecp256k1Signature } from './EcdsaSecp256k1Signature';
import { EddsaEd25519Signature } from './EddsaEd25519Signature';
/**
 * @type Signature
 *
 * @export
 */
export declare type Signature = {
    key_type: 'EcdsaSecp256k1';
} & EcdsaSecp256k1Signature | {
    key_type: 'EddsaEd25519';
} & EddsaEd25519Signature;
export declare function SignatureFromJSON(json: any): Signature;
export declare function SignatureFromJSONTyped(json: any, ignoreDiscriminator: boolean): Signature;
export declare function SignatureToJSON(value?: Signature | null): any;
