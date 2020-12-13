import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course, ICourse } from 'app/courses/course.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCourse, selectCourseId } from './store/course.selectors';
import { AppState } from 'app/store/app.reducer';
import { addCourse, editCourse, fetchCourse } from 'app/courses/course-edit/store/course.actions';
import { distinctUntilChanged, filter } from 'rxjs/operators';

@Component({
  selector: 'mp-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: [ './course-edit.component.scss' ],
})
export class CourseEditComponent implements OnInit, OnDestroy {
  private routerSub: Subscription;
  private courseSub: Subscription;

  editMode = false;
  breadcrumbLabel: string;
  course = new Course({
    id: '',
    name: '',
    length: 0,
    description: '',
    authors: [],
    date: null,
  });

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  ngOnInit(): void {
    this.routerSub = this.store.select(selectCourseId)
      .subscribe((id) => {
        this.course.id = id;
        this.editMode = !!id;

        if (this.editMode) {
          this.store.dispatch(fetchCourse({ payload: this.course.id }));
          this.courseSub = this.store.select(selectCourse)
            .pipe(
              filter(course => !!course),
              distinctUntilChanged(),
            )
            .subscribe((course: ICourse) => {
              this.course = { ...course };
              this.breadcrumbLabel = `Edit "${this.course.name}"`;
              this.initForm(this.course);
            });
        }
      });
  }

  onSaveClick(): void {
    const actionFn = this.editMode ? editCourse : addCourse;
    this.store.dispatch(actionFn({ payload: { ...this.course } }));
  }

  onCancelClick(): void {
    this.router.navigateByUrl('/courses');
  }

  private initForm(course: Course): void {
    // init form
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
    if (this.courseSub) {
      this.courseSub.unsubscribe();
    }
  }
}
