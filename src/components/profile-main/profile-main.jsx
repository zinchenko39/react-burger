import React, { useState } from 'react';
import styles from './profile-main.module.css';
import { Input } from '@ya.praktikum/react-developer-burger-ui-components';

export default function ProfileMain() {
  const [name, setName] = useState('Вадим');
  const [login, setLogin] = useState('vadim@burger.ru');
  const [password, setPassword] = useState('1111111');

  return (
    <div className={styles.profile_main__wrapper}>
      <Input
        value={name}
        type={'text'}
        placeholder={'Имя'}
        onChange={(e) => setName(e.target.value)}
        icon="EditIcon"
        disabled={true}
      />
      <Input
        value={login}
        type={'text'}
        placeholder={'Логин'}
        onChange={(e) => setLogin(e.target.value)}
        icon="EditIcon"
        disabled={true}
      />
      <Input
        value={password}
        type={'password'}
        placeholder={'Пароль'}
        onChange={(e) => setPassword(e.target.value)}
        icon="EditIcon"
        disabled={true}
      />
    </div>
  );
}
