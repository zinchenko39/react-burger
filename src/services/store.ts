import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socket-middleware';
import { feedWsActions } from './actions/feed-ws-actions';
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const ordersWsMiddleware: any = socketMiddleware(feedWsActions);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(applyMiddleware(thunk, ordersWsMiddleware));

export const store = createStore(rootReducer, enhancer);
