import styles from './card-order.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useLocation } from 'react-router-dom';
import { ILocation } from '../../interfaces/ILocations';
import { ICardOrder } from '../../interfaces/ICardOrder';
import { TIngredientData } from '../../pages/order-page/order-page';

function CardOrder({
  order,
  totalPrice,
  filteredIngredients,
  data,
}: ICardOrder) {
  const location = useLocation() as ILocation;
  const maxIngredients = filteredIngredients.length;
  const calculateHidenLength = (length: number) => {
    let result: number = 0;
    if (length > 6) result = length - 6;
    return result;
  };

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
            <p className="text text_type_main-small">{data}</p>
          </div>
        </div>
        <div className={styles.card_order_title}>
          <p className="text text_type_main-small">{order.name}</p>
        </div>
        <div className={styles.card_order__bottom}>
          <div className={styles.card_order__ingredients}>
            {filteredIngredients
              .slice(0, 6)
              .map((ingredient: TIngredientData, index: number) => {
                let zIndex: number = maxIngredients - index;
                let right: number = 20 * index;
                return (
                  <div
                    key={ingredient.item._id}
                    className={styles.card_order__ingredients_img_wrapper}
                    style={{ zIndex: zIndex, right: right }}
                  >
                    <img
                      src={ingredient.item.image}
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
                      <span className="text text_type_digits-default">
                        +{calculateHidenLength(maxIngredients)}
                      </span>
                    )}
                  </div>
                );
              })}
          </div>
          <div className={styles.card_order__price}>
            <p className="text text_type_digits-default">{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CardOrder;
