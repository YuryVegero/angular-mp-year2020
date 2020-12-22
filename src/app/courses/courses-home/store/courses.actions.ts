import { createAction, props } from '@ngrx/store';
import { ICourse } from 'app/courses/course.model';

export const FETCH_COURSES = '[Course List] Fetch Courses';
export const fetchCourses = createAction(FETCH_COURSES, props<{ payload: any }>());

export const SET_COURSES = '[Course List] Set Courses';
export const setCourses = createAction(SET_COURSES, props<{ payload: ICourse[] }>());

export const DELETE_COURSE = '[Course List] Delete Course';
export const deleteCourse = createAction(DELETE_COURSE, props<{ payload: string }>());

export const COURSES_CHANGED = '[Course List] Courses changed';
export const coursesChanged = createAction(COURSES_CHANGED);

export const SET_SEARCH_TERM = '[Course Search] Set Search Term';
export const setSearchTerm = createAction(SET_SEARCH_TERM, props<{ payload: string }>());
