import { ok } from "assert";
import { err, errAsync, okAsync, ResultAsync } from "neverthrow";
import { alphanetSdk } from "radix/alphanet/alphanet-sdk";
import { toast } from "react-toastify";
import { Subject } from "rxjs";
import { store } from "store/store";

export type Address = { accountAddress: string; privateKeyHex: string };

export const addressStateTrigger = new Subject<void>();

export const getAddresses = () => store.getItem<Address[]>("addresses", []);

export const setActiveAddress = (activeAccountAddress: Address) =>
  store.setItem({ activeAccountAddress }).map(() => {
    addressStateTrigger.next();
  });

export const getActiveAddress = () =>
  store
    .getItem<Address>("activeAccountAddress")
    .andThen((address) => (address ? okAsync(address) : errAsync(address)));

export const addAddress = (address: Address) =>
  getAddresses()
    .andThen((addresses) =>
      store.setItem({ addresses: [...addresses, address] })
    )
    .map(() => address);

export const createAddress = () =>
  alphanetSdk()
    .createAccount()
    .mapErr((error) => {
      if ("code" in error) toast.error(error.message);
      return error;
    })
    .andThen(addAddress)
    .andThen(setActiveAddress)
    .map((result) => {
      toast.success("Account address created");
      return result;
    });
