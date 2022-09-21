import { addressStateTrigger } from "address/addressState";
import { useEffect, useState } from "react";
import { merge, switchMap, tap } from "rxjs";
import {
  getTransactions,
  Transaction,
  transactionsStateTrigger,
} from "./transactionState";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const subscription = merge(transactionsStateTrigger, addressStateTrigger)
      .pipe(
        switchMap(getTransactions),
        tap((result) => {
          if (result.isOk()) setTransactions(result.value);
        })
      )
      .subscribe();

    getTransactions().map((transactions) => setTransactions(transactions));

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return transactions;
};
