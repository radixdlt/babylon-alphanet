import { Transaction } from "transaction/transactionState";
import { ActionType } from "./_types";

export const sendSignedTransaction = (signedTx: Transaction) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    return chrome.tabs.sendMessage(tabs[0].id, {
      type: ActionType.SignTransactionSuccess,
      payload: JSON.stringify(signedTx, null, 2),
    });
  });
};

export const getManifest = (): Promise<string> =>
  new Promise((resolve, reject) =>
    chrome.runtime.sendMessage({}, (response) => {
      if (response && response.manifest) resolve(response.manifest);
      else return;
    })
  );
