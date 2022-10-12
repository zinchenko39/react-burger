import { LOG_IN, LOG_OUT, REGISTER, USER_ERROR, USER_REFRESH_TOKEN, SET_USER } from '../actions/user-actions.js';

const userInitialState = {
    email: '', 
    name: '',
    isLoggedIn: false,
    isError: false,
    errorStatus: null,
}

export const userReducer  = (state = userInitialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
              ...state,
              email: action.user.email,
              name: action.user.name,
              isLoggedIn: true,
            };
        }
        case LOG_OUT: {
            return { 
                ...state,
                email: '',
                name: '',
                isLoggedIn: false,
                isError: false};

        }
        case REGISTER: {
            return { ...state,
                email: action.user.email,
                name: action.user.name,
                isLoggedIn: true,
            };
        }
        case SET_USER: {
            return { ...state,
                isError: false,
                isLoggedIn: true,
                email: action.email,
                name: action.name,
                isLoggedIn: true,
            };
        }
        case USER_ERROR: {
            return { ...state,
                isError: true,
                isLoggedIn: false,
                errorStatus: action.error,
            };
        }
        case USER_REFRESH_TOKEN: {
            return { ...state,
                isLoggedIn: true
            };
        }
        default: {
            return state;
        }
    }
  }