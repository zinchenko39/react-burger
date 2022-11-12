import styles from './feed.module.css';
import { OrderStatus, Orders } from '../../components';

function Feed() {
  return (
    <section className={styles.feed_container}>
      <p className="text text_type_main-large">Лента Заказов</p>
      <div className={styles.feed_wrapper}>
        <div className={styles.feed_left}>
          <Orders />
        </div>
        <div className={styles.feed_right}>
          <OrderStatus />
        </div>
      </div>
    </section>
  );
}

export default Feed;
