import { useEffect } from 'react';
import styles from './order-status.module.css';
import { useSelector } from '../../services/hooks';

function OrderStatus() {
  const data = useSelector((state) => state.feed.data);
  // orders
  // :
  // (50) [{…}, {…}, ]
  // success
  // :
  // true
  // total
  // :
  // 30135
  // totalToday
  // :
  // 30
  const ordersReady: Array<number> = [13123123];
  const ordersInProgress: Array<number> = [];

  function calculateOrders(): void {
    if (data.orders) {
      // console.log(data.orders);
      data.orders.forEach((elem: any) => {
        if (elem.status === 'done') {
          ordersReady.push(elem.number);
        } else {
          ordersInProgress.push(elem.number);
        }
      });
    } else return;
  }
  useEffect(() => {
    calculateOrders();
    console.log(ordersReady);
  }, [data]);

  return (
    <div className={styles.order_status__wrapper}>
      <div className={styles.order_status_title}>
        <p className="text text_type_main-medium">Готовы:</p>
        <p className="text text_type_main-medium">В работе:</p>
      </div>
      <div className={styles.order_status_info_wrapper}>
        <div className={styles.order_status__ready}>
          {data.orders
            ? data.orders.map((elem: any) => {
                if (elem.status === 'done') {
                  return (
                    <p className="text text_type_digits-default">
                      {elem.number}
                    </p>
                  );
                }
              })
            : ''}
        </div>
        {/* <div className={styles.order_status__ready}>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
          <p className="text text_type_digits-default">034533</p>
        </div> */}
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
          <p className="text text_type_digits-large">{data.total}</p>
        </div>
      </div>
      {/* <div className={styles.order_status_total_number}></div> */}
      <div className={styles.order_status_total_today}>
        <p className="text text_type_main-medium">Выполнено за сегодня:</p>
        <div className={styles.order_status_total_done_number}>
          <p className="text text_type_digits-large">{data.totalToday}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderStatus;
