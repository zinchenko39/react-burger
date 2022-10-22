import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import styles from '../burger-ingredients.module.css';
import { BurgerIngredientCard } from '../../index.js';

const BurgerIngredientsHeadline = forwardRef(
  ({ items, categoryName, type }, ref) => {
    return (
      <div
        ref={ref}
        className={styles.burger_ingredients__main__category}
        id={type}
      >
        <p className="text text_type_main-medium">{categoryName}</p>
        <div className={styles.burger_ingredients__main_column}>
          {items.map((obj) => (
            <BurgerIngredientCard ingridient={obj} key={`${obj._id}`} />
          ))}
        </div>
      </div>
    );
  }
);

BurgerIngredientsHeadline.propTypes = {
  categoryName: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerIngredientsHeadline;
