# Alphanet Wallet Extension SDK

## Usage

### Request

```typescript
import WebSdk from '@radixdlt/alphanet-walletextension-sdk'

const webSdk = WebSdk()

const result = await webSdk.request({ accountAddresses: {} })

if (result.isErr()) {
  return handleError(result.error)
}

const activeAddress = result.value?.accountAddresses[0]
```

### Send transaction

```typescript
import WebSdk from '@radixdlt/alphanet-walletextension-sdk'

const webSdk = WebSdk()

const transactionManifest = '...'

const result = await webSdk.sendTransaction(transactionManifest)

if (result.isErr()) {
  return handleError(result.error)
}

const transactionHash = result.value?.transactionHash
```
