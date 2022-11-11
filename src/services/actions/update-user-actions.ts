import { getCookie } from '../../utils/cookie';
import { BASE_URL } from '../../utils/api';
import { request } from '../../utils/api';

import { IData } from '../../interfaces/IData';

import {
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA,
  UPDATE_USER_DATA_ERROR,
} from './user-actions';
import { AppDispatch } from '../types';

export function updateUserData(email: string, name: string, password: string) {
  const token: string = 'Bearer ' + getCookie('accessToken');
  const data: IData = {
    email,
    name,
    password,
  };
  return function (dispatch: AppDispatch) {
    dispatch({
      type: UPDATE_USER_DATA_REQUEST,
    });
    request(`${BASE_URL}/auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token || '',
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: UPDATE_USER_DATA,
            user: res.user,
          });
        }
      })
      .catch((error) => {
        console.log('updateUserDataError', error);
        dispatch({
          type: UPDATE_USER_DATA_ERROR,
        });
      });
  };
}
