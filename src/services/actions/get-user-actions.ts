import { getCookie } from '../../utils/cookie';
import { refreshToken } from './refresh-token-actions';
import { BASE_URL } from '../../utils/api';
import { request } from '../../utils/api';

import { GET_USER_REQUEST, GET_USER, GET_USER_ERROR } from './user-actions';
import { AppThunk } from '../types';
import { AppDispatch } from '../types';

export function getUserData(): any {
  const token = 'Bearer ' + getCookie('accessToken');
  return function (dispatch: AppDispatch) {
    dispatch({
      type: GET_USER_REQUEST,
    });
    request(`${BASE_URL}/auth/user`, {
      headers: {
        Authorization: token || '',
      },
    })
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER,
            user: res.user,
          });
        }
      })
      .catch((error) => {
        if (getCookie('accessToken')) {
          try {
            dispatch(refreshToken());
          } catch {}
        }
        console.log('getUserError', error);
        dispatch({
          type: GET_USER_ERROR,
        });
      });
  };
}
