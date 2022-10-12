import { userRequest } from "../../utils/api";
import { setCookie, getCookie } from "../../utils/cookie";

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const REGISTER = 'REGISTER';
export const SET_USER = 'SET_USER';
export const USER_ERROR = 'USER_ERROR';
export const USER_REFRESH_TOKEN = 'USER_REFRESH_TOKEN';

const registerUrl = 'https://norma.nomoreparties.space/api/auth/register';
const logInUrl = 'https://norma.nomoreparties.space/api/auth/login';
const refreshTokenUrl = 'https://norma.nomoreparties.space/api/auth/token';
const logOutUrl = 'https://norma.nomoreparties.space/api/auth/logout';
const getUserDataUrl = 'https://norma.nomoreparties.space/api/auth/user';

export function registerRequest(email, password, name) {
    const data = {
        email,
        password,
        name
      };
      return function(dispatch) {
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
                user: data
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

export function logIn(email, password) {
    const data = {
        email,
        password,
      };
      return function(dispatch) {
        userRequest(logInUrl, data)
          .then(res => {
            if (res && res.success) {
                console.log(res)
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('refreshToken', refreshToken);
                setCookie('accessToken', accessToken)
                setCookie('logged_in', true);
                dispatch({
                type: LOG_IN,
                user: res.user,
                accessToken
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

export function logOut () {
    const token = {
        token: getCookie('refreshToken')
    }
    return function(dispatch) {
        userRequest(logOutUrl, token)
        .then(res => {
            if (res && res.success) {
                const refreshToken = res.refreshToken;
                setCookie('refreshToken', refreshToken);
                setCookie('accessToken', '');
                setCookie('logged_in', false);
                dispatch({
                    type: LOG_OUT
                })
            }
        })
    }
}

export function getUserData () {
    const token = 'Bearer ' + getCookie('accessToken');
    return function(dispatch) {
        fetch(getUserDataUrl, {
            headers: {
                'Authorization': token || '',
            },
        })
        .then((responce) => {
            if(responce.ok) {
                return responce.json()
            }
            return Promise.reject(`Ошибка ${responce.status}`);
          })
        .then(res => {
            if (res && res.success) {
                dispatch({
                    type: SET_USER,
                    email: res.user.email,
                    name: res.user.name,
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

export function refreshToken () {
    const token = {
        token: getCookie('refreshToken')
    }
    return function(dispatch) {
        userRequest(refreshTokenUrl, token)
        .then(res => {
            if (res && res.success) {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('refreshToken', refreshToken);
                setCookie('accessToken', accessToken);
                setCookie('logged_in', true);
                dispatch({
                    type: USER_REFRESH_TOKEN,
                })
            }
        })
    }
}



