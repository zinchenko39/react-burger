import { useEffect } from 'react';
import styles from './feed.module.css';
import { OrderStatus, Orders } from '../../components';
import { useSelector, useDispatch } from '../../services/hooks';
import { WSS_SERVER_URL } from '../../utils/api';
import {
  ORDER_CONNECT,
  ORDER_DISCONNECT,
} from '../../services/actions/feed-ws-actions';

function Feed() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.feed.data);
  const isLoading = useSelector((state) => state.feed.isLoading);
  const connected = useSelector((state) => state.feed.connected);
  const { orders, success, error } = data;

  const connect = () =>
    dispatch({ type: ORDER_CONNECT, payload: `${WSS_SERVER_URL}/all` });

  const disconnect = () => dispatch({ type: ORDER_DISCONNECT });

  useEffect(() => {
    if (connected === false) connect();

    if (connected)
      return () => {
        disconnect();
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connected]);

  if (success === false || error) {
    return (
      <div className={styles.feed_message}>
        <p className="text text_type_main-medium">Что-то пошло не так...</p>
      </div>
    );
  }
  return (
    <section className={styles.feed_container}>
      {isLoading ? (
        <div className={styles.feed_message}>
          <p className="text text_type_main-medium">Загрузка...</p>
        </div>
      ) : (
        <>
          <p className="text text_type_main-large">Лента Заказов</p>
          <div className={styles.feed_wrapper}>
            <div className={styles.feed_left}>
              <Orders orders={orders} />
            </div>
            <div className={styles.feed_right}>
              <OrderStatus />
            </div>
          </div>
        </>
      )}
    </section>
  );
}

export default Feed;
