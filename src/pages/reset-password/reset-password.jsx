import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './reset-password.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { passwordResetRequest, registerRequest } from '../../utils/api.js';

export default function ResetPassword() {
  const [passwordValue, setPasswordValue] = useState('');
  const [codeValue, setCodeValue] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const history = useHistory();

  function passwordReset(password, code) {
    const data = {
      password: password,
      token: code,
    };
    passwordResetRequest(data)
      .then((res) => {
        if (res && res.success) {
          if (res.success) {
            setSuccess(true);
            setTimeout(history.replace({ pathname: '/login' }), 5000);
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
        {success && (
          <div className={styles.reset_error}>
            <span className="text text_type_main-medium">
              Пароль успешно обновлён.
            </span>
          </div>
        )}
        {error && (
          <div className={styles.reset_error}>
            <span className="text text_type_main-medium">Ошибка</span>
          </div>
        )}
        <Button
          onClick={() => passwordReset(passwordValue, codeValue)}
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
