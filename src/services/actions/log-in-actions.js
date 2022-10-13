import { userRequest } from "../../utils/api";
import { setCookie } from "../../utils/cookie";

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN = 'LOG_IN';
export const LOG_IN_ERROR = 'LOG_IN_REQUEST';

const logInUrl = 'https://norma.nomoreparties.space/api/auth/login';

export function logIn(email, password) {
    const data = {
        email,
        password,
      };
      return function(dispatch) {
        dispatch({
            type: LOG_IN_REQUEST
        })
        userRequest(logInUrl, data)
          .then(res => {
            if (res && res.success) {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('refreshToken', refreshToken);
                setCookie('accessToken', accessToken);
                dispatch({
                type: LOG_IN,
                user: res.user,
                })
            }
        })
      .catch((error) => {
        console.log('logInError', error)
        dispatch({
            type: LOG_IN_ERROR
          })
      })
    }
}