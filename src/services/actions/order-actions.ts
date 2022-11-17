export const SEND_ORDER_REQUEST: 'SEND_ORDER_REQUEST' = 'SEND_ORDER_REQUEST';
export const ORDER_REQUEST_SUCCESS: 'ORDER_REQUEST_SUCCESS' =
  'ORDER_REQUEST_SUCCESS';
export const ORDER_REQUEST_FAILED: 'ORDER_REQUEST_FAILED' =
  'ORDER_REQUEST_FAILED';
export const ORDER_RESET: 'ORDER_RESET' = 'ORDER_RESET';
export interface ISendOrderRequest {
  readonly type: typeof SEND_ORDER_REQUEST;
}
export interface IOrderRequestSuccess {
  readonly type: typeof ORDER_REQUEST_SUCCESS;
  readonly orderNumber: number;
  readonly orderId: ReadonlyArray<string>;
}
export interface IOrderRequestFailed {
  readonly type: typeof ORDER_REQUEST_FAILED;
  readonly error: string;
}
export interface IOrderReset {
  readonly type: typeof ORDER_RESET;
  readonly error: string;
}

export type TOrderActions =
  | ISendOrderRequest
  | IOrderRequestSuccess
  | IOrderRequestFailed
  | IOrderReset;
