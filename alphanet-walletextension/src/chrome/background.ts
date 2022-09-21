import { getActiveAddress } from "address/addressState";
import {
  ActionType,
  ActionTypes,
  Message,
  MessageStoreItem,
  MessageTarget,
} from "messages/_types";
import { sendMessageToDapp } from "../messages/utils";
import { chromeAPI } from "./chromeAPI";

chrome.runtime.onMessage.addListener(
  async (
    message: Message & { outerWidth: number },
    sender: chrome.runtime.MessageSender,
    sendResponse
  ) => {
    const { target, action, outerWidth } = message;

    const senderTabId = sender?.tab?.id;
    const url = sender?.origin;

    const createAction = (
      action: MessageStoreItem<ActionTypes>["action"]
    ): MessageStoreItem<ActionTypes> => ({
      tabId: senderTabId,
      url,
      action,
      target: MessageTarget.Dapp,
      createdAt: Date.now(),
    });

    if (target !== MessageTarget.Extension || !senderTabId || !url) return;

    const storeItemId = `radix#chromeExtension#message#${action.id}`;
    const storeItem: MessageStoreItem = {
      target,
      action,
      createdAt: Date.now(),
      tabId: senderTabId,
      url: url,
    };
    if (action.type === ActionType.GetAccountAddress) {
      const activeAccountAddressResult = await getActiveAddress();
      if (activeAccountAddressResult.isOk()) {
        sendMessageToDapp(
          createAction({
            id: action.id,
            type: ActionType.GetAccountAddressSuccess,
            payload: activeAccountAddressResult.value.accountAddress,
          })
        );
      } else {
        sendMessageToDapp(
          createAction({
            id: action.id,
            type: ActionType.GetAccountAddressFailure,
            payload: "",
          })
        );
      }
    } else if (action.type === ActionType.SignTransaction) {
      const extensionTabs = await chromeAPI.tabs.getExtensionTabsByUrl(
        chrome.runtime.id
      );

      const isExtensionOpen = extensionTabs.length > 0;

      await chrome.storage.local.set({ [storeItemId]: storeItem });

      if (!isExtensionOpen) {
        await chrome.windows.create(
          {
            url: chrome.runtime.getURL("index.html"),
            type: "popup",
            width: 320,
            height: 620,
            top: 110,
            left: outerWidth - 320,
          },
          async (popup) => {
            await chrome.storage.local.set({ popupId: popup.id });
          }
        );
      } else {
        chrome.storage.local.get("popupId", async (items) => {
          const popupId = Object.values(items)[0];
          if (popupId) {
            await chrome.windows.update(popupId, { focused: true });
          }
        });
      }
    }

    sendResponse(true);
  }
);
