import { feedInitialState, feedWsReducer } from './feed-ws-reducer';
import {
    ORDER_WS_CONNECTING,
    ORDER_WS_OPEN,
    ORDER_WS_CLOSE,
    ORDER_WS_ERROR,
    ORDER_WS_MESSAGE,
  } from '../actions/feed-ws-actions';



describe('burger constructor reducer', () => {
    let state = feedWsReducer(undefined, {});
    it('should return the initial state', () => {
      expect(state).toEqual(feedInitialState);
    })
    it('should handle ORDER_WS_CONNECTING', () => {
        state = feedWsReducer(state,{type: ORDER_WS_CONNECTING})
        expect(state).toEqual({
            ...feedInitialState,
            isLoading: true
        })
    });
    it('should handle ORDER_WS_OPEN', () => {
        state = feedWsReducer(state,{type: ORDER_WS_OPEN})
        expect(state).toEqual({
            ...feedInitialState,
            isLoading: false,
            connected: true,
        })
    });
    it('should handle ORDER_WS_MESSAGE', () => {
        state = feedWsReducer(state,{type: ORDER_WS_MESSAGE, data: [1,1,1,1,1]})
        expect(state).toEqual({
            ...feedInitialState,
            data: [1,1,1,1,1],
            connected: true
        })
    });
    it('should handle ORDER_WS_CLOSE', () => {
        state = feedWsReducer(state,{type: ORDER_WS_CLOSE})
        expect(state).toEqual(feedInitialState)
    });
    it('should handle ORDER_WS_ERROR', () => {
        state = feedWsReducer(state,{type: ORDER_WS_ERROR, error: 'error'})
        expect(state).toEqual({
            ...feedInitialState,
            error: 'error',
        })
    });
  }) 