import { ADD_ITEM } from '../actions/constructor-actions.js';
import { DELETE_ITEM } from '../actions/constructor-actions.js';

const constructorInitialState = {
    items: [],
    bun: {}
}

export const constructorReducer = (state = constructorInitialState, action ) => {
  switch (action.type) {
    case ADD_ITEM: {

      const uniqId = {uniqId: action.uniqId};
      const ingredient = Object.assign(uniqId, action.item);

      if(ingredient.type === 'bun') {
        if(state.bun.id === ingredient._id) {
          return state
        } else {
          return {
            ...state,
            bun: ingredient
          }
        }
      }
      return {
        ...state,
        items: [...state.items, ingredient]
      }
    }
    case DELETE_ITEM: {
      const newCart = state.items.filter(elem => elem.uniqId !== action.uniqId);
      return {
        ...state,
        items: newCart,
      }
    }
    // case DRAG_ITEM: {

    // }
    default: {
      return state;
    }
  }
}