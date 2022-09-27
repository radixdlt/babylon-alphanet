import loglevel from 'loglevel'
import Sdk from '../lib/alphanet-walletextension-sdk'
import blob1 from './blobs/4911392e318eeea9b97f727268e227cfa8fc653465cd3bbd8c3978f4e02a4a0c.hex?raw'
import blob2 from './blobs/cfc384e2ab7ae451f80bdb731081d000ddf24317d53261b2183b0c87a4f263c5.hex?raw'
import { ManifestBuilder } from './manifest';
import { coreApi } from './core-api/core-api'

const sdk = Sdk()

loglevel.setLevel('debug')

// Global states
let accountAddress: string // User account address
let packageAddress: string // GumballMachine package address
let componentAddress: string  // GumballMachine component address
let resourceAddress: string // GUM resource address

document.getElementById('fetchAccountAddress').onclick = async function () {
  // Retrieve extension user account address
  const result = await sdk.request({
    accountAddresses: {},
  })

  if (result.isErr()) {
    throw result.error
  }

  const { accountAddresses } = result.value

  if (!accountAddresses) return

  document.getElementById('accountAddress').innerText =
    accountAddresses[0].address
  accountAddress = accountAddresses[0].address


}

// document.getElementById('publishPackage').onclick = async function () {
//   const response = await fetch('./gumball_machine.rtm');
//   const buffer = new Uint8Array(await response.arrayBuffer());
//   const manifest = new TextDecoder("utf-8").decode(buffer);

//   // Send manifest to extension for signing
//   const receipt = await sdk
//   .sendTransaction(manifest)
//   .map((response) => response.transactionHash)
//   .andThen(coreApi.receipt)
//   .map((receipt) => {
//     packageAddress =
//       receipt.committed.receipt.state_updates.new_global_entities[0]
//         .global_address
//     document.getElementById('packageAddress').innerText = packageAddress

//     return receipt
//   })

//   if (receipt.isErr()) throw receipt.error
// };

document.getElementById('publishPackage').onclick = async () => {
  const result = await sdk
    .sendTransaction(
      `CALL_METHOD ComponentAddress("${accountAddress}") "lock_fee" Decimal("100");
       PUBLISH_PACKAGE 
         Blob("4911392e318eeea9b97f727268e227cfa8fc653465cd3bbd8c3978f4e02a4a0c") 
         Blob("cfc384e2ab7ae451f80bdb731081d000ddf24317d53261b2183b0c87a4f263c5");`,
      [blob1, blob2]
    )
    .map((response) => response.transactionHash)
    .andThen(coreApi.receipt)
    .map((receipt) => {
      packageAddress =
        receipt.committed.receipt.state_updates.new_global_entities[0]
          .global_address
      document.getElementById('packageAddress').innerText = packageAddress

      return receipt
    })

  if (result.isErr()) throw result.error
}


document.getElementById('instantiateComponent').onclick = async function () {
  // Send manifest to extension for signing
  const result = await sdk
  .sendTransaction(
    `CALL_METHOD ComponentAddress("${accountAddress}") "lock_fee" Decimal("100");
    CALL_FUNCTION PackageAddress("${packageAddress}") "GumballMachine" "instantiate_gumball_machine" Decimal("10");`
    )
  .map((response) => response.transactionHash)
  .andThen(coreApi.receipt)
  .map((receipt) => {
    componentAddress = receipt.committed.receipt.state_updates.new_global_entities[1]
      .global_address
      document.getElementById('componentAddress').innerText = componentAddress;
    resourceAddress = receipt.committed.receipt.state_updates.new_global_entities[0]
      .global_address
      document.getElementById('componentAddress').innerText = componentAddress;

      return result
  })
  
  if (result.isErr()) throw result.error;
}

