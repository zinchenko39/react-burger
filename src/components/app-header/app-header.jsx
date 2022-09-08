import React from 'react';

import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

function AppHeader() {
  return (
    <header className={styles.app_header_navigation__panel}>
      <nav className={styles.app_header_navigation__panel_container}>
        <div className={styles.app_header__links_left}>
          <div className={styles.app_header__link_active}>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default">Конструктор</p>
          </div>
          <div className={styles.app_header__link}>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default">Лента заказов</p>
          </div>
        </div>
        <div className={styles.app_header__logo}>
          <Logo />
        </div>
        <div className={styles.app_header__links_right}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default">Личный кабинет</p>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
