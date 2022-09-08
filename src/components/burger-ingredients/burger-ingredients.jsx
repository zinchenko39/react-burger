import React from "react";
import PropTypes from 'prop-types';

import styles from './burger-ingredients.module.css';
import stylesBurgerCard from './burger-card.module.css';

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { Tab }from '@ya.praktikum/react-developer-burger-ui-components';



function BurgerIngredientsHeadline ({categoryName, items}) {
    return (
        <div className={styles.burger_ingredients__main__category}>
        <p className="text text_type_main-medium">{categoryName}</p>
        <div className={styles.burger_ingredients__main_column}>
            {
            items.map((obj) => (
                <BurgerCard ingridient = {obj} key = {obj._id}/>
                ))
            }
            </div>
        </div>
    )
}

BurgerIngredientsHeadline.propTypes = {
    categoryName: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
}


function BurgerCard ({ingridient}) {
    return (
        <div className={stylesBurgerCard.burger_card}>
            <Counter count={1} size="default" />
            <img src={ingridient.image} className={stylesBurgerCard.burger_card__img} alt="Картинка"></img>
            <div className={stylesBurgerCard.burger_card__price}>
                <div className={stylesBurgerCard.burger_card__price_text}>
                    <div className="text text_type_digits-default">{ingridient.price}</div>
                </div>
                <CurrencyIcon type="primary" />
            </div>
            <div className={styles.burger_card__name}>
                <div className="text_type_main-default">{ingridient.name}</div>
            </div>
        </div>
    )
}

BurgerCard.propTypes = {
    ingridient: PropTypes.object.isRequired,
}



function BurgerIngredients ({items}) {
    const [current, setCurrent] = React.useState('one') //@ya.praktikum/react-developer-burger-ui-components
    
    const categories = ["Булки", "Соусы", "Начинки"];
    const buns = [], main = [], sauce = [];
    
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
                    {
                        categories.map((elem, index) => {
                            if (elem === "Булки") {
                                return (
                                    <BurgerIngredientsHeadline categoryName={elem} items ={buns} key = {`${index}_${elem}`}/>
                                )
                            }
                            if (elem === "Соусы") {
                                return (
                                    <BurgerIngredientsHeadline categoryName={elem} items ={sauce} key = {`${index}_${elem}`}/>
                                )
                            }
                            if (elem === "Начинки") {
                                return (
                                    <BurgerIngredientsHeadline categoryName={elem} items ={main} key = {`${index}_${elem}`}/>
                                )
                            }
                            return null;
                        })
                    }
                </div>
                
            </section>
    )
}

BurgerIngredients.prototype = {
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default BurgerIngredients;