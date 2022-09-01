/* eslint-disable no-useless-constructor */
import React from "react";
import '../css/components/burger-ingredients.css';
import '../css/components/burger-card.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const buns = [], main = [], sauce = [];

function BurgerIngredientsHeadline ({categoryName, items}) {
    return (
        <div className="burger-ingredients__main__category">
        <p className="text text_type_main-medium">{categoryName}</p>
        <div className="burger-ingredients__main_column">
            {
            items.map((obj, index) => (
                <BurgerCard image = {obj.image} price = {obj.price} name = {obj.name} key = {`${index}_${obj.name}`}/>
                ))
            }
            </div>
        </div>
    )
}

function BurgerCard ({image, price, name, keys}) {
    return (
        <div key={keys} className="burger-card">
            <Counter count={1} size="default" />
            <img src={image} className="burger-card__img" alt="Картинка"></img>
            <div className="burger-card__price">
                <div className="burger-card__price_text text text_type_digits-default">{price}</div>
                <CurrencyIcon type="primary" />
            </div>
            <div className="burger-card__name text text_type_main-default">{name}</div>
        </div>
    )
}



function BurgerIngredients ({items}) {
    
    items.forEach(elem => {
        if (elem.type === 'bun') {
            buns.push(elem);
        } else if (elem.type === 'main') {
            main.push(elem);
        } else {
            sauce.push(elem);
        }
    });


    return (
        <section className="burger-ingredients__container">
                <div className="burger-ingredients__title">
                    <h1 className="text text_type_main-medium">Соберите бургер</h1>
                </div>
                <ul className="burger-ingredients__tabs_list">
                    <li className="burger-ingredients__tab burger-ingredients__tab_active text text_type_main-default">Булки</li>
                    <li className="burger-ingredients__tab text text_type_main-default">Соусы</li>
                    <li className="burger-ingredients__tab text text_type_main-default">Начинки</li>
                </ul>
                <div className="burger-ingredients__main">
                    <BurgerIngredientsHeadline categoryName={"Булки"} items ={buns}/>
                    <BurgerIngredientsHeadline categoryName={"Соусы"} items ={sauce}/>
                    <BurgerIngredientsHeadline categoryName={"Основное"} items ={main}/>
                </div>
                
            </section>
    )
}

export default BurgerIngredients;