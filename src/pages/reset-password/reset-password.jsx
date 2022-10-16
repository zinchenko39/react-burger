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
import { useForm } from '../../hooks/useForm';
import { BASE_URL } from '../../utils/api.js';

export default function ResetPassword() {
  const { values, handleChange } = useForm({
    password: '',
    code: '',
  });

  const dispatch = useDispatch();
  const history = useHistory();
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
    userRequest(`${BASE_URL}}/password-reset/reset`, data)
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

      <form
        onSubmit={(e) => {
          e.preventDefault();
          passwordResetRequest(values.password, values.code);
        }}
        className={styles.reset_inputs}
      >
        <Input
          value={values.password}
          name="password"
          type={'password'}
          placeholder={'Введите новый пароль'}
          onChange={handleChange}
        />
        <Input
          value={values.code}
          name="code"
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
        />
        <div className={styles.reset_btn}>
          {error && (
            <div className={styles.reset_error}>
              <span className="text text_type_main-medium">Ошибка</span>
            </div>
          )}
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
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
