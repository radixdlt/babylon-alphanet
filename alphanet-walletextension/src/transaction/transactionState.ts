import { getActiveAddress } from "address/addressState";
import { sendMessageToDapp } from "messages/utils";
import { ActionType, MessageTarget } from "messages/_types";
import { errAsync, okAsync } from "neverthrow";
import { alphanetSdk } from "radix/alphanet/alphanet-sdk";
import {
  CommittedTransaction,
  TransactionReceipt,
} from "radix/alphanet/core-api";
import { toast } from "react-toastify";
import { Subject } from "rxjs";
import { store } from "store/store";

export const transactionsStateTrigger = new Subject<void>();

export type Transaction = {
  id: string;
  transactionManifest: string;
  blobs: string[];
  receipt?: {
    committed: CommittedTransaction;
  };
  intentHash?: string;
  messageMeta?: { tabId: number; url: string; actionId: string };
};

const getKey = () =>
  getActiveAddress().andThen((address) =>
    address
      ? okAsync(`account/${address.accountAddress}/transactions`)
      : errAsync(Error("active address missing"))
  );

export const getTransactions = () =>
  getKey().andThen((key) => store.getItem<Transaction[]>(key, []));

export const addTransaction = async (
  transactionManifest: string,
  blobs: string[],
  messageMeta?: Transaction["messageMeta"]
) => {
  return getKey().andThen((key) =>
    getTransactions().andThen((transactions) => {
      const transaction = {
        transactionManifest,
        blobs,
        id: crypto.randomUUID(),
        messageMeta,
      };
      const updated: Transaction[] = [transaction, ...transactions];
      return store.setItem({ [key]: updated }).map(() => {
        transactionsStateTrigger.next();
        return transaction;
      });
    })
  );
};

export const removeTransaction = (id: string) =>
  getKey().andThen((key) =>
    getTransactions().andThen((transactions) => {
      const updated = transactions.filter(
        (transaction) => transaction.id !== id
      );
      return store.setItem({ [key]: updated }).map(() => {
        transactionsStateTrigger.next();
        return updated;
      });
    })
  );

export const removeAllTransactions = () => {
  getKey()
    .andThen((key) => store.setItem({ [key]: [] }))
    .map(() => {
      transactionsStateTrigger.next();
    });
};

export const updateTransaction = (input: Transaction) =>
  getKey().andThen((key) =>
    getTransactions().andThen((transactions) => {
      const updated = transactions.map((transaction) =>
        transaction.id === input.id ? input : transaction
      );
      return store.setItem({ [key]: updated }).map(() => {
        transactionsStateTrigger.next();
        return updated;
      });
    })
  );

export const submitTransaction = async (input: Transaction) =>
  getActiveAddress()
    .andThen((activeAddress) =>
      alphanetSdk().submitTransaction(
        activeAddress.privateKeyHex,
        input.transactionManifest,
        input.blobs
      )
    )
    .andThen(({ receipt, intentHash }) => {
      toast.success(`Transaction successfully submitted`);
      if (input.messageMeta) {
        const { tabId, url, actionId } = input.messageMeta;
        sendMessageToDapp({
          tabId,
          url,
          action: {
            id: actionId,
            type: ActionType.SignTransactionSuccess,
            payload: {
              transactionHash: intentHash,
            },
          },
          target: MessageTarget.Dapp,
          createdAt: Date.now(),
        });
      }

      return updateTransaction({
        ...input,
        receipt,
        intentHash,
      });
    })
    .mapErr((error) => {
      if ("code" in error) toast.error(error.message);
      if (input.messageMeta) {
        const { tabId, url, actionId } = input.messageMeta;
        sendMessageToDapp({
          tabId,
          url,
          action: {
            id: actionId,
            type: ActionType.SignTransactionFailure,
            payload: "",
          },
          target: MessageTarget.Dapp,
          createdAt: Date.now(),
        });
      }
      return error;
    });
