import React from 'react';
import { Link } from 'react-router-dom';
import styles from './register.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { register } from '../../services/actions/register-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

export default function Register() {
  const { values, handleChange } = useForm({
    email: '',
    name: '',
    password: '',
  });
  // eslint-disable-next-line no-unused-vars
  const registerError = useSelector((state) => state.user.registerError);
  const dispatch = useDispatch();

  return (
    <>
      <div className={styles.register_title}>
        <h2 className="text text_type_main-medium">Регистрация</h2>
      </div>
      <form
        onSubmit={() =>
          dispatch(register(values.email, values.password, values.name))
        }
        className={styles.register_inputs}
      >
        <Input
          value={values.name}
          name="name"
          type={'text'}
          placeholder={'Имя'}
          onChange={handleChange}
        />
        <Input
          value={values.email}
          name="email"
          type={'email'}
          placeholder={'E-mail'}
          onChange={handleChange}
        />
        <Input
          value={values.password}
          name="password"
          type={'password'}
          placeholder={'Пароль'}
          icon={'ShowIcon'}
          onChange={handleChange}
        />
        <div className={styles.register_btn}>
          <Button type="primary" size="medium">
            Зарегистрироваться
          </Button>
        </div>
      </form>
      <div className={styles.register_bottom}>
        <span className="text text_type_main-small">Уже зарегистрированы?</span>
        <Link className="text text_type_main-small" to="/login">
          Войти
        </Link>
      </div>
    </>
  );
}
