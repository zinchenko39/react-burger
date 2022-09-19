import React from 'react';
import PropTypes from 'prop-types';

import styles from '../burger-ingredients.module.css';
import { BurgerIngredientCard } from '../../index.js';

function BurgerIngredientsHeadline({
  categoryName,
  items,
  selectItem,
  activeItem,
}) {
  return (
    <div className={styles.burger_ingredients__main__category}>
      <p className="text text_type_main-medium">{categoryName}</p>
      <div className={styles.burger_ingredients__main_column}>
        {items.map((obj) => (
          <BurgerIngredientCard
            activeItem={activeItem}
            selectItem={selectItem}
            ingridient={obj}
            key={`${obj._id}`}
          />
        ))}
      </div>
    </div>
  );
}

BurgerIngredientsHeadline.propTypes = {
  categoryName: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectItem: PropTypes.func.isRequired,
  activeItem: PropTypes.object.isRequired,
};

export default BurgerIngredientsHeadline;
