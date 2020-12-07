import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, } from '@angular/core';
import { Course, ICourse } from 'app/courses/course.model';
import { CourseService } from 'app/courses/course.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { mergeMap, switchMap } from 'rxjs/operators';
import { CourseSearchTermService } from 'app/courses/course-search-term.service';

@Component({
  selector: 'mp-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: [ './course-list.component.scss' ],
})
export class CourseListComponent implements OnInit, OnDestroy,
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  private subscription = new Subscription();
  private fetchSubject$ = new Subject();
  private deleteSubject$ = new Subject<string>();

  private COURSES_PER_PAGE = 5;
  private page = 0;
  private count = this.COURSES_PER_PAGE;
  private searchTerm = '';

  public courses: ICourse[] = [];

  constructor(
    private courseService: CourseService,
    private courseTermService: CourseSearchTermService,
  ) {
  }

  ngOnInit(): void {
    const subTerm = this.courseTermService.termChanged$
      .subscribe((searchTerm) => {
        this.count = this.COURSES_PER_PAGE;
        this.searchTerm = searchTerm;
        this.fetchSubject$.next();
      });

    const subDelete = this.deleteSubject$
      .pipe(mergeMap((id) => this.courseService.delete(id)))
      .subscribe(() => {
        this.fetchSubject$.next();
      });

    const subFetch = this.fetchSubject$
      .pipe(switchMap(() => this.fetchCourses()))
      .subscribe((courses) => {
        this.courses = courses;
      });

    this.subscription
      .add(subTerm)
      .add(subDelete)
      .add(subFetch);

    this.fetchSubject$.next();
  }

  onCourseDelete(course: Course): void {
    if (confirm(`Are you sure you want to delete "${course.name}"?`)) {
      this.deleteSubject$.next(course.id);
    }
  }

  onLoadMoreClick(): void {
    this.count += this.COURSES_PER_PAGE;
    this.fetchSubject$.next();
  }

  trackByCourses(index: number, course: Course): string {
    return course.id;
  }

  private fetchCourses(options = {}): Observable<ICourse[]> {
    const params: any = {
      start: this.page,
      count: this.count,
      ...options,
    };

    if (this.searchTerm) {
      params.term = this.searchTerm;
    }

    return this.courseService.getAll(params);
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
