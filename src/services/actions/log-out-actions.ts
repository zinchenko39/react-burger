import { userRequest } from '../../utils/api';
import { setCookie, getCookie } from '../../utils/cookie';
import { BASE_URL } from '../../utils/api';
import { Dispatch, Action } from 'redux';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_ERROR = 'LOG_OUT_ERROR';

export function logOut() {
  const token: { token: any } = {
    token: getCookie('refreshToken'),
  };
  return function (dispatch: Dispatch<Action>): void {
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
