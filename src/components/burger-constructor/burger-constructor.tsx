import { useEffect, useReducer, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { useHistory } from 'react-router-dom';

import styles from './burger-constructor.module.css';

import { ADD_ITEM } from '../../services/actions/constructor-actions';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerConstructorCard, OrderDetails, Modal, Button } from '..';
import { sendItems } from '../../services/actions/thunks/make-order';
import useModalControls from '../../hooks/modal-controls';

import { IIngredient } from '../../interfaces/IIngredient';

const initialSum: { count: number } = { count: 0 };

function reducer(
  state: { count: number },
  action: { type: 'increment' | 'reset'; price?: number }
) {
  switch (action.type) {
    case 'increment':
      if (action.price === undefined) {
        return { count: state.count + 0 };
      } else {
        return { count: state.count + action.price };
      }
    case 'reset':
      return { count: 0 };
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor() {
  const dispatch = useDispatch<any>();
  const history = useHistory<object>();
  const cart = useSelector((state: any) => state.cart.items);
  const bun = useSelector((state: any) => state.cart.bun);
  const userLoggedIn = useSelector((state: any) => state.user.userLoggedIn);

  const modalControls: any = useModalControls();

  const [sum, dispatchSum] = useReducer(reducer, initialSum);
  const [orderId, setOrderId] = useState<any>({ ingredients: [] });

  function filterOrderId(items: IIngredient[], bun: IIngredient) {
    const arrOrderId: string[] = [];

    arrOrderId.push(bun._id);
    items.forEach((elem: any) => {
      arrOrderId.push(elem._id);
    });

    setOrderId({ ingredients: arrOrderId });
  }

  function handleOrder() {
    if (userLoggedIn) {
      dispatch(sendItems(orderId));
      modalControls.open();
    } else {
      history.replace('/login');
    }
  }

  //D&D Drop
  const [, dropContainer] = useDrop({
    accept: 'ingredient',
    drop(itemId) {
      handleDrop(itemId);
    },
  });

  function calculatePrice(items: IIngredient[], bun: IIngredient) {
    dispatchSum({
      type: 'reset',
    });
    //Claculate main, sauces
    items.forEach((elem: any) => {
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
  const elements = useSelector((state: any) => state.ingredients.menu);

  const handleDrop = (itemId: any) => {
    let ingredient;

    function compareIngredient() {
      elements.forEach((element: IIngredient) => {
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
        {cart.map((elem: IIngredient, index: number) => {
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
          onClick={handleOrder}
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
