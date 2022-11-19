import { useState, FormEvent } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import styles from './forgot-password.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '../../components';
import { BASE_URL, userRequest } from '../../utils/api';
import { FORGOT_PASSWORD_VISITED } from '../../services/actions/user-actions';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from '../../services/hooks';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { values, handleChange } = useForm({
    email: '',
  });
  const [error, setError] = useState<boolean>(false);

  const userLoggedIn = useSelector((state) => state.user.userLoggedIn);
  const userLoaded = useSelector((state) => state.user.userLoaded);

  if (!userLoaded) {
    return null;
  }

  if (userLoggedIn) {
    return <Redirect to={'/'} />;
  }

  function passwordForgotRequest(value: string): void {
    const email: { email: string } = {
      email: value,
    };
    userRequest(`${BASE_URL}/password-reset`, email)
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
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          passwordForgotRequest(values.email);
        }}
        className={styles.forgot_inputs}
      >
        <Input
          value={values.email}
          name="email"
          type={'email'}
          placeholder={'Укажите e-mail'}
          onChange={handleChange}
        />
        {error && (
          <div className={styles.forgot_error}>
            <span className="text text_type_main-medium">Ошибка</span>
          </div>
        )}
        <div className={styles.forgot_btn}>
          <Button type="primary" size="medium">
            Восстановить
          </Button>
        </div>
      </form>
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
