import styles from './card-order.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { ILocation } from '../../interfaces/ILocations';
import { useSelector } from '../../services/hooks';

function CardOrder({ order }: any) {
  const location = useLocation() as ILocation;
  const items = useSelector((state) => state.ingredients.menu);

  const maxIngredients = items.length;
  return (
    <Link
      to={{
        pathname: `/feed/${order.number}`,
        state: { background: location },
      }}
    >
      <div className={styles.card_order_wrapper}>
        <div className={styles.card_order__top}>
          <div className={styles.card_order_id}>
            <p className="text text_type_main-small">#{order.number}</p>
          </div>
          <div className={styles.card_order_time}>
            <p className="text text_type_main-small">{order.createdAt}</p>
          </div>
        </div>
        <div className={styles.card_order_title}>
          <p className="text text_type_main-small">{order.name}</p>
        </div>
        <div className={styles.card_order__bottom}>
          <div className={styles.card_order__ingredients}>
            {items.slice(0, 6).map((ingredient, index) => {
              let zIndex = maxIngredients - index;
              let right = 20 * index;
              return (
                <div
                  className={styles.card_order__ingredients_img_wrapper}
                  style={{ zIndex: zIndex, right: right }}
                >
                  <img
                    src={ingredient.image}
                    className={
                      index < 5
                        ? styles.card_order__ingredients_img
                        : styles.card_order__ingredients_img__last
                    }
                    alt="Картинка"
                  ></img>
                  {index < 5 ? (
                    ''
                  ) : (
                    <span className="text text_type_digits-default">+3</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className={styles.card_order__price}>
            <p className="text text_type_digits-default">560</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardOrder;
