import { forwardRef } from 'react';
import styles from '../burger-ingredients.module.css';
import { BurgerIngredientCard } from '../../index';

import { IBurgerIngredientsHeadline } from '../../../interfaces/IBurgerIngredientsHeadline';

const BurgerIngredientsHeadline = forwardRef(
  ({ items, categoryName, type }: IBurgerIngredientsHeadline, ref: any) => {
    return (
      <div
        ref={ref}
        className={styles.burger_ingredients__main__category}
        id={type}
      >
        <p className="text text_type_main-medium">{categoryName}</p>
        <div className={styles.burger_ingredients__main_column}>
          {items.map((obj) => (
            <BurgerIngredientCard ingredient={obj} key={`${obj._id}`} />
          ))}
        </div>
      </div>
    );
  }
);

export default BurgerIngredientsHeadline;
