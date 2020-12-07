import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CourseService } from 'app/courses/course.service';
import { Course, ICourse } from 'app/courses/course.model';

@Component({
  selector: 'mp-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: [ './course-detail.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailComponent implements OnInit {
  course: Course;
  breadcrumbLabel: string;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private router: Router,
    private changeDetector: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }: Params) => {
      this.courseService.get(id)
        .subscribe(
          (course: ICourse) => {
            this.course = course;
            this.breadcrumbLabel = this.course.name;
            this.changeDetector.markForCheck();
          },
          () => {
            this.router.navigateByUrl('/not-found');
          });
    });
  }
}
