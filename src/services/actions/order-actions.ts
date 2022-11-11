export const SEND_ORDER_REQUEST: 'SEND_ORDER_REQUEST' = 'SEND_ORDER_REQUEST';
export const ORDER_REQUEST_SUCCESS: 'ORDER_REQUEST_SUCCESS' =
  'ORDER_REQUEST_SUCCESS';
export const ORDER_REQUEST_FAILED: 'ORDER_REQUEST_FAILED' =
  'ORDER_REQUEST_FAILED';

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

export type TOrderActions =
  | ISendOrderRequest
  | IOrderRequestSuccess
  | IOrderRequestFailed;
