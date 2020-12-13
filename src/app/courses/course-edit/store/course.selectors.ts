import { createFeatureSelector, createSelector } from '@ngrx/store';
import { courseFeatureKey, CourseState } from './course.reducer';
import { selectRouteParam } from 'app/store/app.selectors';

const courseSelector = createFeatureSelector<CourseState>(courseFeatureKey);

export const selectCourse = createSelector(courseSelector, (state) => state.course);
export const selectCourseId = selectRouteParam('id');
