import { createReducer, on } from '@ngrx/store';
import { setAuthors, setAuthorTerm, setCourse } from './course.actions';
import { ICourse } from 'app/courses/course.model';
import { IAuthor } from 'app/courses/author.model';

export const courseFeatureKey = 'course';

export interface CourseState {
  course: ICourse;
  authorTerm: string;
  authors: IAuthor[];
}

export const initialState: CourseState = {
  course: null,
  authorTerm: '',
  authors: [],
};

export const courseReducer = createReducer(
  initialState,
  on(setCourse, (state, { payload }) => ({ ...state, course: { ...payload } })),
  on(setAuthorTerm, (state, { payload }) => ({ ...state, authorTerm: payload })),
  on(setAuthors, (state, { payload }) => ({ ...state, authors: payload })),
);
