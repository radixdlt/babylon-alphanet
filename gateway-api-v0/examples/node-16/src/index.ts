import "./node-fetch-polyfill"
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

async function printExamples() {
    console.info(`The current epoch is: ${await getEpoch()}`);

    const transactionIntentHashHex = "0000000000000000000000000000000000000000000000000000000000000000";
    console.info(`The status of the transaction with hash ${transactionIntentHashHex} is: ${await getTransactionStatus(transactionIntentHashHex)}`);
}

printExamples();
