import { ADD_ITEM } from '../actions/constructor-actions.js';
import { DELETE_ITEM } from '../actions/constructor-actions.js';


const constructorInitialState = {
    items: [
   {
      "_id":"60666c42cc7b410027a1a9b5",
      "name":"Говяжий метеорит (отбивная)",
      "type":"main",
      "proteins":800,
      "fat":800,
      "carbohydrates":300,
      "calories":2674,
      "price":3000,
      "image":"https://code.s3.yandex.net/react/code/meat-04.png",
      "image_mobile":"https://code.s3.yandex.net/react/code/meat-04-mobile.png",
      "image_large":"https://code.s3.yandex.net/react/code/meat-04-large.png",
      "__v":0
   },
   {
    "_id":"60666c42cc7b410027a1a9b6",
    "name":"Биокотлета из марсианской Магнолии",
    "type":"main",
    "proteins":420,
    "fat":142,
    "carbohydrates":242,
    "calories":4242,
    "price":424,
    "image":"https://code.s3.yandex.net/react/code/meat-01.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-01-large.png",
    "__v":0
 },
 {
  "_id":"60666c42cc7b410027a1a9b7",
  "name":"Соус Spicy-X",
  "type":"sauce",
  "proteins":30,
  "fat":20,
  "carbohydrates":40,
  "calories":30,
  "price":90,
  "image":"https://code.s3.yandex.net/react/code/sauce-02.png",
  "image_mobile":"https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
  "image_large":"https://code.s3.yandex.net/react/code/sauce-02-large.png",
  "__v":0
},],
    bun: ''
  
}

export const constructorReducer = (state = constructorInitialState, action, ) => {
  switch (action.type) {
    case ADD_ITEM: {
      if(action.item.type === 'bun') {
        if(state.bun.id === action.item._id) {
          return state
        } else {
          return {
            ...state,
            bun: action.item
          }
        }
      }
      return {
        ...state,
        items: [...state.items, action.item]
      }
    }
    case DELETE_ITEM: {
      return state;
    }
    default: {
      return state;
    }
  }
}