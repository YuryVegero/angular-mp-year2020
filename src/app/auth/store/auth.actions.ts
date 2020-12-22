import { createAction, props } from '@ngrx/store';
import { LoginRequest } from 'app/auth/auth.model';
import { User } from 'app/auth/user.model';

export const SET_USER = '[Auth] Set User';
export const setUser = createAction(SET_USER, props<{ payload: User }>());

export const LOGIN = '[Auth] Login';
export const login = createAction(LOGIN, props<{ payload: LoginRequest }>());

export const LOGIN_SUCCESS = '[Auth] Login Success';
export const loginSuccess = createAction(LOGIN_SUCCESS);

export const LOGIN_FAIL = '[Auth] Login Fail';
export const loginFail = createAction(LOGIN_FAIL, props<{ payload: string }>());

export const AUTO_LOGIN = '[Auth] Auto Login';
export const autoLogin = createAction(AUTO_LOGIN);

export const LOGOUT = '[Auth] Logout';
export const logout = createAction(LOGOUT);

export const CLEAR_AUTH = '[Auth] Clear Auth';
export const clearAuth = createAction(CLEAR_AUTH);
