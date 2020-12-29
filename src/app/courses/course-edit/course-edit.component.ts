import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Course, ICourse } from 'app/courses/course.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthors, selectAuthorTerm, selectCourse, selectCourseId } from './store/course.selectors';
import { AppState } from 'app/store/app.reducer';
import { addCourse, editCourse, fetchAuthors, fetchCourse } from 'app/courses/course-edit/store/course.actions';
import { distinctUntilChanged, filter } from 'rxjs/operators';
import { createRangeValidator } from 'app/shared/utils/validators/range-validator';
import { validateDate } from 'app/shared/utils/validators/date-validator';
import { IAuthor } from 'app/courses/author.model';

@Component({
  selector: 'mp-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: [ './course-edit.component.scss' ],
})
export class CourseEditComponent implements OnInit, OnDestroy {
  private courseIdSub: Subscription;
  private courseSub: Subscription;
  private authorTermSub: Subscription;

  authors$: Observable<IAuthor[]>;

  id: string;
  breadcrumbLabel: string;
  editMode = false;
  courseForm = this.fb.group({
    name: [ '', [ Validators.required, Validators.maxLength(50) ] ],
    description: [ '', [ Validators.required, Validators.maxLength(500) ] ],
    length: [ 1, [ Validators.required, createRangeValidator(1, 10000) ] ],
    date: [ '', [ validateDate ] ],
    topRated: [ false ],
    authors: [ [], [ Validators.required ] ], // , validateAuthors
  });

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.courseIdSub = this.store.select(selectCourseId)
      .subscribe((id) => {
        this.id = id;
        this.editMode = !!id;

        if (this.editMode) {
          this.store.dispatch(fetchCourse({ payload: this.id }));
          this.courseSub = this.store.select(selectCourse)
            .pipe(
              filter(course => !!course),
              distinctUntilChanged(),
            )
            .subscribe((course: ICourse) => {
              this.breadcrumbLabel = `Edit "${course.name}"`;
              this.initForm(course);
            });
        }
      });

    this.authors$ = this.store.select(selectAuthors);

    this.authorTermSub = this.store.select(selectAuthorTerm)
      .subscribe((term) => {
        this.store.dispatch(fetchAuthors({ payload: term }));
      });
  }

  onSubmit(): void {
    const actionFn = this.editMode ? editCourse : addCourse;
    this.store.dispatch(actionFn({ payload: { ...this.courseForm.value, id: this.id } }));
  }

  onCancelClick(): void {
    this.router.navigateByUrl('/courses');
  }

  private initForm(course: Course): void {
    this.courseForm.patchValue({
      name: course.name,
      description: course.description,
      length: course.length,
      date: course.date,
      topRated: course.isTopRated,
      authors: course.authors,
    });
  }

  get lengthControl(): FormControl {
    return this.courseForm.get('length') as FormControl;
  }

  get dateControl(): FormControl {
    return this.courseForm.get('date') as FormControl;
  }

  get authorsControl(): FormControl {
    return this.courseForm.get('authors') as FormControl;
  }

  isValidControl(control: FormControl): boolean {
    const { invalid, touched, errors } = control;
    return !!invalid && !!touched && !!errors;
  }

  ngOnDestroy(): void {
    this.courseIdSub.unsubscribe();
    this.authorTermSub.unsubscribe();
    if (this.courseSub) {
      this.courseSub.unsubscribe();
    }
  }
}
