import * as fromRouter from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export interface RouterState {
  router: fromRouter.RouterReducerState<any>;
}

const routerSelector = createFeatureSelector<RouterState, fromRouter.RouterReducerState<any>>('router');

export const selectRouteParam = fromRouter.getSelectors(routerSelector).selectRouteParam;
