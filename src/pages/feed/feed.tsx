import styles from './feed.module.css';
import { OrderStatus, Orders } from '../../components';
import { useSelector } from '../../services/hooks';

function Feed() {
  const data = useSelector((state) => state.feed.data);
  const isLoading = useSelector((state) => state.feed.isLoading);
  const { orders, success, error } = data;

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
