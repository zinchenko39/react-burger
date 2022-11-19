import { TIngredientData } from '../pages/order-page/order-page';
import { IFeedOrder } from './IFeedOrder';

export interface ICardOrder {
  order: IFeedOrder;
  totalPrice: number;
  filteredIngredients: Array<TIngredientData>;
  data: string;
}
