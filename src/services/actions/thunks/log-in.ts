import { userRequest } from '../../../utils/api';
import { setCookie } from '../../../utils/cookie';
import { BASE_URL } from '../../../utils/api';
import { IData } from '../../../interfaces/IData';
import { AppThunk } from '../../types';
import { AppDispatch } from '../../types';

import { LOG_IN_REQUEST, LOG_IN, LOG_IN_ERROR } from '../user-actions';

export function logIn(email: string, password: string): AppThunk {
  const data: IData = {
    email,
    password,
  };

  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOG_IN_REQUEST,
    });
    userRequest(`${BASE_URL}/auth/login`, data)
      .then((res) => {
        if (res && res.success) {
          const accessToken = res.accessToken.split('Bearer ')[1];
          const refreshToken = res.refreshToken;
          setCookie('refreshToken', refreshToken);
          setCookie('accessToken', accessToken);
          dispatch({
            type: LOG_IN,
            user: res.user,
          });
        }
        if (!res.success) {
          console.log('Зашло в res.success === false');
          dispatch({
            type: LOG_IN_ERROR,
            error: res.message,
          });
        }
      })
      .catch((error) => {
        if (error === 401) {
          dispatch({
            type: LOG_IN_ERROR,
            error: 'Неверный логин или пароль',
          });
        } else {
          dispatch({
            type: LOG_IN_ERROR,
            error: 'Что-то пошло не так...',
          });
        }
        console.log('logInError', error);
      });
  };
}
