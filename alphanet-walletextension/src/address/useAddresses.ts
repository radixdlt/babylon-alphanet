import { useEffect, useState } from "react";
import { switchMap, tap } from "rxjs";
import { Address, addressStateTrigger, getAddresses } from "./addressState";

export const useAddresses = () => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    const subscription = addressStateTrigger
      .pipe(
        switchMap(getAddresses),
        tap((result) => {
          if (result.isOk()) setAddresses(result.value);
        })
      )
      .subscribe();

    getAddresses().map((addresses) => setAddresses(addresses));

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return addresses;
};
