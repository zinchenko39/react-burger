import styles from './feed.module.css';
import { CardOrder } from '../../components';

function Feed() {
  return (
    <section className={styles.feed_container}>
      <p className="text text_type_main-medium">Лента Заказов</p>
      <div className={styles.feed_wrapper}>
        <div className={styles.feed_left}>
          <CardOrder />
        </div>
        <div className={styles.feed_right}>Hello</div>
      </div>
    </section>
  );
}

export default Feed;
