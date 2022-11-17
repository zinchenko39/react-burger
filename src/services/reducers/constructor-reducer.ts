import {
  ADD_ITEM,
  DELETE_ITEM,
  DRAG_ITEM,
} from '../actions/constructor-actions';
import update from 'immutability-helper';
import { IIngredient } from '../../interfaces/IIngredient';
import { TConstructorActions } from '../actions/constructor-actions';

type TConstructorInitialState = {
  items: Array<IIngredient>;
  bun: any;
};

const constructorInitialState: TConstructorInitialState = {
  items: [],
  bun: {},
};

export const constructorReducer = (
  state: TConstructorInitialState = constructorInitialState,
  action: TConstructorActions
): TConstructorInitialState => {
  switch (action.type) {
    case ADD_ITEM: {
      const uniqId = { uniqId: action.uniqId };
      const ingredient: IIngredient = Object.assign(uniqId, action.item);

      if (ingredient.type === 'bun') {
        if (state.bun._id === ingredient._id) {
          return state;
        } else {
          return {
            ...state,
            bun: ingredient,
          };
        }
      }
      return {
        ...state,
        items: [...state.items, ingredient],
      };
    }
    case DELETE_ITEM: {
      const newCart = state.items.filter(
        (elem: IIngredient) => elem.uniqId !== action.uniqId
      );
      return {
        ...state,
        items: newCart,
      };
    }
    case DRAG_ITEM: {
      return {
        ...state,
        items: update(state.items, {
          $splice: [
            [action.dragIndex, 1],
            [action.hoverIndex, 0, state.items[action.dragIndex]],
          ],
        }),
      };
    }
    default: {
      return state;
    }
  }
};
