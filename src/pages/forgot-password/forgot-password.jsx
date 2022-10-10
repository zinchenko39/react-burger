import React, { useState, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './forgot-password.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { passwordForgotRequest } from '../../utils/api.js';

export default function ForgotPassword() {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const history = useHistory();

  const forgotInputs = useRef(null);

  function passwordForgot(value) {
    const email = {
      email: value,
    };
    passwordForgotRequest(email)
      .then((res) => {
        if (res && res.success) {
          if (res.success) {
            setTimeout(history.replace({ pathname: '/reset-password' }), 2000);
          }
        }
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });
  }

  return (
    <>
      <div className={styles.forgot_title}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      </div>
      <div ref={forgotInputs} className={styles.forgot_inputs}>
        <Input
          value={value}
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={(e) => setValue(e.target.value)}
        />
        {error && (
          <div className={styles.forgot_error}>
            <span className="text text_type_main-medium">Ошибка</span>
          </div>
        )}
      </div>
      <div className={styles.forgot_btn}>
        <Button
          onClick={() => passwordForgot(value)}
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
