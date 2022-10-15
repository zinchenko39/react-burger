import React, { useState } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './forgot-password.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { userRequest } from '../../utils/api.js';
import { FORGOT_PASSWORD_VISITED } from '../../services/actions/forgot-password-actions';
import { useForm } from '../../hooks/useForm';
import { baseUrl } from '../../utils/api.js';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { values, handleChange } = useForm({
    email: '',
  });
  const [error, setError] = useState(false);
  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);

  if (userLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: '/',
        }}
      />
    );
  }

  function passwordForgotRequest(value) {
    const email = {
      email: value,
    };
    userRequest(`${baseUrl}/password-reset`, email)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: FORGOT_PASSWORD_VISITED,
          });
          history.replace({ pathname: '/reset-password' });
        }
      })
      .catch((error) => {
        console.log('forgotPasswordError', error);
        setError(true);
      });
  }

  return (
    <>
      <div className={styles.forgot_title}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          passwordForgotRequest(values.email);
        }}
        className={styles.forgot_inputs}
      >
        <Input
          value={values.email}
          name="email"
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={handleChange}
        />
        {error && (
          <div className={styles.forgot_error}>
            <span className="text text_type_main-medium">Ошибка</span>
          </div>
        )}
        <div className={styles.forgot_btn}>
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </div>
      </form>
      <div className={styles.forgot_bottom}>
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
