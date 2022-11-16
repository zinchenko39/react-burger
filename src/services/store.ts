import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/index';
import thunk from 'redux-thunk';
import { socketMiddleware } from './middleware/socket-middleware';
import { feedWsActions } from './actions/feed-ws-actions';
import { profileFeedWsActions } from './actions/profile-feed-ws-actions';
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const ordersWsMiddleware = socketMiddleware(feedWsActions);
const personalOrdersWsMiddleware = socketMiddleware(profileFeedWsActions, true);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk, ordersWsMiddleware, personalOrdersWsMiddleware)
);

export const store = createStore(rootReducer, enhancer);
