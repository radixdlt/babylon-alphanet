# Alphanet Gateway v0 SDK

This SDK is a thin wrapper around the Babylon V0 Gateway API, detailed in [the Open API schema](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/radixdlt/babylon-alphanet/main/gateway-api-v0/gateway-api-v0-schema.yaml).

## Usage

Behind the scenes, this library uses the fetch API.

If in an environment where this is not available, a polyfill must be used.

An example using this with node is provided [here in the github repo](https://github.com/radixdlt/babylon-alphanet/blob/main/gateway-api-v0/examples/node-16/src/index.ts).

```typescript
import "./node-fetch-polyfill" // Polyfill for fetch required if running in node-js
import { TransactionApi, StateApi } from "@radixdlt/alphanet-gateway-api-v0-sdk";

const transactionApi = new TransactionApi();
const stateApi = new StateApi();

async function getEpoch() {
    let response = await stateApi.stateEpochPost();
    return response.epoch;
}

async function getTransactionStatus(transactionIntentHashHex: string) {
    let response = await transactionApi.transactionStatusPost({
        v0TransactionStatusRequest: {
            intent_hash: transactionIntentHashHex
        }
    });
    return response.intent_status;
}
```
