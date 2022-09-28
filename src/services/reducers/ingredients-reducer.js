import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED } from '../actions/ingredients-actions.js';

const initialState = {  
    menu: [],
    isLoading: false,
    isError: false,
    errorStatus: null,
    MenuQuantity: 0
  };

  export const ingredientsReducer  = (state = initialState, action) => {
    switch (action.type) {
        case GET_ITEMS_REQUEST: {
            return {
              ...state,
              isLoading: true
            };
        }
        case GET_ITEMS_SUCCESS: {
            return { 
                ...state, 
                isError: false, menu: action.menu, isLoading: false , MenuQuantity: action.MenuQuantity };
        }
        case GET_ITEMS_FAILED: {
            return { ...state, isError: true, isLoading: false , errorStatus: action.error};
        }
        default: {
            return state;
        }
    }
  }