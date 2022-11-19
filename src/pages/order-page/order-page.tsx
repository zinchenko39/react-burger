import styles from './order-page.module.css';
import { useSelector } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';
import { IIngredient } from '../../interfaces/IIngredient';
import { formatDate } from '../../utils/formatData';
import { IFeedOrder } from '../../interfaces/IFeedOrder';

export type TIngredientData = {
  item: IIngredient;
  count: number;
};

export const calculateTotalPrice = (ingredients: Array<TIngredientData>) => {
  let price: number = 0;
  ingredients.forEach((obj: TIngredientData) => {
    price += obj.item.price * obj.count;
  });
  return price;
};

export const getOrderStatus = (orderStatus: string) => {
  let status: string = '';
  switch (orderStatus) {
    case 'done': {
      status = 'Выполнен';
    }
  }
  switch (orderStatus) {
    case 'created': {
      status = 'Создан';
    }
  }
  switch (orderStatus) {
    case 'pending': {
      status = 'Готовится';
    }
  }
  return status;
};

export const findIngredientsById = (
  ingredientsId: ReadonlyArray<string>,
  menuIngredients: ReadonlyArray<IIngredient>
) => {
  const ingredients: Array<IIngredient> = [];
  ingredientsId?.forEach((id: string) => {
    menuIngredients.forEach((elem: IIngredient) => {
      if (elem._id === id) ingredients.push(elem);
    });
  });
  return ingredients;
};

export const getFilteredIngredients = (ingredients: Array<IIngredient>) =>
  ingredients?.reduce((prev: Array<TIngredientData>, current: IIngredient) => {
    if (current) {
      const n: number = prev.findIndex(
        (i: TIngredientData) => i.item === current
      );
      if (n >= 0) prev[n].count++;
      else return [...prev, { item: current, count: 1 }];
    }
    return prev;
  }, []);

function OrderPage({ background }: any) {
  const { id } = useParams<{ id: string }>();
  const error = useSelector((state) => state.feed.error);
  const data = useSelector((state) => state.feed.data);
  const order = data.orders?.find(
    (elem: IFeedOrder) => elem.number === parseInt(id)
  );
  const orderIngredientsId = order?.ingredients;
  const menuIngredients = useSelector((state) => state.ingredients.menu);

  const ingredientsId = findIngredientsById(
    orderIngredientsId,
    menuIngredients
  );
  const filteredIngredients = getFilteredIngredients(ingredientsId);

  if (error) {
    return (
      <div className={styles.order_card__loading}>
        <p className="text text_type_digits-medium">Что-то пошло не так...</p>
      </div>
    );
  }

  return order ? (
    <div
      className={
        background
          ? styles.order_card__wrapper_modal
          : styles.order_card__wrapper
      }
    >
      <div
        className={
          background
            ? styles.order_card__number_modal
            : styles.order_card__number
        }
      >
        <p className="text text_type_digits-default">#{id}</p>
      </div>
      <div className={styles.order_card__title}>
        <p className="text text_type_main-medium">{order?.name}</p>
      </div>
      <div className={styles.order_card__status}>
        <p className="text text_type_main-default">
          {getOrderStatus(order?.status)}
        </p>
      </div>
      <div className={styles.order_card__properties}>
        <p className="text text_type_main-medium">Состав:</p>
      </div>
      <div className={styles.order_card__ingredients}>
        <div className={styles.order_card__ingredient_details}>
          {filteredIngredients?.map((data: TIngredientData) => (
            <div key={data.item._id} className={styles.order_card__ingredient}>
              <div className={styles.order_card__ingredient_img__wrapper}>
                <img
                  src={data.item.image}
                  className={styles.order_card__ingredient_img}
                  alt="Картинка"
                ></img>
              </div>
              <div className={styles.order_card__ingredient_name}>
                <p className="text text_type_main-default">{data.item.name}</p>
              </div>
              <div className={styles.order_card__ingredient_quantity}>
                <p className="text text_type_digits-default">{data.count}</p>
              </div>
              <div className={styles.order_card__ingredient_price}>
                <p className="text text_type_digits-default">
                  {data.item.price * data.count}
                </p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
        <div
          className={
            background
              ? styles.order_card__ingredient_bottom_modal
              : styles.order_card__ingredient_bottom
          }
        >
          <div className={styles.order_card__ingredient_date}>
            <p className="text text_type_main-default text_color_inactive">
              {formatDate(order?.createdAt)}
            </p>
          </div>
          <div className={styles.order_card__ingredient_total_price}>
            <p className="text text_type_digits-default">
              {calculateTotalPrice(filteredIngredients)}
            </p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.order_card__loading}>
      <p className="text text_type_digits-medium">Загрузка...</p>
    </div>
  );
}

export default OrderPage;
