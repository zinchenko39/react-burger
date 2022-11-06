import { Dispatch } from 'redux';

import { userRequest } from '../../utils/api';
import { setCookie, getCookie } from '../../utils/cookie';
import { getUserData } from './get-user-actions';

import { BASE_URL } from '../../utils/api';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';

export function refreshToken() {
  const token: { token: any } = {
    token: getCookie('refreshToken'),
  };
  return function (dispatch: Dispatch<any>) {
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
