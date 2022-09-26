"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./node-fetch-polyfill");
const alphanet_gateway_api_v0_sdk_1 = require("@radixdlt/alphanet-gateway-api-v0-sdk");
const transactionApi = new alphanet_gateway_api_v0_sdk_1.TransactionApi();
const stateApi = new alphanet_gateway_api_v0_sdk_1.StateApi();
async function getEpoch() {
    let response = await stateApi.stateEpochPost();
    return response.epoch;
}
async function getTransactionStatus(transactionIntentHashHex) {
    let response = await transactionApi.transactionStatusPost({
        v0TransactionStatusRequest: {
            intent_hash: transactionIntentHashHex
        }
    });
    return response.intent_status;
}
async function printExamples() {
    console.info(`The current epoch is: ${await getEpoch()}`);
    const transactionIntentHashHex = "0000000000000000000000000000000000000000000000000000000000000000";
    console.info(`The status of the transaction with hash ${transactionIntentHashHex} is: ${await getTransactionStatus(transactionIntentHashHex)}`);
}
printExamples();
