import { useEffect, useState } from "react";
import { switchMap, tap } from "rxjs";
import { addressStateTrigger, getActiveAddress, Address } from "./addressState";

export const useActiveAddress = () => {
  const [address, setAddress] = useState<Address | undefined>();

  useEffect(() => {
    const subscription = addressStateTrigger
      .pipe(
        switchMap(getActiveAddress),
        tap((result) => {
          if (result.isOk()) setAddress(result.value);
        })
      )
      .subscribe();

    getActiveAddress().map((address) => {
      setAddress(address);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return address;
};
