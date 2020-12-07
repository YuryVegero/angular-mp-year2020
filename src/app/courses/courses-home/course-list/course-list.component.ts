import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Course, ICourse } from 'app/courses/course.model';
import { CourseService } from 'app/courses/course.service';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'mp-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: [ './course-list.component.scss' ],
})
export class CourseListComponent implements OnInit, OnDestroy,
  OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  private deleteSub: Subscription;
  private fetchSub: Subscription;

  private COURSES_PER_PAGE = 5;
  private page = 0;
  private count = this.COURSES_PER_PAGE;

  @Input() searchTerm = '';
  public courses: ICourse[] = [];

  constructor(private courseService: CourseService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.searchTerm.firstChange) {
      this.count = this.COURSES_PER_PAGE;
      this.fetchCourses();
    }
  }

  ngOnInit(): void {
    this.fetchCourses();
  }

  onCourseDelete(course: Course): void {
    if (confirm(`Are you sure you want to delete "${course.name}"?`)) {
      this.deleteSub = this.courseService.delete(course.id)
        .subscribe(() => {
          this.fetchCourses();
        });
    }
  }

  private fetchCourses(options = {}): void {
    const params: any = {
      start: this.page,
      count: this.count,
      ...options,
    };

    if (this.searchTerm) {
      params.term = this.searchTerm;
    }

    this.fetchSub = this.courseService.getAll(params)
      .subscribe((courses) => {
        this.courses = courses;
      });
  }

  onLoadMoreClick(): void {
    this.count += this.COURSES_PER_PAGE;
    this.fetchCourses();
  }

  trackByCourses(index: number, course: Course): string {
    return course.id;
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
    this.deleteSub?.unsubscribe();
    this.fetchSub?.unsubscribe();
  }
}
