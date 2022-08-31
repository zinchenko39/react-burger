import React from "react";


import '../css/app-header.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';


function AppHeader () {
    return (
        <header className="app-header_navigation__panel">
            <div className="app-header_navigation__panel-container">
                <div className="app-header__links-left">
                    <div className="app-header__link app-header__link-active">
                        <BurgerIcon type="primary"/>
                        <p className="text text_type_main-default">Конструктор</p>
                    </div>
                    <div className="app-header__link">
                        <ListIcon type="secondary"/>
                        <p className="text text_type_main-default">Лента заказов</p>
                    </div>
                </div>
                    <div className="app-header__logo">
                        <Logo/>
                    </div>
                    <div className="app-header__link app-header__links-right">
                        <ProfileIcon type="secondary"/>
                        <p className="text text_type_main-default">Личный кабинет</p>
                    </div>
            </div>
            
        </header>
    )
}

export default AppHeader;