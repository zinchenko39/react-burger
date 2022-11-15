import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients-reducer';
import { constructorReducer } from './constructor-reducer';
import { ingridientDetailsReducer } from './ingridient-details-reducer';
import { orderReducer } from './order-reducer';
import { userReducer } from './user-reducer';
import { feedWsReducer } from './feed-ws-reducer';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  cart: constructorReducer,
  currentIngredient: ingridientDetailsReducer,
  order: orderReducer,
  user: userReducer,
  feed: feedWsReducer,
});
