import { Component, OnInit } from '@angular/core';
import { Course } from 'app/courses/course.model';
import { courses } from 'app/courses/courses-home/course.mock';
import { FilterByPipe } from 'app/shared/pipes/filter-by.pipe';

@Component({
  selector: 'mp-courses-home',
  templateUrl: './courses-home.component.html',
  styleUrls: ['./courses-home.component.scss'],
  providers: [FilterByPipe],
})
export class CoursesHomeComponent implements OnInit {
  private courses: Course[] = [];
  private searchTerm = '';

  filteredCourses: Course[] = [];

  constructor(private filterByPipe: FilterByPipe) {
  }

  ngOnInit(): void {
    this.courses = this.getCourses();
    this.filterCourses();
  }

  hasCourses(): boolean {
    return this.filteredCourses && this.filteredCourses.length > 0;
  }

  onCourseSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterCourses();
  }

  onCourseDelete(course: Course): void {
    console.log(`Delete ${course.id}`);
  }

  onCourseEdit(course: Course): void {
    console.log(`Edit ${course.id}`);
  }

  private getCourses(): Course[] {
    return courses;
  }

  private filterCourses(): void {
    this.filteredCourses = this.filterByPipe.transform(this.courses, 'title', this.searchTerm);
  }
}
