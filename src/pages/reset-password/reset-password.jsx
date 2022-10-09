import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './reset-password.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function ResetPassword() {
  const [value, setValue] = useState('');
  return (
    <>
      <div className={styles.reset_title}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      </div>
      <div className={styles.reset_inputs}>
        <Input
          value={value}
          type={'email'}
          placeholder={'Введите новый пароль'}
        />
        <Input
          value={value}
          type={'text'}
          placeholder={'Введите код из письма'}
        />
      </div>
      <div className={styles.reset_btn}>
        <Button type="primary" size="medium">
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
