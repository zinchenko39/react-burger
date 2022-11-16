import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TUserActions } from './actions/user-actions';
import { TConstructorActions } from './actions/constructor-actions';
import { TIngredientsActions } from './actions/ingredients-actions';
import { TOrderActions } from './actions/order-actions';
import { TFeedActions } from './actions/feed-ws-actions';
import { TProfileFeedActions } from './actions/profile-feed-ws-actions';
import { rootReducer } from './reducers';

export type RootState = ReturnType<typeof rootReducer>;

export type TApplicationActions =
  | TUserActions
  | TConstructorActions
  | TIngredientsActions
  | TOrderActions
  | TFeedActions
  | TProfileFeedActions;

export type AppThunk<TReturn = void> = ThunkAction<
  TReturn,
  RootState,
  never,
  TApplicationActions
>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
