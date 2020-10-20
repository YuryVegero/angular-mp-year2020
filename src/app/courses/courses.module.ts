import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CoursesHomeComponent } from 'app/courses/courses-home/courses-home.component';
import { CourseListComponent } from './courses-home/course-list';
import { CourseItemComponent } from './courses-home/course-list/course-item';
import { AddCourseComponent } from './courses-home/add-course';
import { SearchCourseComponent } from './courses-home/search-course';
import { LoadMoreComponent } from './courses-home/load-more';
import { CoursesRoutingModule } from './courses-routing.module';

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
})
export class CoursesModule {
}
