import {
  ManifestBuilder,
  ManifestInstructions,
  ManifestInstructionsKind,
  ValueKind,
} from "@radixdlt/transaction-library";
import { alphanetAddresses } from "./_types";

// Deriving the `NonFungibleAddress` based on the public key of the account.
const deriveNonFungibleAddress = (publicKey: string) =>
  `000000000000000000000000000000000000000000000000000002300721000000${publicKey}`;

export const createAccountInstructions = (
  publicKey: string
): ManifestInstructions => ({
  type: ManifestInstructionsKind.JSON,
  value: new ManifestBuilder()
    .callMethod(alphanetAddresses.faucet, "lock_fee", [
      { type: ValueKind.Decimal, value: "10" },
    ])
    .callMethod(alphanetAddresses.faucet, "free_xrd")
    .takeFromWorktop(alphanetAddresses.xrd, "xrd")
    .callFunction(
      alphanetAddresses.createAccountComponent,
      "Account",
      "new_with_resource",
      [
        {
          type: ValueKind.Enum,
          variant: "Protected",
          fields: [
            {
              type: ValueKind.Enum,
              variant: "ProofRule",
              fields: [
                {
                  type: ValueKind.Enum,
                  variant: "Require",
                  fields: [
                    {
                      type: ValueKind.Enum,
                      variant: "StaticNonFungible",
                      fields: [
                        {
                          type: ValueKind.NonFungibleAddress,
                          address: deriveNonFungibleAddress(publicKey),
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: ValueKind.Bucket,
          identifier: "xrd",
        },
      ]
    )
    .build(),
});
