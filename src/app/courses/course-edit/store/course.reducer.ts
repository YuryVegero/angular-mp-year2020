import { createReducer, on } from '@ngrx/store';
import { setCourse } from './course.actions';
import { ICourse } from 'app/courses/course.model';

export const courseFeatureKey = 'course';

export interface CourseState {
  course: ICourse;
}

export const initialState: CourseState = {
  course: null,
};

export const courseReducer = createReducer(
  initialState,
  on(setCourse, (state, { payload }) => ({
    ...state,
    course: { ...payload },
  })),
);
