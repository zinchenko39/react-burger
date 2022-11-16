import { useEffect, useState } from 'react';
import styles from './order-status.module.css';
import { useSelector } from '../../services/hooks';

function OrderStatus() {
  const data = useSelector((state) => state.feed.data);
  const [ordersReady, setOrdersReady] = useState<Array<number>>([]);
  const [ordersInProgress, setOrdersInProgress] = useState<Array<number>>([]);

  function calculateOrders(): void {
    const readyArray: Array<number> = [];
    const inProgressArray: Array<number> = [];
    if (data.orders) {
      data.orders.forEach((elem: any) => {
        if (elem.status === 'done') {
          readyArray.push(elem.number);
        } else {
          inProgressArray.push(elem);
        }
      });
      setOrdersReady(readyArray);
      setOrdersInProgress(inProgressArray);
    } else return;
  }
  useEffect(() => {
    calculateOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className={styles.order_status__wrapper}>
      <div className={styles.order_status_title}>
        <p className="text text_type_main-medium">Готовы:</p>
        <p className="text text_type_main-medium">В работе:</p>
      </div>
      <div className={styles.order_status_info_wrapper}>
        <div className={styles.order_status__ready}>
          {ordersReady.map((elem: number) => {
            return (
              <p key={elem} className="text text_type_digits-default">
                {elem}
              </p>
            );
          })}
        </div>
        <div className={styles.order_status__progress}>
          {ordersInProgress.map((elem: number) => {
            return (
              <p key={elem} className="text text_type_digits-default">
                {elem}
              </p>
            );
          })}
        </div>
      </div>
      <div className={styles.order_status_total_done}>
        <p className="text text_type_main-medium">Выполнено за всё время:</p>
        <div className={styles.order_status_total_done_number}>
          <p className="text text_type_digits-large">{data.total}</p>
        </div>
      </div>
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
