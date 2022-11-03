import { useState, useMemo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import styles from './burger-ingredients.module.css';
import { IIngredient } from '../../interfaces/IIngredient';
import { BurgerIngredientsHeadline, Tab } from '..';

function BurgerIngredients() {
  const items = useSelector((state: any) => state.ingredients.menu);

  const [currentTab, setCurrentTab] = useState<string>('buns'); //@ya.praktikum/react-developer-burger-ui-components

  const categories: string[] = ['Булки', 'Соусы', 'Начинки'];

  const bunRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const sauceRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const options: { rootMargin: string } = {
      rootMargin: '-50% 0px -50%',
    };
    let observer = new IntersectionObserver((entries) => {
      entries.forEach((entry: any) => {
        if (entry.isIntersecting) {
          setCurrentTab(entry.target.id);
        }
      });
    }, options);

    //Целевой элемент, который наблюдается
    observer.observe(bunRef.current!);
    observer.observe(sauceRef.current!);
    observer.observe(mainRef.current!);
  }, [mainRef, sauceRef, bunRef]);

  const buns: IIngredient[] = useMemo(
    () => items.filter((elem: IIngredient) => elem.type === 'bun'),
    [items]
  );

  const main: IIngredient[] = useMemo(
    () => items.filter((elem: IIngredient) => elem.type === 'main'),
    [items]
  );

  const sauce: IIngredient[] = useMemo(
    () => items.filter((elem: IIngredient) => elem.type === 'sauce'),
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
        <Tab
          onClick={setCurrentTab}
          value="two"
          active={currentTab === 'sauce'}
        >
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
