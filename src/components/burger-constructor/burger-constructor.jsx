import { React, useEffect, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useHistory } from 'react-router-dom';

import styles from './burger-constructor.module.css';

import { ADD_ITEM } from '../../services/actions/constructor-actions';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorCard, OrderDetails, Modal } from '../index.js';
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

function BurgerConstructor() {
  const dispatch = useDispatch();
  const history = useHistory();
  const cart = useSelector((state) => state.cart.items);
  const bun = useSelector((state) => state.cart.bun);
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);

  const modalControls = useModalControls();

  const [sum, dispatchSum] = useReducer(reducer, initialSum);
  const [orderId, setOrderId] = useState({ ingredients: [] });

  function filterOrderId(items, bun) {
    const arrOrderId = [];

    arrOrderId.push(bun._id);
    items.forEach((elem) => {
      arrOrderId.push(elem._id);
    });

    setOrderId({ ingredients: arrOrderId });
  }

  //D&D Drop
  const [, dropContainer] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      handleDrop(itemId);
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
  //D&D
  const elements = useSelector((state) => state.ingredients.menu);

  const handleDrop = (itemId) => {
    let ingredient;

    function compareIngredient() {
      elements.forEach((element) => {
        if (element._id === itemId.id) {
          ingredient = element;
        } else {
          return;
        }
      });
    }
    compareIngredient();
    dispatch({
      type: ADD_ITEM,
      item: ingredient,
      uniqId: Math.random(),
    });
  };

  useEffect(() => {
    filterOrderId(cart, bun);
    calculatePrice(cart, bun);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart, bun]);

  return (
    <section
      ref={dropContainer}
      className={styles.burger_constructor__container}
    >
      {Object.keys(bun).length !== 0 ? (
        <div className={styles.burger_constructor__top}>
          <ConstructorElement
            key={`${bun._id}_top`}
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ) : (
        ''
      )}
      <main className={styles.burger_constructor__main}>
        {cart.map((elem, index) => {
          return (
            <BurgerConstructorCard
              key={elem.uniqId}
              item={elem}
              index={index}
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
            text={`${bun.name} (низ)`}
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
            if (userLoggedIn) {
              dispatch(sendItems(orderId));
              modalControls.open();
            } else {
              history.replace('/login');
            }
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
