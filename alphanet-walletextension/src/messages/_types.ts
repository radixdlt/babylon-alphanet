export enum ActionType {
  GetAccountAddress = "getAccountAddress",
  GetAccountAddressSuccess = "getAccountAddressSuccess",
  GetAccountAddressFailure = "getAccountAddressFailure",
  SignTransaction = "signTransaction",
  SignTransactionSuccess = "signTransactionSuccess",
  SignTransactionFailure = "signTransactionFailure",
}

export type Action<T extends ActionType, P> = {
  type: T;
  payload: P;
  id: string;
};

export type GetAccountAddress = Action<ActionType.GetAccountAddress, string>;
export type GetAccountAddressSuccess = Action<
  ActionType.GetAccountAddressSuccess,
  string
>;
export type GetAccountAddressFail = Action<
  ActionType.GetAccountAddressFailure,
  string
>;

export type SignTransaction = Action<
  ActionType.SignTransaction,
  { transactionManifest: string; blobs: string[] }
>;
export type SignTransactionSuccess = Action<
  ActionType.SignTransactionSuccess,
  any
>;
export type SignTransactionFail = Action<
  ActionType.SignTransactionFailure,
  string
>;

export type ActionTypes =
  | SignTransaction
  | SignTransactionSuccess
  | SignTransactionFail
  | GetAccountAddress
  | GetAccountAddressSuccess
  | GetAccountAddressFail;

export enum MessageTarget {
  Extension,
  Dapp,
}

export type Message<Action = ActionTypes> = {
  action: Action;
  target: MessageTarget;
};

export type MessageSenderData = {
  tabId: number;
  url: string;
  createdAt: number;
};

export type MessageStoreItem<Action = ActionTypes> = Message<Action> &
  MessageSenderData;
