import React from "react";

import styles from './burger_constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';


function BurgerConstructor () {
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
                <ConstructorElement
                    text="Соус традиционный галактический"
                    price={30}
                    thumbnail="https://code.s3.yandex.net/react/code/sauce-03.png"
                />
                 <ConstructorElement
                    text="Мясо бессмертных моллюсков Protostomia"
                    price={1337}
                    thumbnail="https://code.s3.yandex.net/react/code/meat-02.png"
                />
                 <ConstructorElement
                    text="Плоды Фалленианского дерева"
                    price={874}
                    thumbnail="https://code.s3.yandex.net/react/code/sp_1.png"
                />
                 <ConstructorElement
                    text="Хрустящие минеральные кольца"
                    price={80}
                    thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
                />
                 <ConstructorElement
                    text="Хрустящие минеральные кольца"
                    price={80}
                    thumbnail="https://code.s3.yandex.net/react/code/mineral_rings.png"
                />
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