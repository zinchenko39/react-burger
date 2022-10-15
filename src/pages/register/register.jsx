import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/register-actions';
import { useDispatch, useSelector } from 'react-redux';

export default function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  // eslint-disable-next-line no-unused-vars
  const registerError = useSelector((state) => state.user.registerError);
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.register_title}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
      </div>
      <div className={styles.register_inputs}>
        <Input
          value={name}
          type={'text'}
          placeholder={'Имя'}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          value={email}
          type={'email'}
          placeholder={'E-mail'}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          value={password}
          type={'password'}
          placeholder={'Пароль'}
          icon={'ShowIcon'}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.register_btn}>
        <Button
          onClick={() => dispatch(register(email, password, name))}
          type="primary"
          size="medium"
        >
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
