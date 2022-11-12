import styles from './order.module.css';
import CardOrder from '../card-order/card-order';

function Orders() {
  return (
    <div className={styles.orders_wrapper}>
      <CardOrder />
      <CardOrder />
      <CardOrder />
      <CardOrder />
      <CardOrder />
      <CardOrder />
      <CardOrder />
      <CardOrder />
    </div>
  );
}

export default Orders;
