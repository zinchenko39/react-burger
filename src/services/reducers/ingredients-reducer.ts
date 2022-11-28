import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from '../actions/ingredients-actions';
import { IIngredient } from '../../interfaces/IIngredient';
import { TIngredientsActions } from '../actions/ingredients-actions';

type TIngredientsInitialState = {
  menu: ReadonlyArray<IIngredient>;
  isLoading: boolean;
  isError: boolean;
  errorStatus: string | null;
  MenuQuantity: number;
};

export const ingredientsInitialState: TIngredientsInitialState = {
  menu: [],
  isLoading: false,
  isError: false,
  errorStatus: null,
  MenuQuantity: 0,
};

export const ingredientsReducer = (
  state: TIngredientsInitialState = ingredientsInitialState,
  action: TIngredientsActions
): TIngredientsInitialState => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        isError: false,
        menu: action.menu,
        isLoading: false,
        MenuQuantity: action.MenuQuantity,
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        ...state,
        menu: [],
        MenuQuantity: 0,
        isError: true,
        isLoading: false,
        errorStatus: action.error,
      };
    }
    default: {
      return state;
    }
  }
};
