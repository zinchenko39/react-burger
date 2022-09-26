import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';

import styles from './burger-constructor-card.module.css';
import {
  DELETE_ITEM,
  DRAG_ITEM,
} from '../../services/actions/constructor-actions';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';

function BurgerConstructorCard({ item, index }) {
  const dispatch = useDispatch();

  //D&D
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch({
        type: DRAG_ITEM,
        dragIndex: dragIndex,
        hoverIndex: hoverIndex,
      });
      item.index = hoverIndex;
    },
  });
  const id = item.id;
  const [{ isDragging }, drag] = useDrag({
    type: 'card',
    item: () => {
      return { item, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  return (
    <div
      className={
        isDragging
          ? styles.burger_constructor_element__wrapper_active
          : styles.burger_constructor_element__wrapper
      }
      ref={ref}
    >
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={() =>
          dispatch({
            type: DELETE_ITEM,
            uniqId: item.uniqId,
          })
        }
      />
    </div>
  );
}

export default BurgerConstructorCard;
