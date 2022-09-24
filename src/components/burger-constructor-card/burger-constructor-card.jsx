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

  const findIndex = (elem) => {
    const item = cart.filter((e) => e.uniqId === elem.uniqId)[0];
    const index = cart.indexOf(item);
    return index;
  };

  //D&D Drag
  const [{ isDrag }, dragRef] = useDrag(
    {
      type: 'drag',
      item: { ingredient },
      collect: (monitor) => ({
        isDrag: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const didDrop = monitor.didDrop();
        if (!didDrop) {
          //Когда бросили срабатывает
          // const index = findIndex(item.ingredient); //Индекс на который навели
          // dispatch({
          //   type: DRAG_ITEM,
          //   currentItem: item.ingredient,
          //   index: index,
          // });
        }
      },
    }
    // [currentDragingItem, dragingItemIndex]
  );
  const [, drop] = useDrop(
    () => ({
      accept: 'drag',
      hover(currentItem) {
        // console.log(currentItem); // То, что я навожу
        // console.log(ingredient); //На что я навожу

        // if (currentItem.ingredient.uniqId !== ingredient.uniqId) {
        const draggingIndex = findIndex(currentItem);
        const underIndex = findIndex(ingredient);
        dispatch({
          type: DRAG_ITEM,
          dragginItem: currentItem.ingredient,
          underItem: ingredient,
          dragginIndex: draggingIndex,
          underIndex: underIndex,
        });
        // }
      },
    })
    // [findIndex]
  );

  return (
    !isDrag && (
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
    )
  );
}

export default BurgerConstructorCard;
