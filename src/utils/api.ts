export const BASE_URL = 'https://norma.nomoreparties.space/api';

type TOptions = {
  method?: string;
  headers: any;
  body?: any;
};

export function request(url: string, options: TOptions) {
  return fetch(url, options).then(checkResponse);
}

export function checkResponse(res: any) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export function loadIngredients() {
  return fetch(`${BASE_URL}/ingredients`).then(checkResponse);
}

export function makeOrder(ingredients: string[]) {
  return request(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(ingredients),
  });
}

export function userRequest(url: string, data: any) {
  return request(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  });
}
