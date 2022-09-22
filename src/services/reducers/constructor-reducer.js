import { ADD_ITEM } from '../actions/constructor-actions.js';
import { DELETE_ITEM } from '../actions/constructor-actions.js';


const constructorInitialState = {
    items: [],
    bun: ''
  
}

export const constructorReducer = (state = constructorInitialState, action, ) => {
  switch (action.type) {
    case ADD_ITEM: {
      if(action.item.type === 'bun') {
        if(state.bun.id === action.item._id) {
          return state
        } else {
          return {
            ...state,
            bun: action.item
          }
        }
      }
      return {
        ...state,
        items: [...state.items, action.item]
      }
    }
    case DELETE_ITEM: {
      return state;
    }
    default: {
      return state;
    }
  }
}