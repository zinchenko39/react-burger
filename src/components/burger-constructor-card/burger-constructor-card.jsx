import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styles from './burger-constructor-card.module.css';
import {
  DELETE_ITEM,
  DRAG_ITEM,
} from '../../services/actions/constructor-actions';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

function BurgerConstructorCard({ ingredient }) {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.items);

  //D&D Drag
  const [{ isDrag }, dragRef] = useDrag({
    type: 'drag',
    item: { ingredient },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const index = cart.indexOf(ingredient); //Индекс схваченного элемента
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        dispatch({
          type: DRAG_ITEM,
          currentItem: ingredient,
          index: index,
        });
      }
    },
  });

  const [, drop] = useDrop(() => ({
    accept: 'drag',
    hover(component) {
      if (component.ingredient.uniqId !== ingredient.uniqId) {
        console.log(component);
        const underIndex = cart.indexOf(component.ingredient);
        console.log(underIndex);
        dispatch({
          type: DRAG_ITEM,
          currentItem: component.ingredient,
          index: underIndex,
        });
      }
    },
  }));

  return (
    <div
      className={styles.burger_constructor_element__wrapper}
      ref={(elem) => dragRef(drop(elem))}
    >
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() =>
          dispatch({
            type: DELETE_ITEM,
            uniqId: ingredient.uniqId,
          })
        }
      />
    </div>
  );
}

export default BurgerConstructorCard;
