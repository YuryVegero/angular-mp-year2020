import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared';
import {
  CoursesHomeComponent,
  CourseListComponent,
  CourseItemComponent,
  AddCourseComponent,
  SearchCourseComponent,
} from './courses-home';
import { CourseEditComponent } from './course-edit';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseService } from './course.service';

@NgModule({
  declarations: [
    CourseEditComponent,
    CoursesHomeComponent,
    CourseListComponent,
    CourseItemComponent,
    AddCourseComponent,
    SearchCourseComponent,
  ],
  imports: [
    CoursesRoutingModule,
    SharedModule,
  ],
  exports: [
    CoursesHomeComponent,
  ],
  providers: [ CourseService ]
})
export class CoursesModule {
}
