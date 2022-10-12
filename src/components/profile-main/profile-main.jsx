import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './profile-main.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ProfileMain() {
  const login = useSelector((state) => state.user.email);
  const name = useSelector((state) => state.user.name);
  const [password, setPassword] = useState('12345');

  return (
    <div className={styles.profile_main__wrapper}>
      <Input
        value={name}
        type={'text'}
        placeholder={'Имя'}
        icon="EditIcon"
        disabled={true}
      />
      <Input
        value={login}
        type={'text'}
        placeholder={'Логин'}
        icon="EditIcon"
        disabled={true}
      />
      <Input
        value={password}
        type={'password'}
        placeholder={'Пароль'}
        icon="EditIcon"
        disabled={true}
      />
    </div>
  );
}
