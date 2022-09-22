import {
  Curve,
  ManifestInstructionsKind,
  TransactionIntent,
  TransactionManifest,
} from "@radixdlt/transaction-library";
import { EcdsaSecp256k1KeyPair } from "crypto/keypair";
import { err, ok } from "neverthrow";
import { byteArrayFromHex, hexStringFromByteArray } from "utils";
import { compileNotarizedTransactionIntent } from "./compile-notarized-transaction-intent";
import { compileSignedTransactionIntent } from "./compile-signed-transaction-intent";
import { compileTransactionIntent } from "./compile-transaction-intent";
import { coreApi, intentStatus } from "./core-api";
import { createAccountInstructions } from "./create-account-instructions";
import { createTransactionHash } from "./create-transaction-hash";
import { createTransactionIntent } from "./create-transaction-intent";
import { errorIdentity } from "./error-identity";
import { pollTransactionStatus } from "./poll-transaction-status";

export const alphanetSdk = () => {
  const apiClient = coreApi;
  const createKeyPair = EcdsaSecp256k1KeyPair.newRandom;
  const keyPairFromPrivateKeyHex = EcdsaSecp256k1KeyPair.newFromString;

  const pollTransactionStatusUntilCommitted = (intentHash: string) =>
    pollTransactionStatus(intentHash, [
      intentStatus.CommittedSuccess,
      intentStatus.CommittedFailure,
      intentStatus.Rejected,
    ]).mapErr(errorIdentity("Failed to get committed transaction status"));

  const submitTransactionAndPollUntilCommitted = (
    notarizedTransactionHex: string,
    transactionIntent: TransactionIntent
  ) =>
    apiClient
      .submitTransaction(notarizedTransactionHex)
      .andThen(() => compileTransactionIntent(transactionIntent))
      .andThen(createTransactionHash)
      .andThen((intentHash) =>
        pollTransactionStatusUntilCommitted(intentHash).map(() => intentHash)
      );

  const submitTransaction = (
    privateKeyHex: string,
    transactionManifest: string,
    blobs: string[]
  ) => {
    const keyPair = keyPairFromPrivateKeyHex(privateKeyHex);
    const signer = createSigner(keyPair);

    const transactionManifestObject: TransactionManifest = {
      instructions: {
        type: ManifestInstructionsKind.String,
        value: transactionManifest,
      },
    };

    if (blobs.length) transactionManifestObject.blobs = blobs;

    return createTransactionIntent(
      keyPair.publicKeyHex(),
      transactionManifestObject
    )
      .map((transaction_intent) => ({ transaction_intent, signatures: [] }))
      .andThen((transactionIntentWithSignatures) =>
        compileSignedTransactionIntent(transactionIntentWithSignatures)
          .andThen(signer)
          .andThen((signature) =>
            compileNotarizedTransactionIntent({
              signed_intent: transactionIntentWithSignatures,
              notary_signature: signature,
            })
          )
          .andThen((notarizedTransactionIntent) =>
            submitTransactionAndPollUntilCommitted(
              notarizedTransactionIntent,
              transactionIntentWithSignatures.transaction_intent
            )
          )
          .andThen((intentHash) =>
            apiClient
              .receipt(intentHash)
              .map((receipt) => ({ intentHash, receipt }))
          )
      );
  };

  const createSigner = (keyPair: EcdsaSecp256k1KeyPair) => (hex: string) =>
    ok({
      type: Curve.EcdsaSecp256k1,
      signature: hexStringFromByteArray(keyPair.sign(byteArrayFromHex(hex))),
    });

  const createAccount = () => {
    const keyPair = createKeyPair();
    const publicKey = keyPair.publicKeyHex();
    const instructions = createAccountInstructions(publicKey);
    const signer = createSigner(keyPair);

    return createTransactionIntent(publicKey, {
      instructions,
    })
      .map((transaction_intent) => ({ transaction_intent, signatures: [] }))
      .andThen((transactionIntentWithSignatures) =>
        compileSignedTransactionIntent(transactionIntentWithSignatures)
          .andThen(signer)
          .andThen((signature) =>
            compileNotarizedTransactionIntent({
              signed_intent: transactionIntentWithSignatures,
              notary_signature: signature,
            })
          )
          .andThen((notarizedTransactionIntent) =>
            submitTransactionAndPollUntilCommitted(
              notarizedTransactionIntent,
              transactionIntentWithSignatures.transaction_intent
            )
          )
          .andThen(apiClient.receipt)
          .andThen((receipt) => {
            return receipt.committed.receipt.status === "Succeeded"
              ? ok(
                  receipt.committed.receipt.state_updates.new_global_entities[0]
                    .global_address
                )
              : err(errorIdentity("Transaction failed")(receipt));
          })
          .map((accountAddress) => ({
            accountAddress,
            privateKeyHex: keyPair.privateKeyHex(),
          }))
      );
  };

  const getTransactionReceipt = (intentHash: string) =>
    pollTransactionStatusUntilCommitted(intentHash)
      .andThen(() => apiClient.receipt(intentHash))
      .map((response) => response.committed);

  return { createAccount, getTransactionReceipt, submitTransaction };
};
