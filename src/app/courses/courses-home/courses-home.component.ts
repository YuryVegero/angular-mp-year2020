import { Component, OnInit } from '@angular/core';
import { Course } from 'app/courses/course.model';
import { courses } from 'app/courses/courses-home/course.mock';

@Component({
  selector: 'mp-courses-home',
  templateUrl: './courses-home.component.html',
  styleUrls: ['./courses-home.component.scss']
})
export class CoursesHomeComponent implements OnInit {
  courses: Course[] = [];

  ngOnInit(): void {
    this.courses = this.getCourses();
  }

  getCourses(): Course[] {
    return courses;
  }

  onCourseDelete(course: Course): void {
    console.log(`Delete ${course.id}`);
  }

  onCourseEdit(course: Course): void {
    console.log(`Edit ${course.id}`);
  }
}
