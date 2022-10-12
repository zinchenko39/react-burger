import React, { useEffect } from 'react';

import styles from './app-header.module.css';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { node } from 'prop-types';

function AppHeader() {
  const history = useHistory();
  const location = useLocation();

  return (
    <header className={styles.app_header_navigation__panel}>
      <nav className={styles.app_header_navigation__panel_container}>
        <div className={styles.app_header__links_left}>
          <div className={styles.app_header__link}>
            <BurgerIcon
              type={location.pathname === '/' ? 'primary' : 'secondary'}
            />
            <NavLink
              to="/"
              exact
              className={styles.app_header__nav_link}
              activeClassName={styles.app_header__nav_link_active}
            >
              <p className="text text_type_main-default">Конструктор</p>
            </NavLink>
          </div>
          <div className={styles.app_header__link}>
            <ListIcon
              type={location.pathname === '/history' ? 'primary' : 'secondary'}
            />
            <NavLink
              to="/history"
              exact
              className={styles.app_header__nav_link}
              activeClassName={styles.app_header__nav_link_active}
            >
              <p className="text text_type_main-default">Лента заказов</p>
            </NavLink>
          </div>
        </div>
        <div className={styles.app_header__logo}>
          <Logo />
        </div>
        <div className={styles.app_header__links_right}>
          <ProfileIcon
            type={location.pathname === '/profile' ? 'primary' : 'secondary'}
          />
          <NavLink
            to="/profile"
            exact
            className={styles.app_header__nav_link}
            activeClassName={styles.app_header__nav_link_active}
          >
            <p className="text text_type_main-default">Личный кабинет</p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
