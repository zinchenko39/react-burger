import {
    REGISTER_REQUEST,
    REGISTER,
    REGISTER_ERROR,
    LOG_IN_REQUEST,
    LOG_IN,
    LOG_IN_ERROR,
    LOG_OUT_REQUEST,
    LOG_OUT,
    LOG_OUT_ERROR,
    GET_USER_REQUEST,
    GET_USER,
    GET_USER_ERROR,
    UPDATE_USER_DATA_REQUEST,
    UPDATE_USER_DATA,
    UPDATE_USER_DATA_ERROR,
    REFRESH_TOKEN_REQUEST,
    REFRESH_TOKEN,
    REFRESH_TOKEN_ERROR,
    FORGOT_PASSWORD_VISITED,
    RESET_PASSWORD,
  } from '../actions/user-actions';
  import {userInitialState, userReducer} from './user-reducer';

  const user = {
    email: '123@mail.ru', 
    name: '123',
  };
  const updatedUser = {
    email: '1234@mail.ru', 
    name: '1234',
  }


  describe('user reducer', () => {
    let state = userReducer(undefined, {});
    it('should return the initial state', () => {
      expect(state).toEqual(userInitialState);
    })
    it('should handle REGISTER_REQUEST', () => {
        state = userReducer(state,{type: REGISTER_REQUEST})
        expect(state).toEqual({
            ...userInitialState,
            userLoggedIn: false,
            registerError: false,
            userLoaded: false,
        })
    });
    it('should handle REGISTER_ERROR', () => {
        state = userReducer(state,{type: REGISTER_ERROR})
        expect(state).toEqual({
            ...userInitialState,
            userLoggedIn: false, 
            registerError: true,
            userLoaded: true,
        })
    });
    it('should handle REGISTER', () => {
        state = userReducer(state,{type: REGISTER, user})
        expect(state).toEqual({
            ...userInitialState,
            email: user.email, 
            name: user.name,
            userLoggedIn: true,
            userLoaded: true,
        })
    });
    it('should handle LOG_IN_REQUEST', () => {
        state = userReducer(state,{type: LOG_IN_REQUEST})
        expect(state).toEqual({
            ...userInitialState,
            userLoggedIn: false,
            logInError: false,
            userLoaded: false,
        })
    });
    it('should handle LOG_IN_ERROR', () => {
        state = userReducer(state,{type: LOG_IN_ERROR, error: 'error'})
        expect(state).toEqual({
            ...userInitialState,
            userLoggedIn: false,
            userLoaded: true,
            logInError: 'error',
        })
    });
    it('should handle LOG_IN', () => {
        state = userReducer(state,{type: LOG_IN, user})
        expect(state).toEqual({
            ...userInitialState,
            email: user.email, 
            name: user.name,
            userLoggedIn: true,
            userLoaded: true,
        })
    });
    it('should handle LOG_OUT_REQUEST', () => {
        state = userReducer(state,{type: LOG_OUT_REQUEST})
        expect(state).toEqual({
            ...userInitialState,
            userLoggedIn: true,
            logOutError: false,
            userLoaded: true,
        })
    });
    it('should handle LOG_OUT_ERROR', () => {
        state = userReducer(state,{type: LOG_OUT_ERROR})
        expect(state).toEqual({
            ...userInitialState,
            userLoggedIn: true,
            logOutError: true,
            userLoaded: true,
        })
    });
    it('should handle LOG_OUT', () => {
        state = userReducer(state,{type: LOG_OUT})
        expect(state).toEqual({
            ...userInitialState,
            userLoaded: true})
    });
    it('should handle GET_USER_REQUEST', () => {
        state = userReducer(state,{type: GET_USER_REQUEST})
        expect(state).toEqual({
            ...userInitialState, 
            userLoaded: true})
    });
    it('should handle GET_USER_ERROR', () => {
        state = userReducer(state,{type: GET_USER_ERROR})
        expect(state).toEqual({
            ...userInitialState,
            userLoaded: true, 
            getUserError: true
        })
    });
    it('should handle GET_USER', () => {
        state = userReducer(state,{type: GET_USER, user})
        expect(state).toEqual({
            ...userInitialState,
            email: user.email, 
            name: user.name,
            userLoggedIn: true,
            userLoaded: true,
            getUserError: false,
        })
    });
    it('should handle UPDATE_USER_DATA_REQUEST', () => {
        state = userReducer(state,{type: UPDATE_USER_DATA_REQUEST})
        expect(state).toEqual({
            ...userInitialState, 
            email: user.email, 
            name: user.name,
            userLoaded: true,
            userLoggedIn: true,
        })
    });
    it('should handle UPDATE_USER_DATA_ERROR', () => {
        state = userReducer(state,{type: UPDATE_USER_DATA_ERROR})
        expect(state).toEqual({
            ...userInitialState,
            email: user.email, 
            name: user.name,
            updateUserDataError: true,
            userLoaded: true,
            userLoggedIn: true,
        })
    });
    it('should handle UPDATE_USER_DATA', () => {
        state = userReducer(state,{type: UPDATE_USER_DATA, user: updatedUser})
        expect(state).toEqual({
            ...userInitialState,
            email: updatedUser.email, 
            name: updatedUser.name,
            userLoggedIn: true,
            updateUserDataError: false,
            userLoaded: true,
        })
    });
    it('should handle REFRESH_TOKEN_REQUEST', () => {
        state = userReducer(state,{type: REFRESH_TOKEN_REQUEST})
        expect(state).toEqual({
            ...userInitialState,
            email: "1234@mail.ru",
            name: "1234",
            userLoaded: true,
            userLoggedIn: true,
        })
    });
    it('should handle REFRESH_TOKEN_ERROR', () => {
        state = userReducer(state,{type: REFRESH_TOKEN_ERROR})
        expect(state).toEqual({
            ...userInitialState,
            email: "1234@mail.ru",
            name: "1234",
            userLoaded: true,
            userLoggedIn: true,
        })
    });
    it('should handle REFRESH_TOKEN', () => {
        state = userReducer(state,{type: REFRESH_TOKEN})
        expect(state).toEqual({
            ...userInitialState,
            email: "1234@mail.ru",
            name: "1234",
            userLoaded: true,
            userLoggedIn: true,
        })
    });
    it('should handle FORGOT_PASSWORD_VISITED', () => {
        state = userReducer(state,{type: FORGOT_PASSWORD_VISITED})
        expect(state).toEqual({
            ...userInitialState,
            email: "1234@mail.ru",
            name: "1234",
            userLoaded: true,
            userLoggedIn: true,
            forgotPasswordVisited: true
        })
    });
    it('should handle RESET_PASSWORD', () => {
        state = userReducer(state,{type: RESET_PASSWORD})
        expect(state).toEqual({
            ...userInitialState,
            email: "1234@mail.ru",
            name: "1234",
            userLoaded: true,
            userLoggedIn: true,
            forgotPasswordVisited: false
        })
    });
  }) 