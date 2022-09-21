import { ok, Result, ResultAsync } from "neverthrow";
import { chromeAPI } from "../chrome/chromeAPI";
import { MessageStoreItem } from "./_types";

export const filterMessages = (
  storeItems: Record<string, unknown>
): Result<MessageStoreItem[], Error> => {
  return ok(
    Object.entries(storeItems)
      .filter(
        ([key, value]) =>
          key.startsWith(`radix#chromeExtension#message#`) && !!value
      )
      .map(([, value]: [string, MessageStoreItem]) => value)
  );
};

export const getMessagesFromChromeStoreListener = (
  changes: chrome.storage.StorageChange
): Result<MessageStoreItem[], Error> =>
  ok(
    Object.entries(changes).reduce<Record<string, unknown>>(
      (acc, [key, value]) => ({ ...acc, [key]: value.newValue }),
      {}
    )
  ).andThen(filterMessages);

export const getMessagesFromChromeStore = () =>
  ResultAsync.fromPromise<Record<string, unknown>, Error>(
    chromeAPI.storage.getAllItems(),
    (e: Error) => e
  ).andThen(filterMessages);

export const removeMessageFromChromeStore = async (ids: string[]) =>
  chromeAPI.storage.removeItem(
    ids.map((id) => `radix#chromeExtension#message#${id}`)
  );

export const sendMessageToDapp = (message: MessageStoreItem) => {
  return chromeAPI.sendMessage(message);
};

export const removeMessage = async (ids: string[]) => {
  await removeMessageFromChromeStore(ids);
};
