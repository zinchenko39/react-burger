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

const passwordForgotUrl =
  'https://norma.nomoreparties.space/api/password-reset';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState('');
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
    userRequest(passwordForgotUrl, email)
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
      <div className={styles.forgot_inputs}>
        <Input
          value={email}
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && (
          <div className={styles.forgot_error}>
            <span className="text text_type_main-medium">Ошибка</span>
          </div>
        )}
      </div>
      <div className={styles.forgot_btn}>
        <Button
          onClick={() => passwordForgotRequest(email)}
          type="primary"
          size="medium"
        >
          Восстановить
        </Button>
      </div>
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
