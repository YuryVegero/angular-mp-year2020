import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mp-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.scss']
})
export class SearchCourseComponent implements OnInit {
  searchTerm: string;

  ngOnInit(): void {
  }

  onSearchClick(): void {
    console.log(this.searchTerm);
  }
}
