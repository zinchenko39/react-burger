const orderUrl = 'https://norma.nomoreparties.space/api/orders';
const LoadIngredientsUrl = 'https://norma.nomoreparties.space/api/ingredients'

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
        console.log(responce)
        if (responce.ok) {
          return responce.json();
        }
        return Promise.reject(`Ошибка ${responce.status}`);
      })
  }