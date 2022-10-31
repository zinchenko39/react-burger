import {
  SEND_ORDER_REQUEST,
  ORDER_REQUEST_SUCCESS,
  ORDER_REQUEST_FAILED,
} from '../actions/order-actions';

const orderInitialState = {
  itemsId: [],
  orderNumber: '',
  isLoading: false,
  isError: false,
  errorStatus: null,
};

export const orderReducer = (state: any = orderInitialState, action: any) => {
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
        isError: true,
        isLoading: false,
        errorStatus: action.error,
        orderNumber: 'Ошибка',
      };
    }
    default: {
      return state;
    }
  }
};
