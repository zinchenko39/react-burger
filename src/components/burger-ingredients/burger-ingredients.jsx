import { React, useState, useContext, useMemo } from 'react';

import styles from './burger-ingredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgersContext } from '../../services/burgersContext.js';
import { BurgerIngredientsHeadline } from '..';

function BurgerIngredients() {
  const items = useContext(BurgersContext);

  const [current, setCurrent] = useState('one'); //@ya.praktikum/react-developer-burger-ui-components
  const [activeItem, setActiveItem] = useState({});

  const categories = ['Булки', 'Соусы', 'Начинки'];

  const buns = useMemo(
    () => items.filter((elem) => elem.type === 'bun'),
    [items]
  );

  const main = useMemo(
    () => items.filter((elem) => elem.type === 'main'),
    [items]
  );

  const sauce = useMemo(
    () => items.filter((elem) => elem.type === 'sauce'),
    [items]
  );

  const onSelectItem = (elem) => {
    setActiveItem(elem);
  };

  return (
    <section className={styles.burger_ingredients__container}>
      <div className={styles.burger_ingredients__title}>
        <h1 className="text text_type_main-medium">Соберите бургер</h1>
      </div>
      <div className={styles.burger_ingredients__tabs_list}>
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={styles.burger_ingredients__main}>
        {categories.map((elem, index) => {
          if (elem === 'Булки') {
            return (
              <BurgerIngredientsHeadline
                activeItem={activeItem}
                selectItem={onSelectItem}
                categoryName={elem}
                items={buns}
                key={`${index}_${elem}`}
              />
            );
          }
          if (elem === 'Соусы') {
            return (
              <BurgerIngredientsHeadline
                activeItem={activeItem}
                selectItem={onSelectItem}
                categoryName={elem}
                items={sauce}
                key={`${index}_${elem}`}
              />
            );
          }
          if (elem === 'Начинки') {
            return (
              <BurgerIngredientsHeadline
                activeItem={activeItem}
                selectItem={onSelectItem}
                categoryName={elem}
                items={main}
                key={`${index}_${elem}`}
              />
            );
          }
          return null;
        })}
      </div>
    </section>
  );
}

export default BurgerIngredients;
