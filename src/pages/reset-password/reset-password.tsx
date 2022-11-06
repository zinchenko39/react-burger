import { useState, FormEvent } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styles from './reset-password.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '../../components';
import { IData } from '../../interfaces/IData';
import { BASE_URL, userRequest } from '../../utils/api';
import { RESET_PASSWORD } from '../../services/actions/reset-password-actions';
import { useForm } from '../../hooks/useForm';

export default function ResetPassword() {
  const { values, handleChange } = useForm({
    password: '',
    code: '',
  });

  const dispatch = useDispatch<any>();
  const history = useHistory<any>();
  const [error, setError] = useState<boolean>(false);

  const forgotPasswordVisited = useSelector(
    (state: any) => state.user.forgotPasswordVisited
  );
  const userLoggedIn = useSelector((state: any) => state.user.userLoggedIn);
  const userLoaded = useSelector((state: any) => state.user.userLoaded);

  if (!userLoaded) {
    return null;
  }

  if (userLoggedIn) {
    return <Redirect to={'/'} />;
  }

  if (forgotPasswordVisited === false) {
    return <Redirect to={'/forgot-password'} />;
  }

  function passwordResetRequest(password: string, code: string): void {
    const data: IData = {
      password: password,
      token: code,
    };
    userRequest(`${BASE_URL}}/password-reset/reset`, data)
      .then((res) => {
        if (res && res.success) {
          if (res.success) {
            dispatch({
              type: RESET_PASSWORD,
            });
            history.replace({ pathname: '/login' });
          }
        }
      })
      .catch((error) => {
        console.log('passwordResetError', error);
        setError(true);
      });
  }

  return (
    <>
      <div className={styles.reset_title}>
        <h2 className="text text_type_main-medium">Восстановление пароля</h2>
      </div>

      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          passwordResetRequest(values.password, values.code);
        }}
        className={styles.reset_inputs}
      >
        <Input
          value={values.password}
          name="password"
          type={'password'}
          placeholder={'Введите новый пароль'}
          onChange={handleChange}
        />
        <Input
          value={values.code}
          name="code"
          type={'text'}
          placeholder={'Введите код из письма'}
          onChange={handleChange}
        />
        <div className={styles.reset_btn}>
          {error && (
            <div className={styles.reset_error}>
              <span className="text text_type_main-medium">Ошибка</span>
            </div>
          )}
          <Button type="primary" size="medium">
            Сохранить
          </Button>
        </div>
      </form>
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
