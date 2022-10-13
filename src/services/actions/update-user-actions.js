import { getCookie } from "../../utils/cookie";

const userDataUrl = 'https://norma.nomoreparties.space/api/auth/user';

export const UPDATE_USER_DATA_REQUEST = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA = 'UPDATE_USER_DATA';
export const UPDATE_USER_DATA_ERROR = 'UPDATE_USER_DATA_ERROR';

export function updateUserData (email, name) {
    const token = 'Bearer ' + getCookie('accessToken');
    const data = {
        email,
        name
     }
    return function(dispatch) {
        dispatch({
            type: UPDATE_USER_DATA_REQUEST,
        })
        fetch(userDataUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token || '',
            },
            body: JSON.stringify(data),
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
                    type: UPDATE_USER_DATA,
                    user: res.user,
                })
            }
        })
        .catch((error) => {
            console.log('updateUserDataError', error)
            dispatch({
                type: UPDATE_USER_DATA_ERROR
            })
        })
    }
}