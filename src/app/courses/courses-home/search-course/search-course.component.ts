import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'mp-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent {
  searchTerm: string;

  @Output() courseSearch = new EventEmitter<string>();

  onSearchClick(): void {
    this.courseSearch.emit(this.searchTerm);
  }
}
