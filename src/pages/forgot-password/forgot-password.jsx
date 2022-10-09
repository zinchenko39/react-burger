import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './forgot-password.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function ForgotPassword() {
  const [value, setValue] = useState('');
  return (
    <>
      <div className={styles.forgot_title}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      </div>
      <div className={styles.forgot_inputs}>
        <Input value={value} type={'email'} placeholder={'Укажите e-mail'} />
      </div>
      <div className={styles.forgot_btn}>
        <Button type="primary" size="medium">
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
