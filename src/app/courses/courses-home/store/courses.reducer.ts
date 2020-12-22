import { createReducer, on } from '@ngrx/store';
import { coursesChanged, fetchCourses, setCourses, setSearchTerm } from './courses.actions';
import { ICourse } from 'app/courses/course.model';

export const coursesFeatureKey = 'courses';

export interface CoursesState {
  courses: ICourse[];
  searchTerm: string;
  error: string | null;
  isLoading: boolean;
  isChanged: boolean;
}

export const initialState: CoursesState = {
  courses: [],
  searchTerm: '',
  error: null,
  isLoading: true,
  isChanged: false,
};

export const coursesReducer = createReducer(
  initialState,
  on(fetchCourses, (state) => ({ ...state, isLoading: true })),
  on(setCourses, (state, { payload }) => ({
    ...state,
    courses: [ ...payload ],
    isLoading: false,
    isChanged: false,
  })),
  on(coursesChanged, (state) => ({ ...state, isChanged: true })),
  on(setSearchTerm, (state, { payload }) => ({ ...state, searchTerm: payload })),
);
