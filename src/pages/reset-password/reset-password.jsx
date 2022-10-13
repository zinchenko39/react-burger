import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './reset-password.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { userRequest } from '../../utils/api.js';
import { RESET_PASSWORD } from '../../services/actions/reset-password-actions';

const passwordResetUrl =
  'https://norma.nomoreparties.space/api/password-reset/reset';

export default function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [passwordValue, setPasswordValue] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [error, setError] = useState(false);
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const forgotPasswordVisited = useSelector(
    (state) => state.user.forgotPasswordVisited
  );

  if (userLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }
  if (forgotPasswordVisited === false) {
    return (
      <Redirect
        to={{
          pathname: '/forgot-password',
        }}
      />
    );
  }

  function passwordResetRequest(password, code) {
    const data = {
      password: password,
      token: code,
    };
    userRequest(passwordResetUrl, data)
      .then((res) => {
        if (res && res.success) {
          if (res.success) {
            dispatch({
              type: RESET_PASSWORD,
            });
            history.replace({ pathname: '/login' });
          }
        }
      })
      .catch((error) => {
        console.log('passwordResetError', error);
        setError(true);
      });
  }

  return (
    <>
      <div className={styles.reset_title}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      </div>
      <div className={styles.reset_inputs}>
        <Input
          value={passwordValue}
          type={'email'}
          placeholder={'Введите новый пароль'}
          onChange={(e) => setPasswordValue(e.target.value)}
        />
        <Input
          value={codeValue}
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={(e) => setCodeValue(e.target.value)}
        />
      </div>
      <div className={styles.reset_btn}>
        {error && (
          <div className={styles.reset_error}>
            <span className="text text_type_main-medium">Ошибка</span>
          </div>
        )}
        <Button
          onClick={() => passwordResetRequest(passwordValue, codeValue)}
          type="primary"
          size="medium"
        >
          Сохранить
        </Button>
      </div>
      <div className={styles.reset_bottom}>
        <p>
          <span className="text text_type_main-small">Вспомнили пароль?</span>
          <Link className="text text_type_main-small" to="/login">
            Войти
          </Link>
        </p>
      </div>
    </>
  );
}
