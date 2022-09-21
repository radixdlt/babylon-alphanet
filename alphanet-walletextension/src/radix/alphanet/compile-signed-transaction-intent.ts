import { SignedTransactionIntent } from "@radixdlt/transaction-library/dist/interfaces";
import { errAsync, okAsync } from "neverthrow";
import { errorIdentity } from "./error-identity";
import { getTransactionService } from "./get-transaction-service";

export const compileSignedTransactionIntent = (
  signedTransactionIntent: SignedTransactionIntent
) =>
  getTransactionService()
    .andThen((transactionService) => {
      const compiledResult = transactionService.compileSignedTransactionIntent(
        signedTransactionIntent
      );

      return "error" in compiledResult
        ? errAsync(compiledResult)
        : okAsync(compiledResult);
    })
    .map(({ compiled_signed_intent }) => compiled_signed_intent)
    .mapErr(errorIdentity("Could not compile transaction intent"));
