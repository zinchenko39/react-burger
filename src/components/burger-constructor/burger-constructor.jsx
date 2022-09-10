import React from "react";

import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal, OrderDetails } from '../index.js';
import useModalControls from '../../hooks/modal-controls';


function BurgerConstructor ({items}) {

    const filteredItems = [];
    items.forEach((elem) => {
        if (elem.type !== 'bun') {
            filteredItems.push(elem);
        }
    });

    const modalControls = useModalControls();
    return (
        <section className={styles.burger_constructor__container}>
            <div className={styles.burger_constructor__top}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={20}
                        thumbnail= "https://code.s3.yandex.net/react/code/bun-02.png"
                    />
            </div>
            <main className={styles.burger_constructor__main}>
                {
                    filteredItems.map (elem => {
                        return (
                            <ConstructorElement
                            key = {`${elem._id}`}
                            text = {elem.name}
                            price = {elem.price}
                            thumbnail = {elem.image}
                        />
                        )
                    })
                }
            </main>
            <div className={styles.burger_constructor__bottom}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
            </div>
            <div className={styles.burger_constructor__info}>
                <div className={styles.burger_constructor__info_price}>
                    <span className="text text_type_digits-medium">610</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button onClick={modalControls.open} name="order_btn" type="primary" size="large">
                    Оформить заказ
                </Button>
                <Modal isOpen={modalControls.isModalOpen} close = {modalControls.close}>
                    <OrderDetails/>
                </Modal>
            </div>
        </section>
    )
}
export default BurgerConstructor;