import { ReplaySubject } from "rxjs";
import {
  getMessagesFromChromeStore,
  getMessagesFromChromeStoreListener,
} from "./utils";
import { MessageStoreItem } from "@radixdlt/sdk";
import { chromeAPI } from "../chrome/chromeAPI";

export const messageListener = async () => {
  const messages$ = new ReplaySubject<MessageStoreItem[]>();
  const listener = (changes: Record<string, chrome.storage.StorageChange>) => {
    const result = getMessagesFromChromeStoreListener(changes);
    const messages = result.unwrapOr([]);
    messages$.next(messages);
  };
  chromeAPI.storage.addListener(listener);

  const result = await getMessagesFromChromeStore();
  if (result.isOk()) {
    const messages = result.value;
    messages$.next(messages);
  }

  return {
    messages$: messages$.asObservable(),
    destroy: () => {
      chromeAPI.storage.removeListener(listener);
    },
  };
};
