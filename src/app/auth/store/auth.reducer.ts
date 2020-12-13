import { createReducer, on } from '@ngrx/store';
import { User } from 'app/auth/user.model';
import { clearAuth, login, loginFail, setUser } from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  user: User;
  error: string;
}

export const initialState: AuthState = {
  user: undefined,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, error: null })),
  on(loginFail, (state, { payload }) => ({
    ...state,
    user: null,
    error: payload,
  })),
  on(setUser, (state, { payload }) => ({
    ...state,
    user: payload,
    error: null,
  })),
  on(clearAuth, (state) => ({
    ...state,
    user: null,
  })),
);
