export const BASE_URL = 'https://norma.nomoreparties.space/api';

export function request(url, options) {
  return fetch(url, options).then(checkResponse)
}

export function checkResponse(res) {
  if(res.ok) {
    return res.json()
}
return Promise.reject(`Ошибка ${res.status}`);
}

export function loadIngredients() {
   return fetch(`${BASE_URL}/ingredients`)
      .then(checkResponse)
}

export function makeOrder(ingredients) {
  return request(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(ingredients),
  });
  }


export function userRequest(url, data) {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data),
  })
}