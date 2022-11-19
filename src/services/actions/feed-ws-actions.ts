import { IIngredient } from '../../interfaces/IIngredient';

export const ORDER_CONNECT: 'ORDER_CONNECT' = 'ORDER_CONNECT';
export const ORDER_DISCONNECT: 'ORDER_DISCONNECT' = 'ORDER_DISCONNECT';
export const ORDER_WS_CONNECTING: 'ORDER_WS_CONNECTING' = 'ORDER_WS_CONNECTING';
export const ORDER_WS_OPEN: 'ORDER_WS_OPEN' = 'ORDER_WS_OPEN';
export const ORDER_WS_CLOSE: 'ORDER_WS_CLOSE' = 'ORDER_WS_CLOSE';
export const ORDER_WS_ERROR: 'ORDER_WS_ERROR' = 'ORDER_WS_ERROR';
export const ORDER_WS_MESSAGE: 'ORDER_WS_MESSAGE' = 'ORDER_WS_MESSAGE';

export const feedWsActions = {
  wsConnect: ORDER_CONNECT,
  wsDisconnect: ORDER_DISCONNECT,
  wsConnecting: ORDER_WS_CONNECTING,
  onOpen: ORDER_WS_OPEN,
  onClose: ORDER_WS_CLOSE,
  onError: ORDER_WS_CLOSE,
  onMessage: ORDER_WS_MESSAGE,
};

export interface IOrderConnect {
  readonly type: typeof ORDER_CONNECT;
}
export interface IOrderDisconnect {
  readonly type: typeof ORDER_DISCONNECT;
}
export interface IOrderConnecting {
  readonly type: typeof ORDER_WS_CONNECTING;
}
export interface IOrderOpen {
  readonly type: typeof ORDER_WS_OPEN;
}
export interface IOrderClose {
  readonly type: typeof ORDER_WS_CLOSE;
}
export interface IOrderError {
  readonly type: typeof ORDER_WS_ERROR;
  readonly error: string;
}
export interface IOrderMessage {
  readonly type: typeof ORDER_WS_MESSAGE;
  readonly data: Array<IIngredient>;
}

export type TFeedActions =
  | IOrderConnect
  | IOrderDisconnect
  | IOrderConnecting
  | IOrderOpen
  | IOrderClose
  | IOrderError
  | IOrderMessage;
