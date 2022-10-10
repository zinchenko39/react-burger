import { userRequest } from "../../utils/api";
export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const REGISTER = 'REGISTER';
export const USER_ERROR = 'USER_ERROR';

const registerUrl = 'https://norma.nomoreparties.space/api/auth/register';

export function logIn(email, password) {
    const data = {
        email,
        password,

      };
      return function(dispatch) {
        userRequest(registerUrl, data).then(res => {
          if (res && res.success) {
            console.log(res);
            dispatch({
              type: LOG_IN,
              user: data
            })
        }
      })
      .catch((error) => {
        console.log(error);
      })
    }
}

export function registerRequest(email, password, name) {
    const data = {
        email,
        password,
        name
      };
      return function(dispatch) {
        userRequest(registerUrl, data).then(res => {
          if (res && res.success) {
            dispatch({
              type: REGISTER,
              user: data,
              accessToken: res.accessToken,
              refreshToken: res.refreshToken,
            })
        }
      })
      .catch((error) => {
        dispatch({
            type: USER_ERROR,
            error,
          })
      })
    }
}
