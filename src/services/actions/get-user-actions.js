import { getCookie } from "../../utils/cookie";
import { refreshToken } from "./refresh-token-actions";

const userDataUrl = 'https://norma.nomoreparties.space/api/auth/user';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER = 'GET_USER';
export const GET_USER_ERROR = 'GET_USER_ERROR';

export function getUserData () {
    const token = 'Bearer ' + getCookie('accessToken');
    return function(dispatch) {
        dispatch({
            type: GET_USER_REQUEST,
        })
        fetch(userDataUrl, {
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
                    type: GET_USER,
                    user: res.user,
                })
            }
        })
        .catch((error) => {
            try{
                dispatch(refreshToken());
            } catch {}
            console.log('getUserError', error)
            dispatch({
                type: GET_USER_ERROR,
            })
        })
    }
}