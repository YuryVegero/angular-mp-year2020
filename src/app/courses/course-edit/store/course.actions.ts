import { createAction, props } from '@ngrx/store';
import { ICourse } from 'app/courses/course.model';
import { IAuthor } from 'app/courses/author.model';

export const FETCH_COURSE = '[Course Edit] Fetch Course';
export const fetchCourse = createAction(FETCH_COURSE, props<{ payload: any }>());

export const SET_COURSE = '[Course Edit] Set Course';
export const setCourse = createAction(SET_COURSE, props<{ payload: ICourse }>());

export const ADD_COURSE = '[Course Edit] Add Course';
export const addCourse = createAction(ADD_COURSE, props<{ payload: ICourse }>());

export const EDIT_COURSE = '[Course Edit] Edit Course';
export const editCourse = createAction(EDIT_COURSE, props<{ payload: ICourse }>());

export const SET_AUTHOR_TERM = '[Authors Control] Set Author Term';
export const setAuthorTerm = createAction(SET_AUTHOR_TERM, props<{ payload: string }>());

export const FETCH_AUTHORS = '[Authors Control] Fetch Authors';
export const fetchAuthors = createAction(FETCH_AUTHORS, props<{ payload: string }>());

export const SET_AUTHORS = '[Authors Control] Set Authors';
export const setAuthors = createAction(SET_AUTHORS, props<{ payload: IAuthor[] }>());
