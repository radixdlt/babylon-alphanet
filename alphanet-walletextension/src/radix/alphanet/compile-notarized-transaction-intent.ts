import { errAsync, okAsync } from "neverthrow";
import { getTransactionService } from "./get-transaction-service";
import { CompileNotarizedTransactionIntentRequest } from "@radixdlt/transaction-library";
import { errorIdentity } from "./error-identity";

export const compileNotarizedTransactionIntent = (
  input: CompileNotarizedTransactionIntentRequest
) => {
  return getTransactionService()
    .andThen((transactionService) => {
      const compiledResult =
        transactionService.compileNotarizedTransactionIntent(input);

      return "error" in compiledResult
        ? errAsync(compiledResult)
        : okAsync(compiledResult);
    })
    .map(({ compiled_notarized_intent }) => compiled_notarized_intent)
    .mapErr(errorIdentity("Could not compile notarized transaction intent"));
};
