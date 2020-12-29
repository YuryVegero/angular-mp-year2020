import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { CourseService } from 'app/courses/course.service';
import { ADD_COURSE, EDIT_COURSE, FETCH_AUTHORS, FETCH_COURSE, setAuthors, setCourse } from './course.actions';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AuthorService } from 'app/courses/author.service';

@Injectable()
export class CourseEffects {

  constructor(
    private actions$: Actions,
    private courseService: CourseService,
    private authorService: AuthorService,
    private router: Router,
  ) {
  }

  fetchCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FETCH_COURSE),
      switchMap(({ payload }) => this.courseService.get(payload)
        .pipe(
          map(course => setCourse({ payload: course })),
          catchError(() => {
            this.router.navigateByUrl('/not-found');
            return EMPTY;
          }),
        )),
    ),
  );

  addCourse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(ADD_COURSE),
        mergeMap(({ payload }) => this.courseService.add(payload)
          .pipe(tap(() => this.goToCourses()))),
      ),
    { dispatch: false },
  );

  editCourse$ = createEffect(() =>
      this.actions$.pipe(
        ofType(EDIT_COURSE),
        mergeMap(({ payload }) => this.courseService.update(payload)
          .pipe(tap(() => this.goToCourses()))),
      ),
    { dispatch: false },
  );

  fetchAuthors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FETCH_AUTHORS),
      switchMap(({ payload }) => this.authorService.getAll(payload)
        .pipe(
          map(authors => setAuthors({ payload: authors })),
        )),
    ),
  );

  private goToCourses(): void {
    this.router.navigateByUrl('/courses');
  }
}
