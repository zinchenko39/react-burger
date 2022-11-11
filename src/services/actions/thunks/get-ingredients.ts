import { loadIngredients } from '../../../utils/api';
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
} from '../ingredients-actions';
import { AppThunk } from '../../types';
import { AppDispatch } from '../../types';

export function getItems(): AppThunk {
  return function (dispatch: AppDispatch) {
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
