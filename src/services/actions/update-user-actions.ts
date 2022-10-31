import { Dispatch, Action } from 'redux';

import { getCookie } from '../../utils/cookie';
import { BASE_URL } from '../../utils/api';
import { request } from '../../utils/api';

import { IData } from '../../interfaces/IData';

export const UPDATE_USER_DATA_REQUEST = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const UPDATE_USER_DATA_ERROR = 'UPDATE_USER_DATA_ERROR';

export function updateUserData(email: string, name: string) {
  const token = 'Bearer ' + getCookie('accessToken');
  const data: IData = {
    email,
    name,
  };
  return function (dispatch: Dispatch<Action>): void {
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
