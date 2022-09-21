import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import stylesBurgerCard from './burger-ingredients-card.module.css';
import { OPEN_CURRENT_ITEM_DETAILS } from '../../services/actions/ingridient-details-action.js';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import { Modal, IngridientDetails } from '../index.js';
import useModalControls from '../../hooks/modal-controls';

function BurgerIngredientCard({ ingridient }) {
  const modalControls = useModalControls();
  const dispatch = useDispatch();

  const activeItem = useSelector(
    (state) => state.currentIngredient.currentItem
  );

  return (
    <div className={stylesBurgerCard.burger_card_wrapper}>
      <div
        onClick={() => {
          dispatch({
            type: OPEN_CURRENT_ITEM_DETAILS,
            item: ingridient,
          });
          modalControls.open();
        }}
        name="burger_card"
        className={stylesBurgerCard.burger_card}
      >
        <Counter count={1} size="default" />
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
