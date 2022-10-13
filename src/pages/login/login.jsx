import React, { useState, useEffect } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './login.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { logIn } from '../../services/actions/log-in-actions';

export default function Login() {
  const history = useHistory();
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const userLoaded = useSelector((state) => state.user.userLoaded);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (userLoggedIn) history.replace({ pathname: '/' });
  }, [userLoggedIn]);

  if (userLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }
  return (
    userLoaded && (
      <>
        <div className={styles.login_title}>
          <h2 className="text text_type_main-medium">Вход</h2>
        </div>
        <div className={styles.login_inputs}>
          <Input
            value={email}
            type={'email'}
            placeholder={'E-mail'}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type={'password'}
            placeholder={'Пароль'}
            icon={'ShowIcon'}
          />
        </div>
        <div className={styles.login_btn}>
          <Button
            type="primary"
            size="medium"
            onClick={() => dispatch(logIn(email, password))}
          >
            Войти
          </Button>
        </div>
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
