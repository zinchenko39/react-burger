import { useRef } from 'react';
import { useDispatch } from 'react-redux';

import styles from './burger-constructor-card.module.css';
import {
  DELETE_ITEM,
  DRAG_ITEM,
} from '../../services/actions/constructor-actions';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { IBurgerConstructorCard } from '../../interfaces/IBurgerConstructorCard';

function BurgerConstructorCard({ item, index }: IBurgerConstructorCard) {
  const dispatch = useDispatch<any>();

  //D&D
  const ref = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [{ handlerId }, drop] = useDrop<any, any, any>({
    accept: 'card',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex: number = item.index;
      const hoverIndex: number = index;
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

  const [{ isDragging }, drag] = useDrag<any, any, any>({
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
