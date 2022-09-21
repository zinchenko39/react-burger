export const ADD_ITEM = 'ADD_ITEM';

export const addItem = (ingridient) => {
  return function(dispatch, getState) {
    
    const state = getState();
    const selectedItem = state.ingredients.menu.find(elem => elem._id === ingridient._id);
    
    dispatch({
      type: ADD_ITEM,
      item: selectedItem,
    });
  }
}