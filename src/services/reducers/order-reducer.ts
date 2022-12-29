import {
  SEND_ORDER_REQUEST,
  ORDER_REQUEST_SUCCESS,
  ORDER_REQUEST_FAILED,
  ORDER_RESET,
} from '../actions/order-actions';
import { TOrderActions } from '../actions/order-actions';

type TOrderInitialState = {
  itemsId: ReadonlyArray<string>;
  orderNumber: number | string;
  isLoading: boolean;
  isError: boolean;
  errorStatus: null | string;
};

export const orderInitialState: TOrderInitialState = {
  itemsId: [],
  orderNumber: '',
  isLoading: false,
  isError: false,
  errorStatus: null,
};

export const orderReducer = (
  state: TOrderInitialState = orderInitialState,
  action: TOrderActions
): TOrderInitialState => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ORDER_REQUEST_SUCCESS: {
      return {
        ...state,
        isError: false,
        orderNumber: action.orderNumber,
        isLoading: false,
        itemsId: action.orderId,
      };
    }
    case ORDER_REQUEST_FAILED: {
      return {
        ...state,
        itemsId: [],
        isError: true,
        isLoading: false,
        errorStatus: action.error,
        orderNumber: 'Ошибка',
      };
    }
    case ORDER_RESET: {
      return orderInitialState;
    }
    default: {
      return state;
    }
  }
};
