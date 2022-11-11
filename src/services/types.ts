import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { store } from './store';
import { TUserActions } from './actions/user-actions';
import { TConstructorActions } from './actions/constructor-actions';
import { TIngredientsActions } from './actions/ingredients-actions';
import { TOrderActions } from './actions/order-actions';

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions =
  | TUserActions
  | TConstructorActions
  | TIngredientsActions
  | TOrderActions;

export type AppThunk<TReturn = void> = ThunkAction<
  TReturn,
  RootState,
  never,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
