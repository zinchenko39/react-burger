const orderUrl = 'https://norma.nomoreparties.space/api/orders';
const LoadIngredientsUrl = 'https://norma.nomoreparties.space/api/ingredients';
const passwordForgotUrl = 'https://norma.nomoreparties.space/api/password-reset';
const passwordResetUrl = 'https://norma.nomoreparties.space/api/password-reset/reset';
const registerUrl = 'https://norma.nomoreparties.space/api/auth/register';

export function loadIngredients() {
   return fetch(LoadIngredientsUrl)
            .then((responce) => {
                if(responce.ok) {
                    return responce.json()
                }
                return Promise.reject(`Ошибка ${responce.status}`);
            })
}

export function makeOrder(ingredients) {
    return fetch(orderUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(ingredients),
    })
      .then((responce) => {
        if (responce.ok) {
          return responce.json();
        }
        return Promise.reject(`Ошибка ${responce.status}`);
      })
  }

export function passwordForgotRequest(email) {
  return fetch (passwordForgotUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(email),
  })
    .then((responce) => {
      if (responce.ok) {
        return responce.json();
      }
      return Promise.reject(`Ошибка ${responce.status}`);
    })
}

export function passwordResetRequest(data) {
  return fetch (passwordResetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((responce) => {
      if (responce.ok) {
        return responce.json();
      }
      return Promise.reject(`Ошибка ${responce.status}`);
    })
}

export function registerRequest(data) {
  return fetch (registerUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(data),
  })
    .then((responce) => {
      if (responce.ok) {
        return responce.json();
      }
      return Promise.reject(`Ошибка ${responce.status}`);
    })
}