import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { ProfileMain } from '../../components';

export default function Profile() {
  return (
    <div className={styles.profile_wrapper}>
      <div className={styles.profile_links}>
        <NavLink
          to="/profile"
          exact
          className={styles.profile_link}
          activeClassName={styles.profile_link__active}
        >
          <span className="text text_type_main-medium">Профиль</span>
        </NavLink>
        <NavLink
          to="/profile/orders"
          exact
          className={styles.profile_link}
          activeClassName={styles.profile_link__active}
        >
          <span className="text text_type_main-medium">История заказов</span>
        </NavLink>
        <NavLink
          to="/"
          exact
          className={styles.profile_link}
          activeClassName={styles.profile_link__active}
        >
          <span className="text text_type_main-medium">Выход</span>
        </NavLink>
        <div className={styles.profile_bottom}>
          <p className="text text_type_main-small">
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </div>
      </div>
      <div className={styles.profile_view}>
        <ProfileMain />
      </div>
    </div>
  );
}
