import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './profile-main.module.css';
import {
  Input,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getUserData } from '../../services/actions/get-user-actions.js';
import { updateUserData } from '../../services/actions/update-user-actions';

export default function ProfileMain() {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name);
  const userLogin = useSelector((state) => state.user.email);
  const updateUserDataError = useSelector(
    (state) => state.user.updateUserDataError
  );

  const [fieldName, setFieldName] = useState(userName);
  const [fieldLogin, setFieldLogin] = useState(userLogin);
  const [fieldPassword, setFieldPassword] = useState('111111');

  const nameRef = useRef(null);
  const loginRef = useRef(null);
  const passwordRef = useRef(null);

  const [disabledName, setDisabledName] = useState(true);
  const [disabledLogin, setDisabledLogin] = useState(true);
  const [disabledPassword, setDisabledPassword] = useState(true);

  const [iconName, setIconName] = useState('EditIcon');
  const [iconLogin, setIconLogin] = useState('EditIcon');
  const [iconPassword, setIconPassword] = useState('EditIcon');

  const changeName = () => {
    setTimeout(() => nameRef.current.focus(), 0);
    setDisabledName(!disabledName);
    setIconName(iconName === 'EditIcon' ? 'CheckMarkIcon' : 'EditIcon');
    if (disabledName === false) dispatch(updateUserData(fieldLogin, fieldName));
  };
  const changeLogin = () => {
    setTimeout(() => loginRef.current.focus(), 0);
    setDisabledLogin(!disabledLogin);
    setIconLogin(iconLogin === 'EditIcon' ? 'CheckMarkIcon' : 'EditIcon');
    if (disabledLogin === false)
      dispatch(updateUserData(fieldLogin, fieldName));
  };
  const changePassword = () => {
    setTimeout(() => passwordRef.current.focus(), 0);
    setDisabledPassword(!disabledPassword);
    setIconPassword(iconPassword === 'EditIcon' ? 'CheckMarkIcon' : 'EditIcon');
  };

  useEffect(() => {
    dispatch(getUserData());
    if (updateUserDataError) cancelChanges();
  }, [dispatch, updateUserDataError]);

  const cancelChanges = () => {
    setIconName('EditIcon');
    setIconLogin('EditIcon');
    setIconPassword('EditIcon');
    setDisabledName(true);
    setDisabledLogin(true);
    setDisabledPassword(true);
    setFieldName(userName);
    setFieldLogin(userLogin);
    setFieldPassword('111111');
  };

  return (
    <div className={styles.profile_main__wrapper}>
      <Input
        value={fieldName}
        type={'text'}
        placeholder={'Имя'}
        icon={iconName}
        disabled={disabledName}
        onIconClick={changeName}
        ref={nameRef}
        onChange={(e) => setFieldName(e.target.value)}
      />
      <Input
        value={fieldLogin}
        type={'text'}
        placeholder={'Логин'}
        icon={iconLogin}
        disabled={disabledLogin}
        onIconClick={changeLogin}
        ref={loginRef}
        onChange={(e) => setFieldLogin(e.target.value)}
      />
      <Input
        value={fieldPassword}
        type={'password'}
        placeholder={'Пароль'}
        icon={iconPassword}
        disabled={disabledPassword}
        onIconClick={changePassword}
        ref={passwordRef}
        onChange={(e) => setFieldPassword(e.target.value)}
      />
      {!disabledName || !disabledLogin || !disabledPassword ? (
        <Button onClick={() => cancelChanges()} type="primary" size="small">
          Отмена
        </Button>
      ) : (
        ''
      )}
    </div>
  );
}
