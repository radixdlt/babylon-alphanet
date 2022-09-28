# Alphanet Gateway API v0

Alphanet is releasing with a v0 Babylon API - available at https://alphanet.radixdlt.com/v0 - with [API docs on ReDocly](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/radixdlt/babylon-alphanet/main/gateway-api-v0/gateway-api-v0-schema.yaml).

This API is intended for integrating with Alphanet. The API surface is not intended to closely resemble the Babylon Gateway at mainnet launch. This will be coming for Betanet.

An SDK for calling the API from Javascript is available on npm at: [@radixdlt/alphanet-gateway-api-v0-sdk](https://www.npmjs.com/package/@radixdlt/alphanet-gateway-api-v0-sdk)

## Changes from the PTE API

* This API uses POST requests
* The intent hash is used to query transaction status and receipts. This intent hash is `SHA256(SHA256(intent_bytes))`, where `intent_bytes` is SBOR-encoded `TransactionIntent`.

## Contents

* The [Open API Specification](./gateway-api-v0-schema.yaml) for the API. Which can be [read on ReDocly](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/radixdlt/babylon-alphanet/main/gateway-api-v0/gateway-api-v0-schema.yaml).
* A [TypeScript SDK](./typescript-sdk/) for interacting with the API
* Examples:
  * We have an [example](./examples/node-16/) of using the SDK from NodeJS 
  * The [gumball-machine-example](../gumball-machine-example) shows how to use the SDK from the browser, along with the Alphanet wallet extension SDK.