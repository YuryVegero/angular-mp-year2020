import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CourseService } from 'app/courses/course.service';
import { Course } from 'app/courses/course.model';

@Component({
  selector: 'mp-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: [ './course-edit.component.scss' ],
})
export class CourseEditComponent implements OnInit {
  editMode = false;
  course = new Course({
    id: '',
    title: '',
    duration: 0,
    description: '',
    authors: '',
    createdAt: null,
  });

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }: Params) => {
      this.course.id = id;
      this.editMode = !!id;
      this.initForm();
    });
  }

  onSaveClick(): void {
    if (this.editMode) {
      this.courseService.update(this.course);
    } else {
      this.courseService.add(this.course);
    }
    this.onCancelClick();
  }

  onCancelClick(): void {
    this.router.navigateByUrl('/');
  }

  private initForm(): void {
    if (this.editMode) {
      this.course = this.courseService.get(this.course.id);
    }
  }
}
