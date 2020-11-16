import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CourseService } from 'app/courses/course.service';
import { Course } from 'app/courses/course.model';

@Component({
  selector: 'mp-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: [ './course-detail.component.scss' ],
})
export class CourseDetailComponent implements OnInit {
  course: Course;
  breadcrumbLabel: string;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }: Params) => {
      const course = this.courseService.get(id);
      if (!course) {
        this.router.navigateByUrl('/not-found');
        return;
      }

      this.course = course;
      this.breadcrumbLabel = this.course.title;
    });
  }
}
