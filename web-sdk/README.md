# Radix Web SDK

## Usage

### Request

```typescript
import WebSdk from '@radixdlt/web-sdk'

const webSdk = WebSdk()

const result = await webSdk.request({ accountAddresses: {} })

if (result.isErr()) {
  return handleError(result.error)
}

const activeAddress = result.value?.accountAddresses[0]
```

### Send transaction

```typescript
import WebSdk from '@radixdlt/web-sdk'

const webSdk = WebSdk()

const transactionManifest = '...'

const result = await webSdk.sendTransaction(transactionManifest)

if (result.isErr()) {
  return handleError(result.error)
}

const transactionHash = result.value?.transactionHash
```
