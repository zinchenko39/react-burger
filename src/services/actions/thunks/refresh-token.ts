import { userRequest } from '../../../utils/api';
import { setCookie, getCookie } from '../../../utils/cookie';
import { getUserData } from './get-user';

import { BASE_URL } from '../../../utils/api';

import {
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN,
  REFRESH_TOKEN_ERROR,
} from '../user-actions';
import { AppThunk } from '../../types';
import { AppDispatch } from '../../types';

export function refreshToken(): AppThunk {
  const token: { token: string | undefined } = {
    token: getCookie('refreshToken'),
  };
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REFRESH_TOKEN_REQUEST,
    });
    userRequest(`${BASE_URL}/auth/token`, token)
      .then((res) => {
        if (res && res.success) {
          const accessToken = res.accessToken.split('Bearer ')[1];
          const refreshToken = res.refreshToken;
          setCookie('refreshToken', refreshToken);
          setCookie('accessToken', accessToken);
          dispatch({
            type: REFRESH_TOKEN,
          });
          dispatch(getUserData());
        }
      })
      .catch((error) => {
        console.log('refreshTokenError', error);
        dispatch({
          type: REFRESH_TOKEN_ERROR,
        });
      });
  };
}
