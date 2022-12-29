 import {
    PROFILE_ORDER_WS_CONNECTING,
    PROFILE_ORDER_WS_OPEN,
    PROFILE_ORDER_WS_CLOSE,
    PROFILE_ORDER_WS_ERROR,
    PROFILE_ORDER_WS_MESSAGE,
  } from '../actions/profile-feed-ws-actions';
  import {personalFeedInitialState, PersonalFeedWsReducer} from './profile-feed-ws-reducer';


  describe('profile-feed ws reducer', () => {
    let state = PersonalFeedWsReducer(undefined, {});
    it('should return the initial state', () => {
      expect(state).toEqual(personalFeedInitialState);
    })
    it('should handle ORDER_WS_CONNECTING', () => {
        state = PersonalFeedWsReducer(state,{type: PROFILE_ORDER_WS_CONNECTING})
        expect(state).toEqual({
            ...personalFeedInitialState,
            isLoading: true
        })
    });
    it('should handle PROFILE_ORDER_WS_OPEN', () => {
        state = PersonalFeedWsReducer(state,{type: PROFILE_ORDER_WS_OPEN})
        expect(state).toEqual({
            ...personalFeedInitialState,
            isLoading: false,
            connected: true,
        })
    });
    it('should handle PROFILE_ORDER_WS_MESSAGE', () => {
        state = PersonalFeedWsReducer(state,{type: PROFILE_ORDER_WS_MESSAGE, data: ['111', '111']})
        expect(state).toEqual({
            ...personalFeedInitialState,
            connected: true,
            data: ['111', '111']
        })
    });
    it('should handle PROFILE_ORDER_WS_CLOSE', () => {
        state = PersonalFeedWsReducer(state,{type: PROFILE_ORDER_WS_CLOSE})
        expect(state).toEqual({
            ...personalFeedInitialState,
            connected: false,
        })
    });
    it('should handle PROFILE_ORDER_WS_ERROR', () => {
        state = PersonalFeedWsReducer(state,{type: PROFILE_ORDER_WS_ERROR, error: 'error'})
        expect(state).toEqual({
            ...personalFeedInitialState,
            error: 'error',
            connected: false,
        })
    });
  }) 