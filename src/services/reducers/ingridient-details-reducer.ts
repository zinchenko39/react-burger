import { OPEN_CURRENT_ITEM_DETAILS } from '../actions/ingridient-details-action';
import { CLOSE_CURRENT_ITEM_DETAILS } from '../actions/ingridient-details-action';

const ingridientInitialState = {
  currentItem: null,
  isOpen: false,
};

export const ingridientDetailsReducer = (
  state: any = ingridientInitialState,
  action: any
) => {
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
};
