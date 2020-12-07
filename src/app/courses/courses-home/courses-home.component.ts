import { Component } from '@angular/core';
import { CourseService } from 'app/courses/course.service';

@Component({
  selector: 'mp-courses-home',
  templateUrl: './courses-home.component.html',
  styleUrls: [ './courses-home.component.scss' ],
})
export class CoursesHomeComponent {
  searchTerm = '';

  onCourseSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
  }
}
