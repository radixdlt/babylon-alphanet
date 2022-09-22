import { Curve, TransactionHeader } from "@radixdlt/transaction-library";
import { secureRandom } from "crypto/secure-random";
import { ResultAsync } from "neverthrow";
import { coreApi } from "./core-api";
import { errorIdentity } from "./error-identity";
import { ErrorResponse } from "./_types";

export const createTransactionHeader = (
  public_key: string,
  notary_as_signatory: boolean
): ResultAsync<TransactionHeader, ErrorResponse> =>
  coreApi
    .epoch()
    .andThen(({ epoch }) =>
      secureRandom(8).map((nonce) => ({
        version: 1,
        network_id: 0x0a,
        start_epoch_inclusive: epoch,
        end_epoch_exclusive: epoch + 2,
        nonce,
        notary_public_key: {
          type: Curve.EcdsaSecp256k1,
          public_key,
        },
        notary_as_signatory,
        cost_unit_limit: 10_000_000,
        tip_percentage: 0,
      }))
    )
    .mapErr(errorIdentity("Could not construct transaction header"));
