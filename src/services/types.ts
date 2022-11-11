import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { store } from './store';
import { TUserActions } from './actions/user-actions';

export type RootState = ReturnType<typeof store.getState>;

// Типизация всех экшенов приложения

export type TApplicationActions = TUserActions;

// Типизация thunk'ов в нашем приложении
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

// Типизация метода dispatch для проверки на валидность отправляемого экшена
export type AppDispatch = typeof store.dispatch;

// export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions>;
