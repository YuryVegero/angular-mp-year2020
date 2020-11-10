import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared';
import {
  CoursesHomeComponent,
  CourseListComponent,
  CourseItemComponent,
  AddCourseComponent,
  SearchCourseComponent,
  LoadMoreComponent,
} from './courses-home';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseService } from './course.service';

@NgModule({
  declarations: [
    CoursesHomeComponent,
    CourseListComponent,
    CourseItemComponent,
    AddCourseComponent,
    SearchCourseComponent,
    LoadMoreComponent,
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
