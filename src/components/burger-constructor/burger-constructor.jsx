import React from "react";

import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';


function BurgerConstructor () {
    const order = [{
        "_id":"60666c42cc7b410027a1a9b6",
        "name":"Биокотлета из марсианской Магнолии",
        "type":"main",
        "proteins":420,
        "fat":142,
        "carbohydrates":242,
        "calories":4242,
        "price":424,
        "image":"https://code.s3.yandex.net/react/code/meat-01.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
        "__v":0
        },
        {
        "_id":"60666c42cc7b410027a1a9b7",
        "name":"Соус Spicy-X",
        "type":"sauce",
        "proteins":30,
        "fat":20,
        "carbohydrates":40,
        "calories":30,
        "price":90,
        "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
        "__v":0
        },
        {
        "_id":"60666c42cc7b410027a1a9b4",
        "name":"Мясо бессмертных моллюсков Protostomia",
        "type":"main",
        "proteins":433,
        "fat":244,
        "carbohydrates":33,
        "calories":420,
        "price":1337,
        "image":"https://code.s3.yandex.net/react/code/meat-02.png",
        "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
        "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
        "__v":0
        },
        {
            "_id":"60666c42cc7b410027a1a9b4",
            "name":"Мясо бессмертных моллюсков Protostomia",
            "type":"main",
            "proteins":433,
            "fat":244,
            "carbohydrates":33,
            "calories":420,
            "price":1337,
            "image":"https://code.s3.yandex.net/react/code/meat-02.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
            "__v":0
         },
         {
            "_id":"60666c42cc7b410027a1a9b9",
            "name":"Соус традиционный галактический",
            "type":"sauce",
            "proteins":42,
            "fat":24,
            "carbohydrates":42,
            "calories":99,
            "price":15,
            "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
            "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
            "__v":0
         },
    ]



    return (
        <section className={styles.burger_constructor__container}>
            <div className={styles.burger_constructor__top}>
                    <ConstructorElement
                        type="top"
                        isLocked={true}
                        text="Краторная булка N-200i (верх)"
                        price={20}
                        thumbnail= "https://code.s3.yandex.net/react/code/bun-02.png"
                    />
            </div>
            <main className={styles.burger_constructor__main}>
                {
                    order.map (elem => {
                        return (
                            <ConstructorElement
                            text = {elem.name}
                            price = {elem.price}
                            thumbnail = {elem.image}
                        />
                        )
                    })
                }
            </main>
            <div className={styles.burger_constructor__bottom}>
                    <ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text="Краторная булка N-200i (низ)"
                        price={200}
                        thumbnail="https://code.s3.yandex.net/react/code/bun-02.png"
                    />
            </div>
            <div className={styles.burger_constructor__info}>
                <div className={styles.burger_constructor__info_price}>
                    <span className="text text_type_digits-medium">610</span>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    )
}
export default BurgerConstructor;