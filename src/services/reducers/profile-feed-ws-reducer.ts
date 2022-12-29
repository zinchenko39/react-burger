import {
  PROFILE_ORDER_WS_CONNECTING,
  PROFILE_ORDER_WS_OPEN,
  PROFILE_ORDER_WS_CLOSE,
  PROFILE_ORDER_WS_ERROR,
  PROFILE_ORDER_WS_MESSAGE,
} from '../actions/profile-feed-ws-actions';
import { TProfileFeedActions } from '../actions/profile-feed-ws-actions';
import { TFeedInitialState } from './feed-ws-reducer';

export const personalFeedInitialState: TFeedInitialState = {
  data: [],
  isLoading: false,
  error: '',
  connected: false,
};

export const PersonalFeedWsReducer = (
  state: TFeedInitialState = personalFeedInitialState,
  action: TProfileFeedActions
) => {
  switch (action.type) {
    case PROFILE_ORDER_WS_CONNECTING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case PROFILE_ORDER_WS_OPEN: {
      return {
        ...state,
        isLoading: false,
        connected: true,
      };
    }
    case PROFILE_ORDER_WS_MESSAGE: {
      return {
        ...state,
        data: action.data,
      };
    }
    case PROFILE_ORDER_WS_CLOSE: {
      return {
        ...state,
        data: [],
        connected: false,
      };
    }
    case PROFILE_ORDER_WS_ERROR: {
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
