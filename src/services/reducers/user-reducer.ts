import {
  REGISTER_REQUEST,
  REGISTER,
  REGISTER_ERROR,
  LOG_IN_REQUEST,
  LOG_IN,
  LOG_IN_ERROR,
  LOG_OUT_REQUEST,
  LOG_OUT,
  LOG_OUT_ERROR,
  GET_USER_REQUEST,
  GET_USER,
  GET_USER_ERROR,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_ERROR,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN,
  REFRESH_TOKEN_ERROR,
  FORGOT_PASSWORD_VISITED,
  RESET_PASSWORD,
} from '../actions/user-actions';
import { TUserActions } from '../actions/user-actions';

type TUserInitialState = {
  email: string | null;
  name: string | null;
  userLoggedIn: boolean;
  userLoaded: boolean;
  registerError: boolean | string;
  logInError: boolean | string;
  logOutError: boolean | string;
  getUserError: boolean | string;
  updateUserDataError: boolean | string;
  setUserError: boolean | string;
  forgotPasswordError: boolean | string;
  forgotPasswordVisited: boolean | string;
};

export const userInitialState: TUserInitialState = {
  email: null,
  name: null,
  userLoggedIn: false,
  userLoaded: false,
  registerError: false,
  logInError: false,
  logOutError: false,
  getUserError: false,
  updateUserDataError: false,
  setUserError: false,
  forgotPasswordError: false,
  forgotPasswordVisited: false,
};

export const userReducer = (
  state: TUserInitialState = userInitialState,
  action: TUserActions
): TUserInitialState => {
  switch (action.type) {
    case REGISTER_REQUEST: {
      return {
        ...state,
        email: userInitialState.email,
        name: userInitialState.name,
        userLoggedIn: false,
        registerError: false,
        userLoaded: false,
      };
    }
    case REGISTER: {
      return {
        ...state,
        email: action.user.email,
        name: action.user.name,
        userLoggedIn: true,
        userLoaded: true,
        registerError: false,
      };
    }
    case REGISTER_ERROR: {
      return {
        ...state,
        userLoggedIn: false,
        registerError: true,
        email: null,
        name: null,
        userLoaded: true,
      };
    }
    case LOG_IN_REQUEST: {
      return {
        ...state,
        email: userInitialState.email,
        name: userInitialState.name,
        userLoggedIn: false,
        logInError: false,
        userLoaded: false,
      };
    }
    case LOG_IN: {
      return {
        ...state,
        email: action.user.email,
        name: action.user.name,
        userLoggedIn: true,
        userLoaded: true,
        logInError: false,
      };
    }
    case LOG_IN_ERROR: {
      return {
        ...state,
        userLoggedIn: false,
        userLoaded: true,
        logInError: action.error,
      };
    }
    case LOG_OUT_REQUEST: {
      return {
        ...state,
        email: userInitialState.email,
        name: userInitialState.name,
        userLoggedIn: true,
        logOutError: false,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        email: null,
        name: null,
        userLoggedIn: false,
        logOutError: false,
      };
    }
    case LOG_OUT_ERROR: {
      return {
        ...state,
        email: userInitialState.email,
        name: userInitialState.name,
        userLoggedIn: true,
        logOutError: true,
      };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        email: userInitialState.email,
        name: userInitialState.name,
      };
    }
    case GET_USER: {
      return {
        ...state,
        email: action.user.email,
        name: action.user.name,
        userLoggedIn: true,
        userLoaded: true,
        getUserError: false,
      };
    }
    case GET_USER_ERROR: {
      return { ...state, userLoaded: true, getUserError: true };
    }
    case UPDATE_USER_DATA_REQUEST: {
      return { ...state, updateUserDataError: false };
    }
    case UPDATE_USER_DATA: {
      return {
        ...state,
        email: action.user.email,
        name: action.user.name,
        userLoggedIn: true,
        updateUserDataError: false,
      };
    }
    case UPDATE_USER_DATA_ERROR: {
      return { ...state, updateUserDataError: true };
    }
    case REFRESH_TOKEN_REQUEST: {
      return { ...state };
    }
    case REFRESH_TOKEN: {
      return { ...state };
    }
    case REFRESH_TOKEN_ERROR: {
      return { ...state };
    }
    case FORGOT_PASSWORD_VISITED: {
      return { ...state, forgotPasswordVisited: true };
    }
    case RESET_PASSWORD: {
      return { ...state, forgotPasswordVisited: false };
    }
    default: {
      return state;
    }
  }
};
