import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import stylesBurgerCard from './burger-ingredients-card.module.css';

import { OPEN_CURRENT_ITEM_DETAILS } from '../../services/actions/ingridient-details-action.js';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import { Modal, IngridientDetails } from '../index.js';
import useModalControls from '../../hooks/modal-controls';
import { Link, useHistory, Redirect } from 'react-router-dom';

function BurgerIngredientCard({ ingridient }) {
  const history = useHistory();
  const modalControls = useModalControls();
  const dispatch = useDispatch();

  const [ingredientsQuantity, setIngredientsQuantity] = useState(0);
  const [bunQuantity, setBunQuantity] = useState(0);

  const activeItem = useSelector(
    (state) => state.currentIngredient.currentItem
  );
  const cart = useSelector((state) => state.cart.items);
  const bun = useSelector((state) => state.cart.bun);

  //D&D
  const id = ingridient._id;
  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: { id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const calculateQuantity = (item) => {
    const ingredientsArray = cart.filter((elem) => elem._id === item._id);
    if (bun._id === item._id) {
      setBunQuantity(1);
    } else {
      setBunQuantity(0);
    }
    setIngredientsQuantity(ingredientsArray.length);
  };

  useEffect(() => {
    calculateQuantity(ingridient);
  });

  return (
    <div className={stylesBurgerCard.burger_card_wrapper}>
      {!isDrag && (
        <div
          onClick={() => {
            dispatch({
              type: OPEN_CURRENT_ITEM_DETAILS,
              item: ingridient,
            });
            history.push(`/ingredients/${ingridient._id}`);
            modalControls.open();
          }}
          name="burger_card"
          className={stylesBurgerCard.burger_card}
          ref={dragRef}
        >
          {ingridient.type === 'bun' && bunQuantity ? (
            <Counter count={bunQuantity} size="default" />
          ) : (
            ''
          )}
          {ingredientsQuantity ? (
            <Counter count={ingredientsQuantity} size="default" />
          ) : (
            ''
          )}
          <img
            src={ingridient.image}
            className={stylesBurgerCard.burger_card__img}
            alt="Картинка"
          ></img>
          <div className={stylesBurgerCard.burger_card__price}>
            <div className={stylesBurgerCard.burger_card__price_text}>
              <div className="text text_type_digits-default">
                {ingridient.price}
              </div>
            </div>
            <CurrencyIcon type="primary" />
          </div>
          <div className={stylesBurgerCard.burger_card__name}>
            <div className="text_type_main-default">{ingridient.name}</div>
          </div>
        </div>
      )}
      <Modal isOpen={modalControls.isModalOpen} close={modalControls.close}>
        <IngridientDetails item={activeItem} />
      </Modal>
    </div>
  );
}

BurgerIngredientCard.propTypes = {
  ingridient: PropTypes.object.isRequired,
};

export default BurgerIngredientCard;
