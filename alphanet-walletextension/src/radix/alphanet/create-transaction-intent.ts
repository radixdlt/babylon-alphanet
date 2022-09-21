import {
  TransactionIntent,
  TransactionManifest,
} from "@radixdlt/transaction-library";
import { createTransactionHeader } from "./create-transaction-header";
import { errorIdentity } from "./error-identity";

export const createTransactionIntent = (
  publicKey: string,
  manifest: TransactionManifest
) =>
  createTransactionHeader(publicKey, true)
    .map(
      (header): TransactionIntent => ({
        manifest,
        header,
      })
    )
    .mapErr(errorIdentity("Could not construct transaction intent"));
