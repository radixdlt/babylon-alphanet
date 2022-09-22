import { ResultAsync } from "neverthrow";
import { Buffer } from "buffer";
import { errorIdentity } from "./error-identity";

const sha256 = (buffer: Buffer) =>
  ResultAsync.fromPromise(
    crypto.subtle.digest("SHA-256", buffer),
    (error) => error as Error
  ).map(Buffer.from);

export const createTransactionHash = (compiledTransactionIntent: string) =>
  sha256(Buffer.from(compiledTransactionIntent, "hex"))
    .andThen(sha256)
    .map((buffer) => buffer.toString("hex"))
    .mapErr(errorIdentity("Could not create transaction hash"));
