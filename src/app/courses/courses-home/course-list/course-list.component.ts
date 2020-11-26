import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Course } from 'app/courses/course.model';
import { FilterByPipe } from 'app/shared/pipes';
import { CourseService } from 'app/courses/course.service';

@Component({
  selector: 'mp-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: [ './course-list.component.scss' ],
  providers: [ FilterByPipe ],
})
export class CourseListComponent implements OnInit,
  OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  @Input() searchTerm = '';

  private courses: Course[] = [];
  public filteredCourses: Course[] = [];

  constructor(
    private filterByPipe: FilterByPipe,
    private courseService: CourseService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.searchTerm.firstChange) {
      this.filterCourses();
    }
  }

  ngOnInit(): void {
    this.courses = this.courseService.getAll();
    this.filterCourses();

    this.courseService.coursesChanged
      .subscribe((courses: Course[]) => {
        this.courses = courses;
        this.filterCourses();
      });
  }

  onCourseDelete(course: Course): void {
    if (confirm(`Are you sure you want to delete "${course.title}"?`)) {
      this.courseService.delete(course.id);
    }
  }

  onLoadMoreClick(): void {
    console.log('Load more clicked');
  }

  hasCourses(): boolean {
    return this.filteredCourses && this.filteredCourses.length > 0;
  }

  trackByCourses(index: number, course: Course): string {
    return course.id;
  }

  private filterCourses(): void {
    this.filteredCourses = this.filterByPipe.transform(this.courses, 'title', this.searchTerm);
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
}
