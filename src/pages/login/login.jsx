import React, { useEffect } from 'react';
import { Link, useHistory, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './login.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { logIn } from '../../services/actions/log-in-actions';
import { useForm } from '../../hooks/useForm';

export default function Login() {
  const location = useLocation();
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  });
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const userLoaded = useSelector((state) => state.user.userLoaded);

  const dispatch = useDispatch();

  if (userLoggedIn) {
    return <Redirect to={location?.state?.from || '/'} />;
  }
  return (
    userLoaded && (
      <>
        <div className={styles.login_title}>
          <h2 className="text text_type_main-medium">Вход</h2>
        </div>
        <form
          className={styles.login_inputs}
          onSubmit={() => dispatch(logIn(values.email, values.password))}
        >
          <Input
            value={values.email}
            type={'email'}
            name="email"
            placeholder={'E-mail'}
            onChange={handleChange}
          />
          <Input
            onChange={handleChange}
            value={values.password}
            name="password"
            type={'password'}
            placeholder={'Пароль'}
            icon={'ShowIcon'}
          />
          <div className={styles.login_btn}>
            <Button type="primary" size="medium">
              Войти
            </Button>
          </div>
        </form>
        <div className={styles.login_bottom}>
          <p>
            <span className="text text_type_main-small">
              Вы — новый пользователь?
            </span>
            <Link className="text text_type_main-small" to="/register">
              Зарегистрироваться
            </Link>
          </p>
          <p>
            <span className="text text_type_main-small">Забыли пароль?</span>
            <Link className="text text_type_main-small" to="/forgot-password">
              Восстановить пароль
            </Link>
          </p>
        </div>
      </>
    )
  );
}
