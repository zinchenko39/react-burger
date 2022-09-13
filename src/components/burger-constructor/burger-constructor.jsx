import React from "react";
import PropTypes from 'prop-types';

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
    const modalControls = useModalControls();

    const [sum, dispatchSum] = React.useReducer(reducer, initialSum);
    const [filteredItems, setFilteredItems] = React.useState([]);
    const [buns, setBuns] = React.useState([]);
    const [orderId, setOrderId] = React.useState({ingredients: []});
    const [orderNumber, setOrderNumber] = React.useState();

    function filterItems (items) {
        let buns = []
        let notBuns = [];
        let orderId = [];
        
        items.forEach((elem => {
            if (elem.type !== 'bun') {
                notBuns.push(elem);
                orderId.push(elem._id);
            }
            if (elem.type === 'bun') {
                buns.push(elem);
            }
        }))
        setFilteredItems(notBuns);
        setBuns(buns);
        setOrderId({ingredients: orderId});
    }

    filterItems.prototype = {
        items: PropTypes.objectOf(PropTypes.array)
    }
    async function postOrder (items) {
        await fetch ('https://norma.nomoreparties.space/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(items)
        })
        .then((responce) => {
            if(responce.ok) {
                return responce.json()
            }
            return Promise.reject(`Ошибка ${responce.status}`);
        })
        .then((res) => {
            setOrderNumber(res.order.number);
        })
        .catch((error) => {
            setOrderNumber("Ошибка")
            console.log(`Ошибка ${error}`)
        })
    }
    postOrder.prototype = {
        items: PropTypes.objectOf(PropTypes.array)
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

    return (
        <section className={styles.burger_constructor__container}>
            {
                buns.map((bun)=> {
                    return (
                        <>
                        <div className={styles.burger_constructor__top}>
                            <ConstructorElement
                                key={`${bun._id}_top`}
                                type="top"
                                isLocked={true}
                                text= {bun.name}
                                price={bun.price}
                                thumbnail= {bun.image}
                            />
                        </div>
                        <div className={styles.burger_constructor__bottom}>
                            <ConstructorElement
                                key={`${bun._id}_bottom`}
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
                <Button onClick={() => {postOrder(orderId); modalControls.open()}} name="order_btn" type="primary" size="large">
                    Оформить заказ
                </Button>
                <Modal isOpen={modalControls.isModalOpen} close = {modalControls.close}>
                    <OrderDetails orderNumber={orderNumber}/>
                </Modal>
            </div>
        </section>
    )
}

reducer.prototype = {
    state: PropTypes.object.isRequired,
    action: PropTypes.object.isRequired,
}

export default BurgerConstructor;