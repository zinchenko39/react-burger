import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export default function Register() {
  const [value, setValue] = useState('');
  return (
    <>
      <div className={styles.register_title}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
      </div>
      <div className={styles.register_inputs}>
        <Input value={value} type={'text'} placeholder={'Имя'} />
        <Input value={value} type={'email'} placeholder={'E-mail'} />
        <Input
          value={value}
          type={'password'}
          placeholder={'Пароль'}
          icon={'ShowIcon'}
        />
      </div>
      <div className={styles.register_btn}>
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
      </div>
      <div className={styles.register_bottom}>
        <span className="text text_type_main-small">Уже зарегистрированы?</span>
        <Link className="text text_type_main-small" to="/login">
          Войти
        </Link>
      </div>
    </>
  );
}