// document.getElementById('instantiateComponent').onclick = async function () {
//   // Construct manifest
//   const manifest = new ManifestBuilder()
//     .callMethod(accountAddress, 'lock_fee', ['Decimal("100.0")'])
//     .callFunction(packageAddress, 'GumballMachine', 'instantiate_gumball_machine', ['Decimal("1.0")'])
//     .build()
//     .toString();

//   // Send manifest to extension for signing
//   const receipt = await sdk
//   .sendTransaction(manifest)
//   .map((response) => response.transactionHash)
//   .andThen(coreApi.receipt)
//   .map((receipt) => {
//     componentAddress = receipt.committed.receipt.state_updates.new_global_entities[1]
//       .global_address
//       document.getElementById('componentAddress').innerText = componentAddress;
//     resourceAddress = receipt.committed.receipt.state_updates.new_global_entities[0]
//       .global_address
//       document.getElementById('componentAddress').innerText = componentAddress;

//       return receipt
//   })
  
//   if (receipt.isErr()) throw receipt.error;
// }

document.getElementById('buyGumball').onclick = async function () {
  // Send manifest to extension for signing
  const receipt = await sdk
  .sendTransaction(
    `CALL_METHOD ComponentAddress("${accountAddress}") "lock_fee" Decimal("100");
    CALL_METHOD ComponentAddress("${accountAddress}") "withdraw_by_amount" Decimal("10") ResourceAddress("resource_tdx_a_1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqegh4k9");
    TAKE_FROM_WORKTOP_BY_AMOUNT Decimal("10") ResourceAddress("resource_tdx_a_1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqegh4k9") Bucket("bucket1");
    CALL_METHOD ComponentAddress("${componentAddress}") "buy_gumball" Bucket("bucket1");
    CALL_METHOD ComponentAddress("${accountAddress}") "deposit_batch" Expression("ENTIRE_WORKTOP");`
  )
  .map((response) => response.transactionHash)
  .andThen(coreApi.receipt)
  .map((receipt) => {
    document.getElementById('receipt').innerText = JSON.stringify(receipt, null, 2);

      return receipt
  })

  if (receipt.isErr()) throw receipt.error;
};

// document.getElementById('buyGumball').onclick = async function () {
//   // Construct manifest
//   const manifest = new ManifestBuilder()
//     .callMethod(accountAddress, 'lock_fee', ['Decimal("100.0")'])
//     // .withdrawFromAccountByAmount(accountAddress, 1, resourceAddress)
//     // .takeFromWorktop(resourceAddress, 'xrd')
//     .withdrawFromAccountByAmount(accountAddress, 1, 'resource_tdx_a_1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqegh4k9')
//     .takeFromWorktop('resource_tdx_a_1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqegh4k9', 'xrd')
//     .callMethod(componentAddress, 'buy_gumball', ['Bucket("xrd")'])
//     .callMethod(accountAddress, 'deposit_batch', ['Expression("ENTIRE_WORKTOP")'])
//     .build()
//     .toString();

//   // Send manifest to extension for signing
//   const receipt = await sdk
//   .sendTransaction(manifest)
//   .map((response) => response.transactionHash)
//   .andThen(coreApi.receipt)
//   .map((receipt) => {
//     document.getElementById('receipt').innerText = JSON.stringify(receipt, null, 2);

//       return receipt
//   })

//   if (receipt.isErr()) throw receipt.error;
// };

document.getElementById('checkBalance').onclick = async function () {
  // Retrieve component info from PTE service
  const api = new DefaultApi();
  const userComponent = await api.getComponent({
    address: accountAddress
  });
  const machineComponent = await api.getComponent({
    address: componentAddress
  });

  // Update UI
  document.getElementById('userBalance').innerText = userComponent.ownedResources
    .filter(e => e.resourceAddress == resourceAddress)
    .map(e => e.amount)[0] || '0';
  document.getElementById('machineBalance').innerText = machineComponent.ownedResources
    .filter(e => e.resourceAddress == resourceAddress).map(e => e.amount)[0];
};