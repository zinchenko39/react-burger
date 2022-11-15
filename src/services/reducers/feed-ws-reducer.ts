import { IIngredient } from '../../interfaces/IIngredient';
import { TFeedActions } from '../actions/feed-ws-actions';
import {
  ORDER_WS_CONNECTING,
  ORDER_WS_OPEN,
  ORDER_WS_CLOSE,
  ORDER_WS_ERROR,
  ORDER_WS_MESSAGE,
} from '../actions/feed-ws-actions';

// type TData = {
//   orders: Array<IIngredient>;
//   success: boolean;
//   total: number;
//   totalToday: number;
// };

type TFeedInitialState = {
  data: any;
  isLoading: boolean;
  error: string;
};

const feedInitialState: TFeedInitialState = {
  data: [],
  isLoading: false,
  error: '',
};

export const feedWsReducer = (
  state: TFeedInitialState = feedInitialState,
  action: TFeedActions
) => {
  switch (action.type) {
    case ORDER_WS_CONNECTING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ORDER_WS_OPEN: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case ORDER_WS_MESSAGE: {
      return {
        ...state,
        data: action.data,
      };
    }
    case ORDER_WS_CLOSE: {
      return {
        ...state,
      };
    }
    case ORDER_WS_ERROR: {
      return {
        ...state,
        error: action.error,
      };
    }

    default: {
      return state;
    }
  }
};
