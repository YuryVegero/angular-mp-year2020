import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './auth.reducer';

export const authSelector = createFeatureSelector<AuthState>(authFeatureKey);
export const selectUser = createSelector(authSelector, (state) => state.user);
