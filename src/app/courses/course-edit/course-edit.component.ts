import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CourseService } from 'app/courses/course.service';
import { Course, ICourse } from 'app/courses/course.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mp-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: [ './course-edit.component.scss' ],
})
export class CourseEditComponent implements OnInit, OnDestroy {
  private routerSub: Subscription;
  private courseSub: Subscription;

  editMode = false;
  breadcrumbLabel: string;
  course = new Course({
    id: '',
    name: '',
    length: 0,
    description: '',
    authors: [],
    date: null,
  });

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
  ) {
    this.onCancelClick = this.onCancelClick.bind(this);
  }

  ngOnInit(): void {
    this.routerSub = this.route.params.subscribe(({ id }: Params) => {
      this.course.id = id;
      this.editMode = !!id;

      if (this.editMode) {
        this.courseSub = this.courseService.get(this.course.id)
          .subscribe(
            (course: ICourse) => {
              this.course = course;
              this.breadcrumbLabel = `Edit "${this.course.name}"`;
              this.initForm(this.course);
            },
            () => {
              this.router.navigateByUrl('/not-found');
            });
      }
    });
  }

  onSaveClick(): void {
    if (this.editMode) {
      this.courseService.update(this.course).subscribe(this.onCancelClick);
    } else {
      this.courseService.add(this.course).subscribe(this.onCancelClick);
    }
  }

  onCancelClick(): void {
    this.router.navigateByUrl('/courses');
  }

  private initForm(course: Course): void {
    // init form
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
    if (this.courseSub) {
      this.courseSub.unsubscribe();
    }
  }
}
