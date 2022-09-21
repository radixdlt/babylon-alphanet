export enum ActionType {
  GetAccountAddress = 'getAccountAddress',
  GetAccountAddressSuccess = 'getAccountAddressSuccess',
  GetAccountAddressFailure = 'getAccountAddressFailure',

  SignTransaction = 'signTransaction',
  SignTransactionSuccess = 'signTransactionSuccess',
  SignTransactionFailure = 'signTransactionFailure',
}

export type Action<T extends ActionType, P> = {
  type: T
  payload: P
  id: string
}

export type GetAccountAddress = Action<ActionType.GetAccountAddress, string>
export type GetAccountAddressSuccess = Action<
  ActionType.GetAccountAddressSuccess,
  string
>
export type GetAccountAddressFailure = Action<
  ActionType.GetAccountAddressFailure,
  string
>

export type SignTransaction = Action<
  ActionType.SignTransaction,
  { transactionManifest: string; blobs: string[] }
>
export type SignTransactionSuccess = Action<
  ActionType.SignTransactionSuccess,
  { transactionHash: string }
>
export type SignTransactionFailure = Action<
  ActionType.SignTransactionFailure,
  string
>

export type ActionTypes =
  | GetAccountAddress
  | GetAccountAddressSuccess
  | GetAccountAddressFailure
  | SignTransaction
  | SignTransactionSuccess
  | SignTransactionFailure

export type IncomingMessage =
  | Message<GetAccountAddressSuccess>
  | Message<GetAccountAddressFailure>
  | Message<SignTransactionSuccess>
  | Message<SignTransactionFailure>

export type OutgoingMessage =
  | Message<GetAccountAddress>
  | Message<SignTransaction>

export enum MessageTarget {
  Extension,
  Dapp,
}

export type Message<Action = ActionTypes> = {
  action: Action
  target: MessageTarget
}
