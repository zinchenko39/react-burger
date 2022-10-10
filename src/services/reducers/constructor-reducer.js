import { ADD_ITEM, DELETE_ITEM, DRAG_ITEM } from '../actions/constructor-actions.js';
import update from 'immutability-helper';

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
    case DRAG_ITEM: {
      return {
        ...state,
        items: update(state.items,{
          $splice: [
            [action.dragIndex, 1],
            [action.hoverIndex, 0, state.items[action.dragIndex]],
          ],
        })
      }
    }
    default: {
      return state;
    }
  }
}