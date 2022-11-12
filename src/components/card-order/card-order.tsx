import styles from './card-order.module.css';
import { useSelector } from '../../services/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function CardOrder() {
  const items = useSelector((state) => state.ingredients.menu);

  return (
    <div className={styles.card_order_wrapper}>
      <div className={styles.card_order__top}>
        <div className={styles.card_order_id}>
          <p className="text text_type_main-small">#034535</p>
        </div>
        <div className={styles.card_order_time}>
          <p className="text text_type_main-small">Сегодня, 16:20</p>
        </div>
      </div>
      <div className={styles.card_order_title}>
        <p className="text text_type_main-small">Interstellar бургер</p>
      </div>
      <div className={styles.card_order__bottom}>
        <div className={styles.card_order__ingredients}>
          {items.map((ingredient) => (
            <img
              src={ingredient.image}
              className={styles.card_order__ingredients_img}
              alt="Картинка"
            ></img>
          ))}
        </div>
        <div className={styles.card_order__price}>
          <p className="text text_type_digits-default">560</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default CardOrder;
