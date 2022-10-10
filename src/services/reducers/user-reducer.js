import { LOG_IN, LOG_OUT, REGISTER, USER_ERROR } from '../actions/user-actions.js';

const userInitialState = {
    email: '', 
    name: '',
    accessToken: '',
    refreshToken: '',
    isError: false,
    errorStatus: null,
}

export const userReducer  = (state = userInitialState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
              ...state,
              email: action.user.email,
            };
        }
        case LOG_OUT: {
            return { 
                ...state, 
                isError: false, orderNumber: action.orderNumber, itemsId: action.orderId};

        }
        case REGISTER: {
            return { ...state,
                email: action.user.email,
                name: action.user.name,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            };
        }
        case USER_ERROR: {
            return { ...state,
                isError: true,
                errorStatus: action.error,
            };
        }
        default: {
            return state;
        }
    }
  }