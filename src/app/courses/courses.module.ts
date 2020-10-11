import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CoursesHomeComponent } from 'app/courses/courses-home/courses-home.component';
import { CourseListComponent } from './courses-home/course-list';
import { CourseItemComponent } from './courses-home/course-list/course-item';
import { EditCourseComponent } from './courses-home/course-list/course-item/edit-course';
import { DeleteCourseComponent } from './courses-home/course-list/course-item/delete-course';
import { AddCourseComponent } from './courses-home/add-course';
import { SearchCourseComponent } from './courses-home/search-course';
import { LoadMoreComponent } from './courses-home/load-more';

@NgModule({
  declarations: [
    CoursesHomeComponent,
    CourseListComponent,
    CourseItemComponent,
    AddCourseComponent,
    SearchCourseComponent,
    LoadMoreComponent,
    EditCourseComponent,
    DeleteCourseComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    CoursesHomeComponent,
  ],
})
export class CoursesModule {
}
