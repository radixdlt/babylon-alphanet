import Sdk from '@radixdlt/alphanet-walletextension-sdk';
import { StateApi, TransactionApi } from '@radixdlt/alphanet-gateway-api-v0-sdk'

// Initialize the SDK
const sdk = Sdk()
const transactionApi = new TransactionApi()
const stateApi = new StateApi()

// Global states
let accountAddress: string // User account address
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

  document.getElementById('accountAddress').innerText = accountAddresses[0].address
  accountAddress = accountAddresses[0].address
}

document.getElementById('instantiateComponent').onclick = async function () {
  let packageAddress = document.getElementById("packageAddress").value;
  
  // Send manifest to extension for signing
  const hash = await sdk
  .sendTransaction(
    `CALL_METHOD ComponentAddress("${accountAddress}") "lock_fee" Decimal("100");
    CALL_FUNCTION PackageAddress("${packageAddress}") "GumballMachine" "instantiate_gumball_machine" Decimal("10");`
    )
  .map((response) => response.transactionHash)

  if (hash.isErr()) throw hash.error

  // Fetch the receipt from the Gateway SDK
  const receipt = await transactionApi.transactionReceiptPost({
    v0CommittedTransactionRequest: { intent_hash: hash.value },
  })

  componentAddress = receipt.committed.receipt.state_updates.new_global_entities[1].global_address
  document.getElementById('componentAddress').innerText = componentAddress;
  
  resourceAddress = receipt.committed.receipt.state_updates.new_global_entities[0].global_address
  document.getElementById('gumAddress').innerText = resourceAddress;
}

document.getElementById('buyGumball').onclick = async function () {
  // Send manifest to extension for signing
  const hash = await sdk
  .sendTransaction(
    `CALL_METHOD ComponentAddress("${accountAddress}") "lock_fee" Decimal("100");
    CALL_METHOD ComponentAddress("${accountAddress}") "withdraw_by_amount" Decimal("10") ResourceAddress("resource_tdx_a_1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqegh4k9");
    TAKE_FROM_WORKTOP_BY_AMOUNT Decimal("10") ResourceAddress("resource_tdx_a_1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqzqegh4k9") Bucket("bucket1");
    CALL_METHOD ComponentAddress("${componentAddress}") "buy_gumball" Bucket("bucket1");
    CALL_METHOD ComponentAddress("${accountAddress}") "deposit_batch" Expression("ENTIRE_WORKTOP");`
  )
  .map((response) => response.transactionHash)

  if (hash.isErr()) throw hash.error

  // Fetch the receipt from the Gateway SDK
  const receipt = await transactionApi.transactionReceiptPost({
    v0CommittedTransactionRequest: { intent_hash: hash.value },
  })

  // Show the receipt on the DOM
  document.getElementById('receipt').innerText = JSON.stringify(receipt.committed.receipt, null, 2);
};

document.getElementById('checkBalance').onclick = async function () {

  // Fetch the state of the account component
  const account_state = await stateApi.stateComponentPost({
    v0StateComponentRequest: { component_address: accountAddress }
  })

  let account_gum_vault = account_state.owned_vaults.find(vault => vault.resource_amount.resource_address == `${resourceAddress}`)

  // Fetch the state of the machine component
  const machine_state = await stateApi.stateComponentPost({
    v0StateComponentRequest: { component_address: componentAddress }
  })

  let machine_gum_vault = machine_state.owned_vaults.find(vault => vault.resource_amount.resource_address == `${resourceAddress}`)

  // Update the DOM
  document.getElementById("userBalance").innerText = account_gum_vault.resource_amount.amount_attos / Math.pow(10,18)
  document.getElementById("machineBalance").innerText = machine_gum_vault.resource_amount.amount_attos / Math.pow(10,18)
};