import { OPEN_CURRENT_ITEM_DETAILS } from '../actions/ingridient-details-action.js';
import { CLOSE_CURRENT_ITEM_DETAILS } from '../actions/ingridient-details-action.js';

const ingridientInitialState = {
    currentItem: null,
    isOpen: false,
}

export const ingridientDetailsReducer = (state = ingridientInitialState, action) => {
    switch (action.type) {
      case OPEN_CURRENT_ITEM_DETAILS: {
        return {
          ...state,
          currentItem: action.item,
          isOpen: true,
        };
      }
      case CLOSE_CURRENT_ITEM_DETAILS: {
        return {
          ...state,
          currentItem: {},
          isOpen: false,
        };
      }
      default: {
        return state;
      }
    }
  }