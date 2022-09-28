import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients-reducer.js';
import { constructorReducer } from './constructor-reducer.js';
import { ingridientDetailsReducer } from './ingridient-details-reducer.js';
import { orderReducer } from './order-reducer.js';


export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    cart: constructorReducer,
    currentIngredient: ingridientDetailsReducer,
    order: orderReducer,
  });