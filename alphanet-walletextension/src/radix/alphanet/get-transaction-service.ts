import { createTransactionService } from "@radixdlt/transaction-library";
import { ResultAsync } from "neverthrow";

export const getTransactionService = () =>
  ResultAsync.fromPromise(
    createTransactionService(),
    (error) => error as Error
  );
