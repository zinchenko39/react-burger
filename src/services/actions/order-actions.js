import { makeOrder } from '../../utils/api.js';

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST';
export const ORDER_REQUEST_SUCCESS = 'ORDER_REQUEST_SUCCESS';
export const ORDER_REQUEST_FAILED = 'ORDER_REQUEST_FAILED';

export function sendItems(orderId) {
    return function(dispatch) {
      dispatch({
        type: SEND_ORDER_REQUEST,
      });
      makeOrder(orderId).then(res => {
        if (res && res.success) {
          dispatch({
            type: ORDER_REQUEST_SUCCESS,
            orderNumber: res.order.number,
            orderId,
          })
        }
      })
      .catch((error) => {
        dispatch({
            type: ORDER_REQUEST_FAILED,
            error
          });
      })
    };
  }