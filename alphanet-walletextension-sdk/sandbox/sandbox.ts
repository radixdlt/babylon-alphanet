import loglevel from 'loglevel'
import Sdk from '../lib/alphanet-walletextension-sdk'
import blob1 from './blobs/4911392e318eeea9b97f727268e227cfa8fc653465cd3bbd8c3978f4e02a4a0c.hex?raw'
import blob2 from './blobs/cfc384e2ab7ae451f80bdb731081d000ddf24317d53261b2183b0c87a4f263c5.hex?raw'
import { coreApi } from './core-api/core-api'

const sdk = Sdk()

loglevel.setLevel('debug')

// Global states
let accountAddress: string // User account address
let packageAddress: string // GumballMachine package address

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
