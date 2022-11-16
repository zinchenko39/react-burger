import styles from './order.module.css';
import CardOrder from '../card-order/card-order';
import { useSelector } from '../../services/hooks';
import {
  calculateTotalPrice,
  findIngredientsById,
  getFilteredIngredients,
  TIngredientData,
} from '../../pages/order-page/order-page';
import { IFeedOrder } from '../../interfaces/IFeedOrder';
import { formatDate } from '../../utils/formatData';

function Orders({ orders }: any) {
  const menuIngredients = useSelector((state) => state.ingredients.menu);

  return (
    <div className={styles.orders_wrapper}>
      {orders
        ? orders.map((elem: IFeedOrder) => {
            const filteredIngredients: Array<TIngredientData> = getFilteredIngredients(
              findIngredientsById(elem.ingredients, menuIngredients)
            );
            return (
              <CardOrder
                key={elem.number}
                order={elem}
                totalPrice={calculateTotalPrice(filteredIngredients)}
                filteredIngredients={filteredIngredients}
                data={formatDate(elem.createdAt)}
              />
            );
          })
        : ''}
    </div>
  );
}

export default Orders;
