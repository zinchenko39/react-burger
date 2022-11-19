import { IIngredient } from '../../interfaces/IIngredient';

export const OPEN_CURRENT_ITEM_DETAILS: 'OPEN_CURRENT_ITEM_DETAILS' =
  'OPEN_CURRENT_ITEM_DETAILS';
export const CLOSE_CURRENT_ITEM_DETAILS: 'CLOSE_CURRENT_ITEM_DETAILS' =
  'CLOSE_CURRENT_ITEM_DETAILS';

export interface IOpenCurrentItemDetails {
  readonly type: typeof OPEN_CURRENT_ITEM_DETAILS;
  readonly item: IIngredient;
}
export interface ICloseCurrentItemDetails {
  readonly type: typeof CLOSE_CURRENT_ITEM_DETAILS;
}

export type TIngredientDetailsActions =
  | IOpenCurrentItemDetails
  | ICloseCurrentItemDetails;
