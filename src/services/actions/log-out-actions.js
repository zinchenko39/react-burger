import { userRequest } from "../../utils/api";
import { setCookie, getCookie } from "../../utils/cookie";

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT = 'LOG_OUT';
export const LOG_OUT_ERROR = 'LOG_OUT_ERROR';

const logOutUrl = 'https://norma.nomoreparties.space/api/auth/logout';

export function logOut () {
    const token = {
        token: getCookie('refreshToken')
    }
    return function(dispatch) {
        dispatch({
            type: LOG_OUT_REQUEST,
        })
        userRequest(logOutUrl, token)
        .then(res => {
            if (res && res.success) {
                setCookie('refreshToken', '');
                setCookie('accessToken', '');
                dispatch({
                    type: LOG_OUT
                })
            }
        })
        .catch((error) => {
            console.log('logOutError', error);
            dispatch({
                type: LOG_OUT_ERROR,
            })
        })
    }
}