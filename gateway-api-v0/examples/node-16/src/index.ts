import "./node-fetch-polyfill"
import { TransactionApi, StateApi, StatusApi, V0NetworkConfigurationResponse } from "@radixdlt/alphanet-gateway-api-v0-sdk";

const statusApi = new StatusApi();
const transactionApi = new TransactionApi();
const stateApi = new StateApi();

async function getNetworkConfiguration(): Promise<V0NetworkConfigurationResponse> {
    return statusApi.statusNetworkConfigurationPost();
}

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
    const networkConfiguration = await getNetworkConfiguration();
    console.info(`The faucet address is ${networkConfiguration.well_known_addresses.faucet}`)
    console.info(`The xrd address is ${networkConfiguration.well_known_addresses.xrd}`)
    console.info(`The account package address is ${networkConfiguration.well_known_addresses.account_package}`)

    console.info(`The current epoch is: ${await getEpoch()}`);

    const transactionIntentHashHex = "0000000000000000000000000000000000000000000000000000000000000000";
    console.info(`The status of the transaction with hash ${transactionIntentHashHex} is: ${await getTransactionStatus(transactionIntentHashHex)}`);
}

printExamples();
