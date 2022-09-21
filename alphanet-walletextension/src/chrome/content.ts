import { ActionTypes, MessageTarget } from "messages/_types";

chrome.runtime.onMessage.addListener((message, sender, response) => {
  if (message.target !== MessageTarget.Dapp) return;
  const event = new CustomEvent("radix#chromeExtension#receive", {
    detail: message,
  });

  window.dispatchEvent(event);
  response(true);
});

window.addEventListener(
  "radix#chromeExtension#send",
  (event: CustomEvent<ActionTypes>) => {
    const message = {
      ...event.detail,
      target: MessageTarget.Extension,
      outerWidth: window.outerWidth,
    };
    console.log("radix#chromeExtension#send", message);
    chrome.runtime.sendMessage(message);
  }
);
