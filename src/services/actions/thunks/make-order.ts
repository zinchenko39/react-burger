import { makeOrder } from '../../../utils/api';
import { AppThunk } from '../../types';
import { AppDispatch } from '../../types';
import {
  SEND_ORDER_REQUEST,
  ORDER_REQUEST_SUCCESS,
  ORDER_REQUEST_FAILED,
} from '../order-actions';

export function sendItems(orderId: Array<string>): AppThunk {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: SEND_ORDER_REQUEST,
    });
    makeOrder(orderId)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: ORDER_REQUEST_SUCCESS,
            orderNumber: res.order.number,
            orderId,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: ORDER_REQUEST_FAILED,
          error,
        });
      });
  };
}
