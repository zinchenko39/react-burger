import styles from './order-details.module.css';
import { useSelector } from '../../services/hooks';

function OrderDetails() {
  const orderError = useSelector((state) => state.order.isError);
  const orderNumber = useSelector((state) => state.order.orderNumber);
  const isLoading = useSelector((state) => state.order.isLoading);

  return (
    <div className={styles.order_details__wrapper}>
      {isLoading ? (
        <div className={styles.order_details_message}>
          <p className="text text_type_main-medium">Загрузка...</p>
        </div>
      ) : (
        <div className={styles.order_details__number}>
          <p className="text text_type_digits-large">{orderNumber}</p>
          <div className={styles.order_details__id}>
            {!orderError && (
              <p className="text text_type_main-medium">Идентификатор заказа</p>
            )}
          </div>
          {!orderError && <div className={styles.order_details__done}></div>}

          <div className={styles.order_details__start}>
            {orderError ? (
              <p className="text text_type_main-default">
                Что-то пошло не так...
              </p>
            ) : (
              <p className="text text_type_main-default">
                Ваш заказ начали готовить
              </p>
            )}
          </div>
          <div className={styles.order_details__wait}>
            {!orderError && (
              <p className="text text_type_main-default">
                Дождитесь готовности на орбитальной станции
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetails;
