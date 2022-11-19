import { IIngredient } from '../../interfaces/IIngredient';

export const PROFILE_ORDER_CONNECT: 'PROFILE_ORDER_CONNECT' =
  'PROFILE_ORDER_CONNECT';
export const PROFILE_ORDER_DISCONNECT: 'PROFILE_ORDER_DISCONNECT' =
  'PROFILE_ORDER_DISCONNECT';
export const PROFILE_ORDER_WS_CONNECTING: 'PROFILE_ORDER_WS_CONNECTING' =
  'PROFILE_ORDER_WS_CONNECTING';
export const PROFILE_ORDER_WS_OPEN: 'PROFILE_ORDER_WS_OPEN' =
  'PROFILE_ORDER_WS_OPEN';
export const PROFILE_ORDER_WS_CLOSE: 'PROFILE_ORDER_WS_CLOSE' =
  'PROFILE_ORDER_WS_CLOSE';
export const PROFILE_ORDER_WS_ERROR: 'PROFILE_ORDER_WS_ERROR' =
  'PROFILE_ORDER_WS_ERROR';
export const PROFILE_ORDER_WS_MESSAGE: 'PROFILE_ORDER_WS_MESSAGE' =
  'PROFILE_ORDER_WS_MESSAGE';

export const profileFeedWsActions = {
  wsConnect: PROFILE_ORDER_CONNECT,
  wsDisconnect: PROFILE_ORDER_DISCONNECT,
  wsConnecting: PROFILE_ORDER_WS_CONNECTING,
  onOpen: PROFILE_ORDER_WS_OPEN,
  onClose: PROFILE_ORDER_WS_CLOSE,
  onError: PROFILE_ORDER_WS_CLOSE,
  onMessage: PROFILE_ORDER_WS_MESSAGE,
};

export interface IProfileOrderConnect {
  readonly type: typeof PROFILE_ORDER_CONNECT;
}
export interface IProfileOrderDisconnect {
  readonly type: typeof PROFILE_ORDER_DISCONNECT;
}
export interface IProfileOrderConnecting {
  readonly type: typeof PROFILE_ORDER_WS_CONNECTING;
}
export interface IProfileOrderOpen {
  readonly type: typeof PROFILE_ORDER_WS_OPEN;
}
export interface IProfileOrderClose {
  readonly type: typeof PROFILE_ORDER_WS_CLOSE;
}
export interface IProfileOrderError {
  readonly type: typeof PROFILE_ORDER_WS_ERROR;
  readonly error: string;
}
export interface IProfileOrderMessage {
  readonly type: typeof PROFILE_ORDER_WS_MESSAGE;
  readonly data: Array<IIngredient>;
}

export type TProfileFeedActions =
  | IProfileOrderConnect
  | IProfileOrderDisconnect
  | IProfileOrderConnecting
  | IProfileOrderOpen
  | IProfileOrderClose
  | IProfileOrderError
  | IProfileOrderMessage;
