import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile.module.css';
import { useDispatch } from 'react-redux';
import { ProfileMain } from '../../components';
import { logOut } from '../../services/actions/user-actions.js';
import { getUserData } from '../../services/actions/user-actions.js';

export default function Profile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
  }, []);

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
          <span
            onClick={() => dispatch(logOut())}
            className="text text_type_main-medium"
          >
            Выход
          </span>
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
