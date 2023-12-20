  import { ingredientsInitialState, ingredientsReducer } from './ingredients-reducer';
  import {
    GET_ITEMS_REQUEST,
    GET_ITEMS_SUCCESS,
    GET_ITEMS_FAILED,
  } from '../actions/ingredients-actions';



  describe('ingredients reducer', () => {
    let state = ingredientsReducer(undefined, {});
    it('should return the initial state', () => {
      expect(state).toEqual(ingredientsInitialState);
    })
    it('should handle GET_ITEMS_REQUEST', () => {
        state = ingredientsReducer(state,{type: GET_ITEMS_REQUEST})
        expect(state).toEqual({
            ...ingredientsInitialState,
            isLoading: true
        })
    });
    it('should handle GET_ITEMS_SUCCESS', () => {
      state = ingredientsReducer(state,{type: GET_ITEMS_SUCCESS, menu: [111,111,111], MenuQuantity: 3})
      expect(state).toEqual({
          ...ingredientsInitialState,
          menu: [111,111,111],
          MenuQuantity: 3
      })
    });
    it('should handle GET_ITEMS_FAILED', () => {
      state = ingredientsReducer(state,{type: GET_ITEMS_FAILED, error: 'error'})
      expect(state).toEqual({
          ...ingredientsInitialState,
          errorStatus: 'error',
          isError: true,
      })
    });
  }) 