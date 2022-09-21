import { removeMessageFromChromeStore, sendMessageToDapp } from "./utils";
import { toast } from "react-toastify";
import { addTransaction } from "transaction/transactionState";
import { ActionType, MessageStoreItem, MessageTarget } from "./_types";

export const messageHandler = async (messages: MessageStoreItem[]) => {
  for (let message of messages) {
    if (message.action.type === ActionType.SignTransaction) {
      try {
        await addTransaction(
          message.action.payload.transactionManifest,
          message.action.payload.blobs,
          {
            tabId: message.tabId,
            url: message.url,
            actionId: message.action.id,
          }
        );
      } catch (error) {
        console.error(error);
        toast.error(`Could not add transaction manifest`);
        sendMessageToDapp({
          tabId: message.tabId,
          url: message.url,
          action: {
            id: message.action.id,
            type: ActionType.SignTransactionFailure,
            payload: error,
          },
          target: MessageTarget.Dapp,
          createdAt: Date.now(),
        });
      } finally {
        await removeMessageFromChromeStore([message.action.id]);
      }
    }
  }
};
