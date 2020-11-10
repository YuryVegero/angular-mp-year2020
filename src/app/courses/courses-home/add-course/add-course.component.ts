import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mp-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: [ './add-course.component.scss' ]
})
export class AddCourseComponent {

  constructor(private router: Router) {
  }

  onClick(): void {
    this.router.navigateByUrl('courses/new');
  }
}
