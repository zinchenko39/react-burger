import { loadIngredients } from '../../utils/api';
import { Dispatch, Action } from 'redux';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export function getItems() {
  return function (dispatch: Dispatch<Action>) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    loadIngredients()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            menu: res.data,
            MenuQuantity: res.data.length,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: GET_ITEMS_FAILED,
          error,
        });
      });
  };
}
