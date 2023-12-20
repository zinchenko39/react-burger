import { orderInitialState, orderReducer } from './order-reducer';
import {
    SEND_ORDER_REQUEST,
    ORDER_REQUEST_SUCCESS,
    ORDER_REQUEST_FAILED,
    ORDER_RESET,
  } from '../actions/order-actions';

describe('order reducer', () => {
  let state = orderReducer(undefined, {});
  it('should return the initial state', () => {
    expect(state).toEqual(orderInitialState);
  })
  it('should handle SEND_ORDER_REQUEST', () => {
    state = orderReducer(state,{type: SEND_ORDER_REQUEST})
    expect(state).toEqual({
        ...orderInitialState,
        isLoading: true
    })
  });
  it('should handle ORDER_REQUEST_SUCCESS', () => {
    state = orderReducer(state,{type: ORDER_REQUEST_SUCCESS, orderNumber: 1234, orderId: ['123213', '12321323']})
    expect(state).toEqual({
        ...orderInitialState,
        itemsId: ['123213', '12321323'],
        orderNumber: 1234,
    })
  });
  it('should handle ORDER_REQUEST_FAILED', () => {
    state = orderReducer(state,{type: ORDER_REQUEST_FAILED, error: 'error'})
    expect(state).toEqual({
        ...orderInitialState,
        errorStatus: 'error',
        isError: true,
        orderNumber: 'Ошибка',
    })
  });
  it('should handle ORDER_RESET', () => {
    state = orderReducer(state,{type: ORDER_RESET})
    expect(state).toEqual(orderInitialState)
  });
}) 