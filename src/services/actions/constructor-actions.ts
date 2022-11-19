import { IIngredient } from '../../interfaces/IIngredient';
export const ADD_ITEM: 'ADD_ITEM' = 'ADD_ITEM';
export const DELETE_ITEM: 'DELETE_ITEM' = 'DELETE_ITEM';
export const DRAG_ITEM: 'DRAG_ITEM' = 'DRAG_ITEM';

export interface IAddItem {
  readonly type: typeof ADD_ITEM;
  readonly uniqId: number;
  readonly item: IIngredient;
}
export interface IDeleteItem {
  readonly type: typeof DELETE_ITEM;
  readonly uniqId: number;
}
export interface IDragItem {
  readonly type: typeof DRAG_ITEM;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

export type TConstructorActions = IAddItem | IDeleteItem | IDragItem;
