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
  tap,
  timer,
} from "rxjs";
import { coreApi, IntentStatus } from "./core-api";
import { ErrorResponse } from "./_types";

export const pollTransactionStatus = (
  transactionIntentHash: string,
  statuses: IntentStatus[]
) =>
  ResultAsync.fromPromise(
    firstValueFrom(
      merge(
        interval(1000).pipe(
          concatMap(() => from(coreApi.status(transactionIntentHash))),
          filter(
            (result) =>
              result.isErr() || statuses.includes(result.value.intent_status)
          )
        ),
        timer(config.alphanet.pollTransactionStatusTimeout).pipe(
          map(() =>
            err({
              code: "-2",
              message: "invalid transaction manifest",
              trace_id: "",
            })
          )
        )
      )
    ),
    (error) => error as ErrorResponse
  ).andThen((result) => result);
