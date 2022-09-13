import React from "react";
import { BurgersContext } from '../../services/burgersContext.js';

import styles from './burger-constructor.module.css';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal, OrderDetails } from '../index.js';

import useModalControls from '../../hooks/modal-controls';

const initialSum = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
      case "increment":
        return { count: state.count + action.price };
      case "reset":
        return state.count;
      default:
        throw new Error(`Wrong type of action: ${action.type}`);
    }
  }



function BurgerConstructor () {
    const items = React.useContext(BurgersContext);
    const [sum, dispatchSum] = React.useReducer(reducer, initialSum);

    const [filteredItems, setFilteredItems] = React.useState([]);
    const [buns, setBuns] = React.useState([]);

    function filterItems (items) {
        let buns = []
        let notBuns = [];
        items.forEach((elem => {
            if (elem.type !== 'bun') {
                notBuns.push(elem);
            }
            if (elem.type === 'bun') {
                buns.push(elem);
            }
        }))
        setFilteredItems(notBuns);
        setBuns(buns);
    }

    function calculatePrice () {
        filteredItems.forEach((elem) => {
            dispatchSum({type: 'increment', price: elem.price});
        })
        buns.forEach((elem) => {
            dispatchSum({type: 'increment', price: elem.price});
        })
    }

    React.useEffect(() => {
        filterItems(items);
        calculatePrice();
    },[items]);


    const modalControls = useModalControls();
    return (
        <section className={styles.burger_constructor__container}>
            {
                buns.map(bun => {
                    return (
                        <>
                        <div key={`${bun._id}_top`} className={styles.burger_constructor__top}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text= {bun.name}
                                price={bun.price}
                                thumbnail= {bun.image}
                            />
                        </div>
                        <div key={`${bun._id}_bottom`}  className={styles.burger_constructor__bottom}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text= {bun.name}
                                price={bun.price}
                                thumbnail= {bun.image}
                            />
                        </div>
                        </>
                    )
                })
            }
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
            <div className={styles.burger_constructor__info}>
                <div className={styles.burger_constructor__info_price}>
                    <span className="text text_type_digits-medium">{sum.count}</span>
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