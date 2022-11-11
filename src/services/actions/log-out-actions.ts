import { userRequest } from '../../utils/api';
import { setCookie, getCookie } from '../../utils/cookie';
import { BASE_URL } from '../../utils/api';
import { LOG_OUT_REQUEST, LOG_OUT, LOG_OUT_ERROR } from './user-actions';
import { AppDispatch } from '../types';

export function logOut() {
  const token: { token: string | undefined } = {
    token: getCookie('refreshToken'),
  };
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOG_OUT_REQUEST,
    });
    userRequest(`${BASE_URL}/auth/logout`, token)
      .then((res) => {
        if (res && res.success) {
          setCookie('refreshToken', '');
          setCookie('accessToken', '');
          dispatch({
            type: LOG_OUT,
          });
        }
      })
      .catch((error) => {
        console.log('logOutError', error);
        dispatch({
          type: LOG_OUT_ERROR,
        });
      });
  };
}
