import { Store } from '@ngrx/store';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, } from '@angular/core';
import { Course, ICourse } from 'app/courses/course.model';
import { Observable, Subscription } from 'rxjs';
import { CoursesState } from 'app/courses/courses-home/store/courses.reducer';
import { deleteCourse, fetchCourses } from 'app/courses/courses-home/store/courses.actions';
import {
  selectCourses,
  selectError,
  selectIsChanged,
  selectIsLoading,
  selectSearchTerm
} from 'app/courses/courses-home/store/courses.selectors';

@Component({
  selector: 'mp-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: [ './course-list.component.scss' ],
})
export class CourseListComponent implements OnInit, OnDestroy,
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  private subscription = new Subscription();

  private COURSES_PER_PAGE = 5;
  private page = 0;
  private count = this.COURSES_PER_PAGE;
  private searchTerm = '';

  isLoading$: Observable<boolean> = this.store.select(selectIsLoading); // can be removed
  error$: Observable<string | null> = this.store.select(selectError); // can be removed

  public courses: ICourse[] = [];

  constructor(private store: Store<CoursesState>) {
  }

  ngOnInit(): void {
    const subTerm = this.store.select(selectSearchTerm)
      .subscribe((searchTerm) => {
        this.count = this.COURSES_PER_PAGE;
        this.searchTerm = searchTerm;
        this.fetchCourses();
      });

    const subChanged = this.store.select(selectIsChanged)
      .subscribe((isChanged) => {
        if (isChanged) {
          this.fetchCourses();
        }
      });

    const subCourses = this.store.select(selectCourses)
      .subscribe((courses) => {
        this.courses = courses;
      });

    this.subscription
      .add(subTerm)
      .add(subChanged)
      .add(subCourses);

    this.fetchCourses();
  }

  onCourseDelete(course: Course): void {
    if (confirm(`Are you sure you want to delete "${course.name}"?`)) {
      this.store.dispatch(deleteCourse({ payload: course.id }));
    }
  }

  onLoadMoreClick(): void {
    this.count += this.COURSES_PER_PAGE;
    this.fetchCourses();
  }

  trackByCourses(index: number, course: Course): string {
    return course.id;
  }

  private fetchCourses(): void {
    const params: any = {
      start: this.page,
      count: this.count,
    };

    if (this.searchTerm) {
      params.term = this.searchTerm;
    }

    this.store.dispatch(fetchCourses({ payload: params }));
  }

  ngAfterContentInit(): void {
    // console.log('ngAfterContentInit');
  }

  ngAfterContentChecked(): void {
    // console.log('ngAfterContentChecked');
  }

  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit');
  }

  ngAfterViewChecked(): void {
    // console.log('ngAfterViewChecked');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
