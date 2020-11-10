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
  id: string;
  title = '';
  description = '';
  authors = '';
  duration: number;
  date: Date;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }: Params) => {
      this.id = id;
      this.editMode = id != null;
      this.initForm();
    });
  }

  onSaveClick(): void {
    const course = new Course({
      id: this.id,
      title: this.title,
      description: this.description,
      duration: this.duration,
      createdAt: this.date,
    });

    if (this.editMode) {
      this.courseService.update(this.id, course);
    } else {
      this.courseService.add(course);
    }
    this.onCancelClick();
  }

  onCancelClick(): void {
    this.router.navigateByUrl('/');
  }

  private initForm(): void {
    if (this.editMode) {
      const course = this.courseService.get(this.id);
      this.title = course.title;
      this.description = course.description;
      this.authors = '';
      this.duration = course.duration;
      this.date = course.createdAt;
    }
  }
}
