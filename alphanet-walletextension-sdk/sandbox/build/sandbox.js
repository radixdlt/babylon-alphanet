import loglevel from "./_snowpack/pkg/loglevel.js";
import Sdk from "../lib/alphanet-walletextension-sdk";
import blob1 from "./blobs/4911392e318eeea9b97f727268e227cfa8fc653465cd3bbd8c3978f4e02a4a0c.hex?raw.proxy.js";
import blob2 from "./blobs/cfc384e2ab7ae451f80bdb731081d000ddf24317d53261b2183b0c87a4f263c5.hex?raw.proxy.js";
import {coreApi} from "./core-api/core-api.js";
const sdk = Sdk();
loglevel.setLevel("debug");
let accountAddress;
let packageAddress;
let componentAddress;
let resourceAddress;
document.getElementById("fetchAccountAddress").onclick = async function() {
  const result = await sdk.request({
    accountAddresses: {}
  });
  if (result.isErr()) {
    throw result.error;
  }
  const {accountAddresses} = result.value;
  if (!accountAddresses)
    return;
  document.getElementById("accountAddress").innerText = accountAddresses[0].address;
  accountAddress = accountAddresses[0].address;
};
document.getElementById("publishPackage").onclick = async () => {
  const result = await sdk.sendTransaction(`CALL_METHOD ComponentAddress("${accountAddress}") "lock_fee" Decimal("100");
       PUBLISH_PACKAGE 
         Blob("4911392e318eeea9b97f727268e227cfa8fc653465cd3bbd8c3978f4e02a4a0c") 
         Blob("cfc384e2ab7ae451f80bdb731081d000ddf24317d53261b2183b0c87a4f263c5");`, [blob1, blob2]).map((response) => response.transactionHash).andThen(coreApi.receipt).map((receipt) => {
    packageAddress = receipt.committed.receipt.state_updates.new_global_entities[0].global_address;
    document.getElementById("packageAddress").innerText = packageAddress;
    return receipt;
  });
  if (result.isErr())
    throw result.error;
};
document.getElementById("instantiateComponent").onclick = async function() {
  const result = await sdk.sendTransaction(`CALL_METHOD ComponentAddress("${accountAddress}") "lock_fee" Decimal("100");
    CALL_FUNCTION PackageAddress("${packageAddress}") "GumballMachine" "instantiate_gumball_machine" Decimal("10");`).map((response) => response.transactionHash).andThen(coreApi.receipt).map((receipt) => {
    componentAddress = receipt.committed.receipt.state_updates.new_global_entities[1].global_address;
    document.getElementById("componentAddress").innerText = componentAddress;
    resourceAddress = receipt.committed.receipt.state_updates.new_global_entities[0].global_address;
    document.getElementById("componentAddress").innerText = componentAddress;
    return result;
  });
  if (result.isErr())
    throw result.error;
};
document.getElementById("buyGumball").onclick = async function() {
  const receipt = await sdk.sendTransaction(`CALL_METHOD ComponentAddress("${accountAddress}") "lock_fee" Decimal("100");
    CALL_METHOD ComponentAddress("${accountAddress}") "withdraw_by_amount" Decimal("10") ResourceAddress("resource_tdx_a_1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqegh4k9");
    TAKE_FROM_WORKTOP_BY_AMOUNT Decimal("10") ResourceAddress("resource_tdx_a_1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqegh4k9") Bucket("bucket1");
    CALL_METHOD ComponentAddress("${componentAddress}") "buy_gumball" Bucket("bucket1");
    CALL_METHOD ComponentAddress("${accountAddress}") "deposit_batch" Expression("ENTIRE_WORKTOP");`).map((response) => response.transactionHash).andThen(coreApi.receipt).map((receipt2) => {
    document.getElementById("receipt").innerText = JSON.stringify(receipt2, null, 2);
    return receipt2;
  });
  if (receipt.isErr())
    throw receipt.error;
};
document.getElementById("checkBalance").onclick = async function() {
  const api = new DefaultApi();
  const userComponent = await api.getComponent({
    address: accountAddress
  });
  const machineComponent = await api.getComponent({
    address: componentAddress
  });
  document.getElementById("userBalance").innerText = userComponent.ownedResources.filter((e) => e.resourceAddress == resourceAddress).map((e) => e.amount)[0] || "0";
  document.getElementById("machineBalance").innerText = machineComponent.ownedResources.filter((e) => e.resourceAddress == resourceAddress).map((e) => e.amount)[0];
};
