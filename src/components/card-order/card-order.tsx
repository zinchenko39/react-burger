import styles from './card-order.module.css';

function CardOrder() {
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
        <div className={styles.card_order__ingredients}></div>
      </div>
    </div>
  );
}

export default CardOrder;
