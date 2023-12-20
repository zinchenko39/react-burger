import { constructorReducer, constructorInitialState } from "./constructor-reducer";
import {
    ADD_ITEM,
    DELETE_ITEM,
    DRAG_ITEM
  } from '../actions/constructor-actions';


  const ingredient1 = {
    _id: "123",
    name: "burger",
    type: "ingredient",
    price: 12225,
    uniqId: 123
  };

  const ingredient2 = {
    _id: "321",
    name: "sauce",
    type: "ingredient",
    price: 1215,
    uniqId: 124
  };
  const bun = {
    _id: "323",
    name: "bun",
    type: "bun",
    price: 1211,
    uniqId: 125
  };

describe('burger constructor reducer', () => {
    let state = constructorReducer(undefined, {});
    it('should return the initial state', () => {
      expect(state).toEqual(constructorInitialState);
    })
    it('should handle ADD_ITEM_INGREDIENT', () => {
        state = constructorReducer(state,{type: ADD_ITEM, item: ingredient1})
        state = constructorReducer(state,{type: ADD_ITEM, item: ingredient2})
        expect(state).toEqual({
            items: [ingredient1, ingredient2],
            bun: {}
        })
        expect(state.items.length).toBe(2);
    });
    it('should handle ADD_ITEM_BUN', () => {
        state = constructorReducer(state,{type: ADD_ITEM, item: bun})
        expect(state).toEqual({
            items: [ingredient1, ingredient2],
            bun: bun
        })
        expect(state.items.length).toBe(2);
    });
    it('should handle DRAG_ITEM', () => {
        state = constructorReducer(state, {type: DRAG_ITEM, dragIndex: 0, hoverIndex: 1})
        expect(state).toEqual({
            items: [ingredient2, ingredient1],
            bun: bun
        })
        expect(state.items.length).toBe(2);
    });
    it('should handle DELETE_ITEM', () => {
        state = constructorReducer(state,{type: DELETE_ITEM, uniqId: 124})
        expect(state).toEqual({
            items: [ingredient1],
            bun: bun
        })
        expect(state.items.length).toBe(1);
    });
  }) 