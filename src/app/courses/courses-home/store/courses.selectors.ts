import { createFeatureSelector, createSelector } from '@ngrx/store';
import { coursesFeatureKey, CoursesState } from './courses.reducer';

const coursesSelector = createFeatureSelector<CoursesState>(coursesFeatureKey);

export const selectCourses = createSelector(coursesSelector, (state) => state.courses);
export const selectError = createSelector(coursesSelector, (state) => state.error);
export const selectIsLoading = createSelector(coursesSelector, (state) => state.isLoading);
export const selectIsChanged = createSelector(coursesSelector, (state) => state.isChanged);
export const selectSearchTerm = createSelector(coursesSelector, (state) => state.searchTerm);
