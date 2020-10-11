import { Component, OnInit } from '@angular/core';
import { Course } from 'app/courses/course.model';

@Component({
  selector: 'mp-courses-home',
  templateUrl: './courses-home.component.html',
  styleUrls: ['./courses-home.component.scss']
})
export class CoursesHomeComponent implements OnInit {
  course: Course[];

  constructor() {
  }

  ngOnInit(): void {
  }

}
