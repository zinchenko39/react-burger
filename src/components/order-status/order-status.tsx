import styles from './order-status.module.css';

function OrderStatus() {
  return (
    <div className={styles.order_status__wrapper}>
      <div className={styles.order_status_title}>
        <p className="text text_type_main-medium">Готовы:</p>
        <p className="text text_type_main-medium">В работе:</p>
      </div>
      <div className={styles.order_status_info_wrapper}>
        <div className={styles.order_status__ready}>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
        </div>
        <div className={styles.order_status__progress}>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
        </div>
      </div>
      <div className={styles.order_status_total_done}>
        <p className="text text_type_main-medium">Выполнено за всё время:</p>
        <div className={styles.order_status_total_done_number}>
          <p className="text text_type_digits-large">27 752</p>
        </div>
      </div>
      {/* <div className={styles.order_status_total_number}></div> */}
      <div className={styles.order_status_total_today}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <div className={styles.order_status_total_done_number}>
          <p className="text text_type_digits-large">138</p>
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
