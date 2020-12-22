import { createAction, props } from '@ngrx/store';
import { ICourse } from 'app/courses/course.model';

export const FETCH_COURSE = '[Course Edit] Fetch Course';
export const fetchCourse = createAction(FETCH_COURSE, props<{ payload: any }>());

export const SET_COURSE = '[Course Edit] Set Course';
export const setCourse = createAction(SET_COURSE, props<{ payload: ICourse }>());

export const ADD_COURSE = '[Course Edit] Add Course';
export const addCourse = createAction(ADD_COURSE, props<{ payload: ICourse }>());

export const EDIT_COURSE = '[Course Edit] Edit Course';
export const editCourse = createAction(EDIT_COURSE, props<{ payload: ICourse }>());
