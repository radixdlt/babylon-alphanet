import { config } from "config";
import { err, ResultAsync } from "neverthrow";
import {
  concatMap,
  filter,
  firstValueFrom,
  from,
  interval,
  map,
  merge,
  of,
  timer,
} from "rxjs";
import { coreApi, IntentStatus } from "./core-api";
import { errorIdentity } from "./error-identity";
import { ErrorResponse } from "./_types";

export const pollTransactionStatus = (
  transactionIntentHash: string,
  statuses: IntentStatus[]
) =>
  ResultAsync.fromPromise(
    firstValueFrom(
      merge(
        merge(interval(1000), of(true)).pipe(
          concatMap(() => from(coreApi.status(transactionIntentHash))),
          filter(
            (result) =>
              result.isErr() || statuses.includes(result.value.intent_status)
          )
        ),
        timer(config.alphanet.pollTransactionStatusTimeout).pipe(
          map(() =>
            err(
              errorIdentity(
                `Transaction was not committed within ${
                  config.alphanet.pollTransactionStatusTimeout / 1000
                } seconds`
              )({})
            )
          )
        )
      )
    ),
    (error) => error as ErrorResponse
  ).andThen((result) => result);
