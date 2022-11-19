import { IIngredient } from '../../interfaces/IIngredient';
export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}
export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly menu: Array<IIngredient>;
  readonly MenuQuantity: number;
}
export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
  readonly error: string;
}
export type TIngredientsActions =
  | IGetItemsRequest
  | IGetItemsSuccess
  | IGetItemsFailed;
