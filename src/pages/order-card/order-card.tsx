import styles from './order-card.module.css';
import { useSelector } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useParams } from 'react-router-dom';

function OrderCard({ background }: any) {
  const items = useSelector((state) => state.ingredients.menu);
  const { id } = useParams<any>();
  // const orders = useSelector((state: any) => state.orders);
  // const ingredients = useSelector((state: any) => state.ingredients.menu);
  // const ingredient = ingredients.find((elem: IIngredient) => elem._id === id);

  return (
    <div
      className={
        background
          ? styles.order_card__wrapper
          : styles.order_card__wrapper_modal
      }
    >
      <div
        className={
          background
            ? styles.order_card__number
            : styles.order_card__number_modal
        }
      >
        <p className="text text_type_digits-default">#034533</p>
      </div>
      <div className={styles.order_card__title}>
        <p className="text text_type_main-medium">
          Black Hole Singularity острый бургер
        </p>
      </div>
      <div className={styles.order_card__status}>
        <p className="text text_type_main-default">Выполнен</p>
      </div>
      <div className={styles.order_card__properties}>
        <p className="text text_type_main-medium">Состав:</p>
      </div>
      <div className={styles.order_card__ingredients}>
        <div className={styles.order_card__ingredient_details}>
          {items.map((ingredient) => (
            <div className={styles.order_card__ingredient}>
              <div className={styles.order_card__ingredient_img__wrapper}>
                <img
                  src={ingredient.image}
                  className={styles.order_card__ingredient_img}
                  alt="Картинка"
                ></img>
              </div>
              <div className={styles.order_card__ingredient_name}>
                <p className="text text_type_main-default">
                  Флюоресцентная булка R2-D3
                </p>
              </div>
              <div className={styles.order_card__ingredient_quantity}>
                <p className="text text_type_digits-default">2 x</p>
              </div>
              <div className={styles.order_card__ingredient_price}>
                <p className="text text_type_digits-default">200</p>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          ))}
        </div>
        <div
          className={
            background
              ? styles.order_card__ingredient_bottom
              : styles.order_card__ingredient_bottom_modal
          }
        >
          <div className={styles.order_card__ingredient_date}>
            <p className="text text_type_main-default text_color_inactive">
              Сегодня, 13:50
            </p>
          </div>
          <div className={styles.order_card__ingredient_total_price}>
            <p className="text text_type_digits-default">520</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderCard;
