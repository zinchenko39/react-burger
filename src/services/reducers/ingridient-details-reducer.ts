import {
  OPEN_CURRENT_ITEM_DETAILS,
  CLOSE_CURRENT_ITEM_DETAILS,
} from '../actions/ingridient-details-action';
import { IIngredient } from '../../interfaces/IIngredient';
import { TIngredientDetailsActions } from '../actions/ingridient-details-action';

type TIngridienDetailstInitialState = {
  currentItem: IIngredient | null;
  isOpen: boolean;
};

const ingridienDetailstInitialState: TIngridienDetailstInitialState = {
  currentItem: null,
  isOpen: false,
};

export const ingridientDetailsReducer = (
  state: TIngridienDetailstInitialState = ingridienDetailstInitialState,
  action: TIngredientDetailsActions
): TIngridienDetailstInitialState => {
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
        currentItem: null,
        isOpen: false,
      };
    }
    default: {
      return state;
    }
  }
};
