import { Component } from '@angular/core';

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
