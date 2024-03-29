import { TFeedActions } from '../actions/feed-ws-actions';
import {
  ORDER_WS_CONNECTING,
  ORDER_WS_OPEN,
  ORDER_WS_CLOSE,
  ORDER_WS_ERROR,
  ORDER_WS_MESSAGE,
} from '../actions/feed-ws-actions';

// export type TData = {
//   success: boolean;
//   orders: Array<IFeedOrder>;
//   total: number;
//   totalToday: number;
// };

export type TFeedInitialState = {
  data: any;
  isLoading: boolean;
  error: string;
  connected: boolean;
};

export const feedInitialState: TFeedInitialState = {
  data: [],
  isLoading: false,
  error: '',
  connected: false,
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
        connected: true,
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
        data: [],
        connected: false,
      };
    }
    case ORDER_WS_ERROR: {
      return {
        ...state,
        error: action.error,
        connected: false,
      };
    }
    default: {
      return state;
    }
  }
};
