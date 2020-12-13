import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CourseService } from 'app/courses/course.service';
import { coursesChanged, DELETE_COURSE, FETCH_COURSES, setCourses } from './courses.actions';


@Injectable()
export class CoursesEffects {

  constructor(private actions$: Actions, private courseService: CourseService) {
  }

  fetchCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FETCH_COURSES),
      switchMap(({ payload }) => this.courseService.getAll(payload)
        .pipe(
          map(courses => setCourses({ payload: courses })),
          catchError(() => EMPTY),
        )),
    ),
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DELETE_COURSE),
      mergeMap(({ payload }) => this.courseService.delete(payload)
        .pipe(
          map(() => coursesChanged()),
          catchError(() => EMPTY),
        )),
    ),
  );
}
