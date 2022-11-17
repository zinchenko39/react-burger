import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { ILocation } from '../../interfaces/ILocations';
import styles from './profile.module.css';
import { PROFILE_ORDER_CONNECT } from '../../services/actions/profile-feed-ws-actions';
import { ProfileMain, Orders } from '../../components';
import { logOut } from '../../services/actions/thunks/log-out';
import { getUserData } from '../../services/actions/thunks/get-user';
import { WSS_SERVER_URL } from '../../utils/api';
import { useDispatch, useSelector } from '../../services/hooks';

export default function Profile() {
  const location = useLocation<ILocation>();
  const dispatch = useDispatch();
  const wsConnected = useSelector((state) => state.personalFeed.connected);
  const feedLoading: boolean = useSelector(
    (state) => state.personalFeed.isLoading
  );
  const profileData = useSelector((state) => state.personalFeed.data);
  const { orders } = profileData;

  const connect = () =>
    dispatch({ type: PROFILE_ORDER_CONNECT, payload: WSS_SERVER_URL });

  useEffect(() => {
    dispatch(getUserData());
    if (wsConnected === false) connect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const userLoaded = useSelector((state) => state.user.userLoaded);
  const pathname = location.pathname;

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
      {pathname === '/profile/orders' ? (
        <div
          className={
            feedLoading
              ? styles.profile_view_orders_loading
              : styles.profile_view_orders
          }
        >
          {feedLoading ? (
            <div className={styles.profile_loading}>
              <p className="text text_type_main-medium">Загрузка...</p>
            </div>
          ) : (
            <Orders orders={orders} />
          )}
        </div>
      ) : (
        <div className={styles.profile_view_main}>
          <ProfileMain />
        </div>
      )}
    </div>
  ) : (
    <div className={styles.profile_waiting}>
      <span className="text text_type_main-medium">
        Пожалуйта подождите, загружаю данные с галактической станции...
      </span>
    </div>
  );
}
