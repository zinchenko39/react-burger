import React from 'react';
import styles from './order-details.module.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
function OrderDetails() {
  const orderNumber = useSelector((state) => state.order.orderNumber);
  return (
    <div className={styles.order_details__wrapper}>
      <div className={styles.order_details__number}>
        <p className="text text_type_digits-large">{orderNumber}</p>
        <div className={styles.order_details__id}>
          <p className="text text_type_main-medium">Идентификатор заказа</p>
        </div>
        <div className={styles.order_details__done}></div>
        <div className={styles.order_details__start}>
          <p className="text text_type_main-default">
            Ваш заказ начали готовить
          </p>
        </div>
        <div className={styles.order_details__wait}>
          <p className="text text_type_main-default">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number,
};

export default OrderDetails;
