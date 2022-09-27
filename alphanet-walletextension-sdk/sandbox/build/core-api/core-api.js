import {err, ok, ResultAsync} from "../_snowpack/pkg/neverthrow.js";
import {errorIdentity} from "./error-identity.js";
import {fromResponse} from "./utils.js";
export const intentStatus = {
  CommittedSuccess: "CommittedSuccess",
  CommittedFailure: "CommittedFailure",
  InMempool: "InMempool",
  Rejected: "Rejected",
  Unknown: "Unknown"
};
export const transactionStatus = {
  Succeeded: "Succeeded",
  Failed: "Failed",
  Rejected: "Rejected"
};
const CoreApi = (baseUrl) => {
  const request = (data, ...input) => {
    const headers = input[1]?.headers || {};
    return ResultAsync.fromPromise(fetch(input[0], {
      ...input[1],
      method: "POST",
      headers: {
        ...headers,
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    }), (error) => error).andThen((response) => fromResponse(response)).andThen(({data: data2, status}) => status === 200 ? ok(data2) : err(data2)).mapErr(errorIdentity("Core API error"));
  };
  return {
    epoch: () => request({}, `${baseUrl}/v0/state/epoch`),
    submitTransaction: (notarized_transaction_hex) => request({
      notarized_transaction_hex
    }, `${baseUrl}/v0/transaction/submit`),
    status: (intent_hash) => request({intent_hash}, `${baseUrl}/v0/transaction/status`),
    receipt: (intent_hash) => request({intent_hash}, `${baseUrl}/v0/transaction/receipt`)
  };
};
export const coreApi = CoreApi("https://alphanet.radixdlt.com");
