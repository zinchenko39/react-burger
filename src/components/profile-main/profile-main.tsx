import { useState, useRef, useEffect, ChangeEvent } from 'react';
import styles from './profile-main.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '..';
import { getUserData } from '../../services/actions/thunks/get-user';
import { updateUserData } from '../../services/actions/thunks/update-user';
import { useSelector, useDispatch } from '../../services/hooks';

export default function ProfileMain() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name);
  const userLogin = useSelector((state) => state.user.email);
  const updateUserDataError = useSelector(
    (state) => state.user.updateUserDataError
  );

  const [fieldName, setFieldName] = useState<string>(userName!);
  const [fieldLogin, setFieldLogin] = useState<string>(userLogin!);
  const [fieldPassword, setFieldPassword] = useState<string>('123456789');

  const nameRef = useRef<HTMLInputElement>(null);
  const loginRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [disabledName, setDisabledName] = useState<boolean>(true);
  const [disabledLogin, setDisabledLogin] = useState<boolean>(true);
  const [disabledPassword, setDisabledPassword] = useState<boolean>(true);

  const changeName = (): void => {
    setTimeout(() => nameRef.current!.focus(), 0);
    setDisabledName(!disabledName);
  };

  const changeLogin = (): void => {
    setTimeout(() => loginRef.current!.focus(), 0);
    setDisabledLogin(!disabledLogin);
  };
  const changePassword = (): void => {
    setTimeout(() => passwordRef.current!.focus(), 0);
    setDisabledPassword(!disabledPassword);
  };

  useEffect(() => {
    dispatch(getUserData());
    if (updateUserDataError) cancelChanges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, updateUserDataError]);

  const cancelChanges = (): void => {
    setDisabledName(true);
    setDisabledLogin(true);
    setDisabledPassword(true);
    setFieldName(userName!);
    setFieldLogin(userLogin!);
    setFieldPassword('123456789');
  };

  const sendUserData = (): void => {
    dispatch(updateUserData(fieldLogin, fieldName, fieldPassword));
    setDisabledName(true);
    setDisabledLogin(true);
    setDisabledPassword(true);
  };
  return (
    <div className={styles.profile_main__wrapper}>
      <Input
        value={fieldName}
        type={'text'}
        placeholder={'Имя'}
        icon={'EditIcon'}
        disabled={disabledName}
        onIconClick={changeName}
        ref={nameRef}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFieldName(e.target.value)
        }
      />
      <Input
        value={fieldLogin}
        type={'text'}
        placeholder={'Логин'}
        icon={'EditIcon'}
        disabled={disabledLogin}
        onIconClick={changeLogin}
        ref={loginRef}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFieldLogin(e.target.value)
        }
      />
      <Input
        value={fieldPassword}
        type={'password'}
        placeholder={'Пароль'}
        icon={'EditIcon'}
        disabled={disabledPassword}
        onIconClick={changePassword}
        ref={passwordRef}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setFieldPassword(e.target.value)
        }
      />
      {!disabledName || !disabledLogin || !disabledPassword ? (
        <div className={styles.profile_main__button_wrapper}>
          <Button
            onClick={(): void => sendUserData()}
            type="primary"
            size="small"
          >
            Сохранить
          </Button>
          <Button
            onClick={(): void => cancelChanges()}
            type="primary"
            size="small"
          >
            Отмена
          </Button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
