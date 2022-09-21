import { alphanetSdk } from "./alphanet-sdk";
import { coreApi } from "./core-api";
import fs from "fs";
import path from "path";

const blobDirPath = path.join(__dirname, "..", "..", "..", "blobs");
const blob1 = fs.readFileSync(
  `${blobDirPath}/4911392e318eeea9b97f727268e227cfa8fc653465cd3bbd8c3978f4e02a4a0c.blob`
);
const blob2 = fs.readFileSync(
  `${blobDirPath}/cfc384e2ab7ae451f80bdb731081d000ddf24317d53261b2183b0c87a4f263c5.blob`
);
const xrdAddress =
  "resource_tdx_a_1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqegh4k9";

describe("alphanet sdk", () => {
  it("should get current epoch", async () => {
    const result = await coreApi.epoch();

    if (result.isErr()) throw result.error;

    expect(result.value).toBeDefined();
  });

  describe("transactions", () => {
    let privateKeyHex: string;
    let accountAddress: string;

    beforeAll(async () => {
      console.log("Trying to create account...");
      const result = await alphanetSdk()
        .createAccount()
        .map((result) => {
          console.log("Account created");
          return result;
        });

      if (result.isErr()) {
        throw result.error.error;
      }

      privateKeyHex = result.value.privateKeyHex;
      accountAddress = result.value.accountAddress;
    }, 60_000);

    it("should create token", async () => {
      const result = await alphanetSdk().submitTransaction(
        privateKeyHex,
        `CALL_METHOD ComponentAddress("${accountAddress}") "lock_fee" Decimal("100");
         CALL_FUNCTION PackageAddress("package_tdx_a_1qyqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqpqylesfa") "SysUtils" "new_resource" Enum("Fungible", 18u8) Map<String, String>() Map<Enum, Tuple>(Enum("Withdraw"), Tuple(Enum("AllowAll"), Enum("LOCKED"))) Some(Enum("Fungible", Decimal("5000")));
         CALL_METHOD ComponentAddress("${accountAddress}") "deposit_batch" Expression("ENTIRE_WORKTOP");`,
        []
      );

      if (result.isErr()) {
        throw result.error;
      }

      expect(result.value).toBeDefined();
    }, 60_000);

    it("should deploy a package, instantiate a component and call a method", async () => {
      console.log("Trying to publish package...");
      const result = await alphanetSdk()
        .submitTransaction(
          privateKeyHex,
          `CALL_METHOD ComponentAddress("${accountAddress}") "lock_fee" Decimal("100");
           PUBLISH_PACKAGE 
            Blob("4911392e318eeea9b97f727268e227cfa8fc653465cd3bbd8c3978f4e02a4a0c") 
            Blob("cfc384e2ab7ae451f80bdb731081d000ddf24317d53261b2183b0c87a4f263c5");`,
          [blob1.toString("hex"), blob2.toString("hex")]
        )
        .map((result) => {
          console.log("Package published");
          return result;
        })
        .map(
          ({ receipt }) =>
            receipt.committed.receipt.state_updates.new_global_entities[0]
              .global_address_str
        )
        .map((result) => {
          console.log("Trying to instantiate component...");
          return result;
        })
        .andThen((packageAddress) =>
          alphanetSdk()
            .submitTransaction(
              privateKeyHex,
              `CALL_METHOD ComponentAddress("${accountAddress}") "lock_fee" Decimal("100");
               CALL_FUNCTION PackageAddress("${packageAddress}") "GumballMachine" "instantiate_gumball_machine" Decimal("5");`,
              []
            )
            .map((result) => {
              console.log("Component instantiated");
              return result;
            })
        )
        .map(
          ({ receipt }) =>
            receipt.committed.receipt.state_updates.new_global_entities[1]
              .global_address_str
        )
        .map((result) => {
          console.log("Trying to call method on component...");
          return result;
        })
        .andThen((componentAddress) =>
          alphanetSdk().submitTransaction(
            privateKeyHex,
            `CALL_METHOD ComponentAddress("${accountAddress}") "lock_fee" Decimal("100");
             CALL_METHOD ComponentAddress("${accountAddress}") "withdraw_by_amount" Decimal("5") ResourceAddress("${xrdAddress}");
             TAKE_FROM_WORKTOP_BY_AMOUNT Decimal("5") ResourceAddress("${xrdAddress}") Bucket("bucket1");
             CALL_METHOD ComponentAddress("${componentAddress}") "buy_gumball" Bucket("bucket1");
             CALL_METHOD ComponentAddress("${accountAddress}") "deposit_batch" Expression("ENTIRE_WORKTOP");`,
            []
          )
        )
        .map((result) => {
          console.log("Component method invoked");
          return result;
        });

      if (result.isErr()) {
        throw result.error;
      }

      expect(result.value.receipt.committed.receipt.status).toBe("Succeeded");
    }, 60_000);
  });
});
