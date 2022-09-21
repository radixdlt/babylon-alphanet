import { err, ok, ResultAsync } from 'neverthrow'

type ErrorResponse = {
  code: number
  message: string
  trace_id: string
  error?: any
}

const errorIdentity =
  (message: string) =>
  (error: any): ErrorResponse =>
    'code' in error
      ? error
      : {
          code: -1,
          message,
          trace_id: '',
          error,
        }

const intentStatus = {
  CommittedSuccess: 'CommittedSuccess',
  CommittedFailure: 'CommittedFailure',
  InMempool: 'InMempool',
  Rejected: 'Rejected',
  Unknown: 'Unknown',
} as const

const transactionStatus = {
  Succeeded: 'Succeeded',
  Failed: 'Failed',
  Rejected: 'Rejected',
} as const

type IntentStatus = keyof typeof intentStatus

type SignatureWithPublicKey = {}

type TransactionHeader = {}

type TransactionIntent = {
  hash: string
  header: TransactionHeader
  manifest: string
}

type SignedTransactionIntent = {
  hash: string
  intent: TransactionIntent
  intent_signatures: SignatureWithPublicKey[]
}

type Signature = {}

type NotarizedTransaction = {
  hash: string
  payload: string
  signed_intent: SignedTransactionIntent
  notary_signature: Signature
}

type FeeSummary = {}

type EntityType = {}

type GlobalEntityId = {
  entity_type: EntityType
  entity_address: string
  global_address_bytes: string
  global_address_str: string
}

type StateUpdates = {
  new_global_entities: GlobalEntityId[]
}

type SborData = {
  data_bytes: string
  data_json: string
}

type TransactionReceipt = {
  status: keyof typeof transactionStatus
  fee_summary: FeeSummary
  state_updates: StateUpdates
}

type CommittedTransaction = {
  state_version: number
  notarized_transaction: NotarizedTransaction
  receipt: TransactionReceipt
}

const fromResponse = (response: Response) =>
  ResultAsync.fromPromise(response.text(), (error) => error as Error)
    .andThen((text) => {
      try {
        return ok(JSON.parse(text))
      } catch (error) {
        return err({
          status: response.status,
          url: response.url,
          message: `core API error (status ${response.status})`,
        })
      }
    })
    .map((data) => ({ data, status: response.status }))

const CoreApi = (baseUrl: string) => {
  const request = <T>(data: any, ...input: Parameters<typeof fetch>) => {
    const headers = input[1]?.headers || {}
    return ResultAsync.fromPromise(
      fetch(input[0], {
        ...input[1],
        method: 'POST',
        headers: {
          ...headers,

          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }),
      (error) => error as Error
    )
      .andThen(fromResponse)
      .andThen(({ data, status }) =>
        status === 200 ? ok<T, never>(data) : err<never, ErrorResponse>(data)
      )
      .mapErr(errorIdentity('Core API error'))
  }

  return {
    /**
     * Get the current epoch for transaction building
     */
    epoch: () => request<{ epoch: number }>({}, `${baseUrl}/v0/state/epoch`),
    /**
     * submit a notarized transaction
     */
    submitTransaction: (notarized_transaction: string) =>
      request<{ duplicate: boolean }>(
        {
          notarized_transaction,
        },
        `${baseUrl}/v0/transaction/submit`
      ),

    /**
     * poll until it’s committed (using the intent hash you have saved)
     */
    status: (intent_hash: string) =>
      request<{ intent_status: keyof typeof intentStatus }>(
        { intent_hash },
        `${baseUrl}/v0/transaction/status`
      ),
    /**
     *
     * see the receipt
     */
    receipt: (intent_hash: string) =>
      request<{
        committed: CommittedTransaction
      }>({ intent_hash }, `${baseUrl}/v0/transaction/receipt`),
  }
}

export const coreApi = CoreApi('https://alphanet.radixdlt.com')
