import {
  React,
  useEffect,
  useReducer,
  useState,
  useContext,
  useMemo,
} from 'react';

import { BurgersContext } from '../../services/burgersContext.js';

import styles from './burger-constructor.module.css';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Modal, OrderDetails } from '../index.js';
import { makeOrder } from '../../utils/api.js';

import useModalControls from '../../hooks/modal-controls';

const initialSum = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + action.price };
    case 'reset':
      return state.count;
    default:
      throw new Error(`Wrong type of action: ${action.type}`);
  }
}

function BurgerConstructor() {
  const items = useContext(BurgersContext);
  const modalControls = useModalControls();

  const [sum, dispatchSum] = useReducer(reducer, initialSum);
  const [orderId, setOrderId] = useState({ ingredients: [] });
  const [orderNumber, setOrderNumber] = useState();

  const buns = useMemo(
    () => items.filter((elem) => elem.type === 'bun'),
    [items]
  );

  const notBuns = useMemo(
    () => items.filter((elem) => elem.type !== 'bun'),
    [items]
  );

  function filterOrderId(items) {
    const arrOrderId = [];

    items.forEach((elem) => {
      arrOrderId.push(elem._id);
    });
    setOrderId({ ingredients: arrOrderId });
  }

  function sendOrder(items) {
    makeOrder(items)
      .then((res) => {
        setOrderNumber(res.order.number);
      })
      .catch((error) => {
        setOrderNumber('Ошибка');
        console.log(`Ошибка ${error.statusText}`);
      });
  }

  function calculatePrice() {
    notBuns.forEach((elem) => {
      dispatchSum({ type: 'increment', price: elem.price });
    });
    buns.forEach((elem) => {
      dispatchSum({ type: 'increment', price: elem.price });
    });
  }

  useEffect(() => {
    filterOrderId(notBuns);
    calculatePrice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  return (
    <section className={styles.burger_constructor__container}>
      {buns.map((bun) => {
        return (
          <>
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
          </>
        );
      })}
      <main className={styles.burger_constructor__main}>
        {notBuns.map((elem) => {
          return (
            <ConstructorElement
              key={`${elem._id}`}
              text={elem.name}
              price={elem.price}
              thumbnail={elem.image}
            />
          );
        })}
      </main>
      <div className={styles.burger_constructor__info}>
        <div className={styles.burger_constructor__info_price}>
          <span className="text text_type_digits-medium">{sum.count}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={() => {
            sendOrder(orderId);
            modalControls.open();
          }}
          name="order_btn"
          type="primary"
          size="large"
        >
          Оформить заказ
        </Button>
        <Modal isOpen={modalControls.isModalOpen} close={modalControls.close}>
          <OrderDetails orderNumber={orderNumber} />
        </Modal>
      </div>
    </section>
  );
}

export default BurgerConstructor;
