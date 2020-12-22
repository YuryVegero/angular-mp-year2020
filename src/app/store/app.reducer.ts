import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';
import * as fromAuth from 'app/auth/store/auth.reducer';

export interface AppState {
  auth: fromAuth.AuthState;
  router: fromRouter.RouterReducerState;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  router: fromRouter.routerReducer,
};
