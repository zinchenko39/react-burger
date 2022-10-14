import { userRequest } from "../../utils/api";
import { setCookie, getCookie } from "../../utils/cookie";
import { getUserData } from "./get-user-actions";

const refreshTokenUrl = 'https://norma.nomoreparties.space/api/auth/token';

export const REFRESH_TOKEN_REQUEST = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_ERROR = 'REFRESH_TOKEN_ERROR';

export function refreshToken () {
    const token = {
        token: getCookie('refreshToken')
    }
    return function(dispatch) {
        dispatch({
            type: REFRESH_TOKEN_REQUEST
        })
        userRequest(refreshTokenUrl, token)
        .then(res => {
            if (res && res.success) {
                const accessToken = res.accessToken.split('Bearer ')[1];
                const refreshToken = res.refreshToken;
                setCookie('refreshToken', refreshToken);
                setCookie('accessToken', accessToken);
                dispatch({
                    type: REFRESH_TOKEN,
                })
            }
        })
        .catch((error) => {
            console.log('refreshTokenError', error)
            dispatch({
                type: REFRESH_TOKEN_ERROR
            })
        })
    }
}
