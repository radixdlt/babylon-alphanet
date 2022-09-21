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
    .takeFromWorktop(
      "resource_tdx_a_1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqegh4k9",
      "xrd"
    )
    .callFunction(
      alphanetAddresses.createAccountComponent,
      "Account",
      "new_with_resource",
      [
        {
          type: ValueKind.Enum,
          variant_name: "Protected",
          fields: [
            {
              type: ValueKind.Enum,
              variant_name: "ProofRule",
              fields: [
                {
                  type: ValueKind.Enum,
                  variant_name: "Require",
                  fields: [
                    {
                      type: ValueKind.Enum,
                      variant_name: "StaticNonFungible",
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
