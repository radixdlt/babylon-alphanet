import { CompileTransactionIntentRequest } from "@radixdlt/transaction-library";
import { errAsync, okAsync } from "neverthrow";
import { errorIdentity } from "./error-identity";
import { getTransactionService } from "./get-transaction-service";

export const compileTransactionIntent = (
  compileTransactionIntentRequest: CompileTransactionIntentRequest
) =>
  getTransactionService()
    .andThen((transactionService) => {
      const compiledResult = transactionService.compileTransactionIntent(
        compileTransactionIntentRequest
      );

      return "error" in compiledResult
        ? errAsync(compiledResult)
        : okAsync(compiledResult);
    })
    .map(({ compiled_intent }) => compiled_intent)
    .mapErr(errorIdentity("Could not compile transaction intent"));
