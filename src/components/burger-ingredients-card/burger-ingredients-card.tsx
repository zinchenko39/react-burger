import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import stylesBurgerCard from './burger-ingredients-card.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import { IBurgerIngredientCard } from '../../interfaces/IBurgerIngredientCard';
import { ILocation } from '../../interfaces/ILocations';
import { IIngredient } from '../../interfaces/IIngredient';

import { useLocation, Link } from 'react-router-dom';

function BurgerIngredientCard({ ingredient }: IBurgerIngredientCard) {
  const location = useLocation() as ILocation;

  const [ingredientsQuantity, setIngredientsQuantity] = useState<number>(0);
  const [bunQuantity, setBunQuantity] = useState<number>(0);

  const cart = useSelector((state: any) => state.cart.items);
  const bun = useSelector((state: any) => state.cart.bun);

  //D&D
  const id: any = ingredient._id;
  const [{ isDrag }, dragRef] = useDrag<any, any, any>({
    type: 'ingredient',
    item: { id },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  const calculateQuantity = (item: IIngredient) => {
    const ingredientsArray = cart.filter(
      (elem: IIngredient) => elem._id === item._id
    );
    if (bun._id === item._id) {
      setBunQuantity(1);
    } else {
      setBunQuantity(0);
    }
    setIngredientsQuantity(ingredientsArray.length);
  };

  useEffect(() => {
    calculateQuantity(ingredient);
  });

  return (
    <div className={stylesBurgerCard.burger_card_wrapper}>
      {!isDrag && (
        <Link
          to={{
            pathname: `/ingredients/${ingredient._id}`,
            state: { background: location },
          }}
          className="undecorated-link"
        >
          <div className={stylesBurgerCard.burger_card} ref={dragRef}>
            {ingredient.type === 'bun' && bunQuantity ? (
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
              src={ingredient.image}
              className={stylesBurgerCard.burger_card__img}
              alt="Картинка"
            ></img>
            <div className={stylesBurgerCard.burger_card__price}>
              <div className={stylesBurgerCard.burger_card__price_text}>
                <div className="text text_type_digits-default">
                  {ingredient.price}
                </div>
              </div>
              <CurrencyIcon type="primary" />
            </div>
            <div className={stylesBurgerCard.burger_card__name}>
              <div className="text_type_main-default">{ingredient.name}</div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default BurgerIngredientCard;
