  import {ingridienDetailstInitialState, ingridientDetailsReducer} from './ingridient-details-reducer';
  import {
    OPEN_CURRENT_ITEM_DETAILS,
    CLOSE_CURRENT_ITEM_DETAILS,
  } from '../actions/ingridient-details-action';


  const ingredient1 = {
    _id: "123",
    name: "burger",
    type: "ingredient",
    price: 12225,
    uniqId: 123
};


  describe('ingredient-details reducer', () => {
    let state = ingridientDetailsReducer(undefined, {});
    it('should return the initial state', () => {
      expect(state).toEqual(ingridienDetailstInitialState);
    })
    it('should handle OPEN_CURRENT_ITEM_DETAILS', () => {
        state = ingridientDetailsReducer(state,{type: OPEN_CURRENT_ITEM_DETAILS, item: ingredient1})
        expect(state).toEqual({
            currentItem: ingredient1,
            isOpen: true,
        })
    });
    it('should handle CLOSE_CURRENT_ITEM_DETAILS', () => {
        state = ingridientDetailsReducer(state,{type: CLOSE_CURRENT_ITEM_DETAILS})
        expect(state).toEqual(ingridienDetailstInitialState)
    });
  }) 