import React, { useEffect } from "react";
import { mergeMap, Subscription } from "rxjs";
import { messageHandler } from "./messageHandler";
import { messageListener } from "./messageListener";

export const MessageConnector: React.FC = ({ children }) => {
  useEffect(() => {
    let listener: Awaited<ReturnType<typeof messageListener>> = null;
    const subscription = new Subscription();

    (async () => {
      listener = await messageListener();
      subscription.add(
        listener.messages$.pipe(mergeMap(messageHandler)).subscribe()
      );
    })();

    return () => {
      listener?.destroy();
    };
  }, []);

  return <>{children}</>;
};
