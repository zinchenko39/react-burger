import { React, useEffect, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useDrag } from 'react-dnd';

import styles from './burger-constructor.module.css';

import { DRAG_ITEM } from '../../services/actions/constructor-actions';
import { DELETE_ITEM } from '../../services/actions/constructor-actions';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal, OrderDetails, BurgerConstructorCard } from '../index.js';
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

  const cart = useSelector((state) => state.cart.items);
  const bun = useSelector((state) => state.cart.bun);

  const modalControls = useModalControls();

  const [sum, dispatchSum] = useReducer(reducer, initialSum);
  const [orderId, setOrderId] = useState({ ingredients: [] });
  // const [currentDragingItem, setCurrentDragingItem] = useState();
  // const [dragingItemIndex, setDragingItemIndex] = useState();

  function filterOrderId(items, buns) {
    const arrOrderId = [];

    items.forEach((elem) => {
      arrOrderId.push(elem._id);
    });

    setOrderId({ ingredients: arrOrderId });
  }

  //D&D Drop
  const [, dropContainer] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      onDropHandler(itemId);
    },
  });

  const [isOver, canDrop, dropConstructor] = useDrop({
    accept: 'cart',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
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

  // const findIndex = (elem) => {
  //   const item = cart.filter((e) => e.uniqId === elem.uniqId)[0];
  //   const index = cart.indexOf(item);
  //   setCurrentDragingItem(elem);
  //   setDragingItemIndex(index);
  // };

  // const handleDrigging = (elem) => {
  //   findIndex(elem);
  // };

  useEffect(() => {
    filterOrderId(cart);
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
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
      ) : (
        ''
      )}
      <main ref={dropConstructor} className={styles.burger_constructor__main}>
        {cart.map((elem) => {
          return (
            <BurgerConstructorCard key={elem.uniqId} ingredient={elem} />
            // <div
            //   onClick={() => findIndex(elem)}
            //   className={styles.burger_constructor_element__wrapper}
            //   ref={dragRef}
            //   key={`${elem.uniqId}`}
            // >
            //   <ConstructorElement
            //     text={elem.name}
            //     price={elem.price}
            //     thumbnail={elem.image}
            //     handleClose={() =>
            //       dispatch({
            //         type: DELETE_ITEM,
            //         uniqId: elem.uniqId,
            //       })
            //     }
            //   />
            // </div>
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
