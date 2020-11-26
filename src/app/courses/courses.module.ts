import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared';
import {
  CoursesHomeComponent,
  CourseListComponent,
  CourseItemComponent,
  SearchCourseComponent,
} from './courses-home';
import { CourseEditComponent } from './course-edit';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseService } from './course.service';
import { CourseDetailComponent } from './course-detail';

@NgModule({
  declarations: [
    CourseEditComponent,
    CourseDetailComponent,
    CoursesHomeComponent,
    CourseListComponent,
    CourseItemComponent,
    SearchCourseComponent,
  ],
  imports: [
    CoursesRoutingModule,
    SharedModule,
  ],
  providers: [ CourseService ],
})
export class CoursesModule {
}
