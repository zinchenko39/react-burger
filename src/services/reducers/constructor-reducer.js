import { ADD_ITEM, DELETE_ITEM, DRAG_ITEM } from '../actions/constructor-actions.js';

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
      const newItems = [...state.items];
      const dragginItem = action.dragginItem
      const underItem = action.underItem
      const dragginIndex = action.dragginIndex
      const underIndex = action.underIndex


      newItems.splice(dragginIndex, 1);
      newItems.splice(underItem, 1);
      newItems.splice(underIndex, 0, dragginItem);
      newItems.splice(dragginIndex, 0, underItem);
      // newItems.splice(index, 1) //Убираем элемент из массива который взят
      // newItems.splice(index, 0, currentItem)
      
      // newItems.splice(0, 1, currentItem)
      return {
        ...state,
        items: newItems
      }
    }
    // case DROP_ITEM: {

    // }
    default: {
      return state;
    }
  }
}