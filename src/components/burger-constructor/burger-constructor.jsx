import { React, useEffect, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';

import styles from './burger-constructor.module.css';

import { DELETE_ITEM } from '../../services/actions/constructor-actions';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal, OrderDetails } from '../index.js';
import { sendItems } from '../../services/actions/order-actions.js';
import useModalControls from '../../hooks/modal-controls';

const initialSum = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.price };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor({ onDropHandler }) {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart.items);
  const bun = useSelector((state) => state.cart.bun);

  const modalControls = useModalControls();

  const [sum, dispatchSum] = useReducer(reducer, initialSum);
  const [orderId, setOrderId] = useState({ ingredients: [] });

  function filterOrderId(items, buns) {
    const arrOrderId = [];

    items.forEach((elem) => {
      arrOrderId.push(elem._id);
    });

    setOrderId({ ingredients: arrOrderId });
  }
  //D&D
  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      onDropHandler(itemId);
    },
  });

  function calculatePrice(items, bun) {
    dispatchSum({
      type: 'reset',
    });
    //Claculate main, sauces
    items.forEach((elem) => {
      dispatchSum({
        type: 'increment',
        price: elem.price,
      });
    });
    //Calculate buns
    if (Object.keys(bun).length !== 0) {
      let bunsPrice = bun.price * 2;
      dispatchSum({
        type: 'increment',
        price: bunsPrice,
      });
    }
  }
  useEffect(() => {
    filterOrderId(items);
    calculatePrice(items, bun);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, bun]);

  return (
    <section ref={dropTarget} className={styles.burger_constructor__container}>
      {Object.keys(bun).length !== 0 ? (
        <div className={styles.burger_constructor__top}>
          <ConstructorElement
            key={`${bun._id}_top`}
            type="top"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ) : (
        ''
      )}
      <main className={styles.burger_constructor__main}>
        {items.map((elem) => {
          return (
            <ConstructorElement
              key={`${elem.uniqId}`}
              text={elem.name}
              price={elem.price}
              thumbnail={elem.image}
              handleClose={() =>
                dispatch({
                  type: DELETE_ITEM,
                  uniqId: elem.uniqId,
                })
              }
            />
          );
        })}
      </main>
      {Object.keys(bun).length !== 0 ? (
        <div className={styles.burger_constructor__bottom}>
          <ConstructorElement
            key={`${bun._id}_bottom`}
            type="bottom"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ) : (
        ''
      )}
      <div className={styles.burger_constructor__info}>
        <div className={styles.burger_constructor__info_price}>
          <span className="text text_type_digits-medium">{sum.count}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={() => {
            dispatch(sendItems(orderId));
            modalControls.open();
          }}
          name="order_btn"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
        <Modal isOpen={modalControls.isModalOpen} close={modalControls.close}>
          <OrderDetails />
        </Modal>
      </div>
    </section>
  );
}

export default BurgerConstructor;
