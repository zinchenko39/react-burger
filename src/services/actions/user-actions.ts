export const FORGOT_PASSWORD_VISITED: 'FORGOT_PASSWORD_VISITED' =
  'FORGOT_PASSWORD_VISITED';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER: 'GET_USER' = 'GET_USER';
export const GET_USER_ERROR: 'GET_USER_ERROR' = 'GET_USER_ERROR';

export const LOG_IN_REQUEST: 'LOG_IN_REQUEST' = 'LOG_IN_REQUEST';
export const LOG_IN: 'LOG_IN' = 'LOG_IN';
export const LOG_IN_ERROR: 'LOG_IN_ERROR' = 'LOG_IN_ERROR';

export const LOG_OUT_REQUEST: 'LOG_OUT_REQUEST' = 'LOG_OUT_REQUEST';
export const LOG_OUT: 'LOG_OUT' = 'LOG_OUT';
export const LOG_OUT_ERROR: 'LOG_OUT_ERROR' = 'LOG_OUT_ERROR';

export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' =
  'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN: 'REFRESH_TOKEN' = 'REFRESH_TOKEN';
export const REFRESH_TOKEN_ERROR: 'REFRESH_TOKEN_ERROR' = 'REFRESH_TOKEN_ERROR';

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST';
export const REGISTER: 'REGISTER' = 'REGISTER';
export const REGISTER_ERROR: 'REGISTER_ERROR' = 'REGISTER_ERROR';

export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD';

export const UPDATE_USER_DATA_REQUEST: 'UPDATE_USER_DATA_REQUEST' =
  'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA: 'UPDATE_USER_DATA' = 'UPDATE_USER_DATA';
export const UPDATE_USER_DATA_ERROR: 'UPDATE_USER_DATA_ERROR' =
  'UPDATE_USER_DATA_ERROR';

type TUser = {
  email: string;
  name: string;
  password?: string;
};

export interface IForgotPassword {
  readonly type: typeof FORGOT_PASSWORD_VISITED;
}

export interface IGetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

export interface IGetUser {
  readonly type: typeof GET_USER;
  readonly user: TUser;
}

export interface IGetUserError {
  readonly type: typeof GET_USER_ERROR;
}

export interface IGetUserError {
  readonly type: typeof GET_USER_ERROR;
}

export interface ILoginRequest {
  readonly type: typeof LOG_IN_REQUEST;
}
export interface ILogin {
  readonly type: typeof LOG_IN;
  readonly user: TUser;
}
export interface ILoginError {
  readonly type: typeof LOG_IN_ERROR;
  readonly error: string;
}
export interface ILogOutRequest {
  readonly type: typeof LOG_OUT_REQUEST;
}
export interface ILogOut {
  readonly type: typeof LOG_OUT;
}
export interface ILogOutError {
  readonly type: typeof LOG_OUT_ERROR;
}
export interface IRefreshTokenRequest {
  readonly type: typeof REFRESH_TOKEN_REQUEST;
}
export interface IRefreshToken {
  readonly type: typeof REFRESH_TOKEN;
}
export interface IRefreshTokenError {
  readonly type: typeof REFRESH_TOKEN_ERROR;
}
export interface IRegisterRequest {
  readonly type: typeof REGISTER_REQUEST;
}
export interface IRegister {
  readonly type: typeof REGISTER;
  readonly user: TUser;
}
export interface IRegisterError {
  readonly type: typeof REGISTER_ERROR;
}
export interface IResetPassword {
  readonly type: typeof RESET_PASSWORD;
}
export interface IUpdateUserDataRequest {
  readonly type: typeof UPDATE_USER_DATA_REQUEST;
}
export interface IUpdateUserData {
  readonly type: typeof UPDATE_USER_DATA;
}
export interface IUpdateUserDataError {
  readonly type: typeof UPDATE_USER_DATA_ERROR;
}

export type TUserActions =
  | IForgotPassword
  | IGetUserRequest
  | IGetUser
  | IGetUserError
  | ILoginRequest
  | ILogin
  | ILoginError
  | ILogOutRequest
  | ILogOut
  | ILogOutError
  | IRefreshTokenRequest
  | IRefreshToken
  | IRefreshTokenError
  | IRegisterRequest
  | IRegister
  | IRegisterError
  | IResetPassword
  | IUpdateUserDataRequest
  | IUpdateUserData
  | IUpdateUserDataError;
