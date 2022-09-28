import { React, useState, useMemo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import styles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

import { BurgerIngredientsHeadline } from '..';

function BurgerIngredients() {
  const items = useSelector((state) => state.ingredients.menu);

  const [currentTab, setCurrentTab] = useState('buns'); //@ya.praktikum/react-developer-burger-ui-components

  const categories = ['Булки', 'Соусы', 'Начинки'];

  const bunRef = useRef(null);
  const mainRef = useRef(null);
  const sauceRef = useRef(null);

  useEffect(() => {
    const options = {
      rootMargin: '-50% 0px -50%',
    };
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentTab(entry.target.id);
        }
      });
    }, options);

    //Целевой элемент, который наблюдается
    observer.observe(bunRef.current);
    observer.observe(sauceRef.current);
    observer.observe(mainRef.current);
  }, [mainRef, sauceRef, bunRef]);

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

  return (
    <section className={styles.burger_ingredients__container}>
      <div className={styles.burger_ingredients__title}>
        <h1 className="text text_type_main-medium">Соберите бургер</h1>
      </div>
      <div className={styles.burger_ingredients__tabs_list}>
        <Tab value="one" active={currentTab === 'buns'} onClick={setCurrentTab}>
          Булки
        </Tab>
        <Tab value="two" active={currentTab === 'sauce'}>
          Соусы
        </Tab>
        <Tab
          value="three"
          active={currentTab === 'main'}
          onClick={setCurrentTab}
        >
          Начинки
        </Tab>
      </div>
      <div className={styles.burger_ingredients__main}>
        {categories.map((elem, index) => {
          if (elem === 'Булки') {
            return (
              <BurgerIngredientsHeadline
                categoryName={elem}
                items={buns}
                key={`${index}_${elem}`}
                ref={bunRef}
                type={'buns'}
              />
            );
          }
          if (elem === 'Соусы') {
            return (
              <BurgerIngredientsHeadline
                categoryName={elem}
                items={sauce}
                key={`${index}_${elem}`}
                ref={sauceRef}
                type={'sauce'}
              />
            );
          }
          if (elem === 'Начинки') {
            return (
              <BurgerIngredientsHeadline
                categoryName={elem}
                items={main}
                key={`${index}_${elem}`}
                ref={mainRef}
                type={'main'}
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
