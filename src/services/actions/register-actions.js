import { userRequest } from "../../utils/api";
import { setCookie } from "../../utils/cookie";

export const REGISTER = 'REGISTER';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_ERROR = 'USER_ERROR';
const registerUrl = 'https://norma.nomoreparties.space/api/auth/register';

export function register(email, password, name) {
    const data = {
        email,
        password,
        name
      };
      return function(dispatch) {
        dispatch({
            type: REGISTER_REQUEST
        })
        userRequest(registerUrl, data)
          .then(res => {
            if (res && res.success) {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('refreshToken', refreshToken);
                setCookie('accessToken', accessToken);
                setCookie('logged_in', true);
                dispatch({
                type: REGISTER,
                user: res.user,
                })
            }
        })
      .catch((error) => {
        console.log('registerError', error)
        dispatch({
            type: REGISTER_ERROR,
          })
      })
    }
}