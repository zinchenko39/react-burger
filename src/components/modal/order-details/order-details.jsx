import React from "react";
import styles from './order-details.module.css';

function orderDetails() {
    return (
        <div className={styles.order_details__wrapper}>
                <div className={styles.order_details__number}>
                <p className="text text_type_digits-large">034536</p>
                <div className={styles.order_details__id}>
                    <p className="text text_type_main-medium">Идентификатор заказа</p>
                </div>
                <div className={styles.order_details__done}></div>
                <div className={styles.order_details__start}>
                    <p className="text text_type_main-default">Ваш заказ начали готовить</p>
                </div>
                <div className={styles.order_details__wait}>
                    <p className="text text_type_main-default">Дождитесь готовности на орбитальной станции</p>
                </div>
            </div>
        </div>
    )
}

export default orderDetails;