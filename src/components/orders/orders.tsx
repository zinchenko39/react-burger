import styles from './order.module.css';
import CardOrder from '../card-order/card-order';
import { useSelector } from '../../services/hooks';

function Orders() {
  const data = useSelector((state) => state.feed.data);
  const { orders } = data;
  // console.log(data);
  const items = useSelector((state) => state.ingredients.menu);
  const order = {
    success: true,
    orders: {
      ingredients: [
        '60d3463f7034a000269f45e7',
        '60d3463f7034a000269f45e9',
        '60d3463f7034a000269f45e8',
        '60d3463f7034a000269f45ea',
      ],
      _id: '333',
      status: 'done',
      number: 0,
      createdAt: '2021-06-23T14:43:22.587Z',
      updatedAt: '2021-06-23T14:43:22.603Z',
    },

    total: 1,
    totalToday: 1,
  };
  return (
    <div className={styles.orders_wrapper}>
      {orders
        ? orders.map((elem: any) => {
            return <CardOrder key={`${elem._id}`} order={elem} />;
          })
        : ''}
      {/* <CardOrder order={order.orders} />
      <CardOrder order={order.orders} />
      <CardOrder order={order.orders} />
      <CardOrder order={order.orders} />
      <CardOrder order={order.orders} />
      <CardOrder order={order.orders} />
      <CardOrder order={order.orders} />
      <CardOrder order={order.orders} /> */}
    </div>
  );
}

export default Orders;
