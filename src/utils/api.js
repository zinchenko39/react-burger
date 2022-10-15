const orderUrl = 'https://norma.nomoreparties.space/api/orders';
const LoadIngredientsUrl = 'https://norma.nomoreparties.space/api/ingredients';
export const baseUrl = 'https://norma.nomoreparties.space/api';

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
   return fetch(LoadIngredientsUrl)
      .then(checkResponse)
}

export function makeOrder(ingredients) {
  return request(orderUrl, {
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