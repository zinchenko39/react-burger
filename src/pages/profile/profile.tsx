import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import styles from './profile.module.css';

import { ProfileMain } from '../../components';
import { logOut } from '../../services/actions/thunks/log-out';
import { getUserData } from '../../services/actions/thunks/get-user';

export default function Profile() {
  const dispatch = useDispatch<any>();
  useEffect(() => {
    dispatch(getUserData());
  }, [dispatch]);

  const userLoaded = useSelector((state: any) => state.user.userLoaded);

  return userLoaded ? (
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
        <div className={styles.profile_log_out__btn}>
          <span
            onClick={(): void => dispatch(logOut())}
            className="text text_type_main-medium"
          >
            Выход
          </span>
        </div>
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
  ) : (
    <div className={styles.profile_waiting}>
      <span className="text text_type_main-medium">
        Пожалуйта подождите, загружаю данные с галактической станции...
      </span>
    </div>
  );
}
