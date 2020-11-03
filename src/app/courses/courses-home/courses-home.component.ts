import { Component, OnInit } from '@angular/core';
import { Course } from 'app/courses/course.model';
import { FilterByPipe } from 'app/shared/pipes/filter-by.pipe';
import { CourseService } from 'app/courses/course.service';

@Component({
  selector: 'mp-courses-home',
  templateUrl: './courses-home.component.html',
  styleUrls: [ './courses-home.component.scss' ],
  providers: [ FilterByPipe ],
})
export class CoursesHomeComponent implements OnInit {
  private courses: Course[] = [];
  private searchTerm = '';

  filteredCourses: Course[] = [];

  constructor(
    private filterByPipe: FilterByPipe,
    private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.courses = this.courseService.getAll();
    this.filteredCourses = [ ...this.courses ];

    this.courseService.coursesChanged
      .subscribe((courses: Course[]) => {
        this.courses = courses;
        this.filterCourses();
      });
  }

  hasCourses(): boolean {
    return this.filteredCourses && this.filteredCourses.length > 0;
  }

  onCourseSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterCourses();
  }

  onCourseDelete(course: Course): void {
    if (confirm(`Are you sure you want to delete "${course.title}"?`)) {
      this.courseService.delete(course.id);
    }
  }

  onCourseEdit(course: Course): void {
    console.log(`Edit ${course.id}`);
  }

  private filterCourses(): void {
    this.filteredCourses = this.filterByPipe.transform(this.courses, 'title', this.searchTerm);
  }
}
