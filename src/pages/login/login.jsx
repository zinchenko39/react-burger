import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './login.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function Login() {
  const [value, setValue] = useState('');
  return (
    <>
      <div className={styles.login_title}>
        <h2 className="text text_type_main-medium">Вход</h2>
      </div>
      <div className={styles.login_inputs}>
        <Input value={value} type={'email'} placeholder={'E-mail'} />
        <Input
          value={value}
          type={'password'}
          placeholder={'Пароль'}
          icon={'ShowIcon'}
        />
      </div>
      <div className={styles.login_btn}>
        <Button type="primary" size="medium">
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
  );
}
