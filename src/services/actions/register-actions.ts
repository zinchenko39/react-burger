import { userRequest } from '../../utils/api';
import { setCookie } from '../../utils/cookie';
import { BASE_URL } from '../../utils/api';
import { IData } from '../../interfaces/IData';
import { REGISTER_REQUEST, REGISTER, REGISTER_ERROR } from './user-actions';
import { AppDispatch } from '../types';

export function register(email: string, password: string, name: string) {
  const data: IData = {
    email,
    password,
    name,
  };
  return function (dispatch: AppDispatch) {
    dispatch({
      type: REGISTER_REQUEST,
    });
    userRequest(`${BASE_URL}/auth/register`, data)
      .then((res) => {
        if (res && res.success) {
          const accessToken = res.accessToken.split('Bearer ')[1];
          const refreshToken = res.refreshToken;
          setCookie('refreshToken', refreshToken);
          setCookie('accessToken', accessToken);
          setCookie('logged_in', true);
          dispatch({
            type: REGISTER,
            user: res.user,
          });
        }
      })
      .catch((error) => {
        console.log('registerError', error);
        dispatch({
          type: REGISTER_ERROR,
        });
      });
  };
}
