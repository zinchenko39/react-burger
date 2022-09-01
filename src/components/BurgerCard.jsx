import React from "react";
import '../css/burger-card.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerCard ({image, price, name, keys}) {
    return (
        <div key={keys} className="burger-card">
            <img src={image} className="burger-card__img" alt="Картинка"></img>
            <div className="burger-card__price">
                <div className="burger-card__price_text text text_type_digits-default">{price}</div>
                <CurrencyIcon type="primary" />
            </div>
            <div className="burger-card__name text text_type_main-default">{name}</div>
        </div>
    )
}

export default BurgerCard;