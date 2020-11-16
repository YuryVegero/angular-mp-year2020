import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesHomeComponent } from './courses-home';
import { CourseEditComponent } from './course-edit';
import { CourseDetailComponent } from './course-detail';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'Courses',
    },
    children: [
      {
        path: '',
        component: CoursesHomeComponent,
      },
      {
        path: 'new',
        component: CourseEditComponent,
        data: {
          breadcrumb: 'New',
        },
      },
      {
        path: ':id/edit',
        component: CourseEditComponent,
        data: {
          breadcrumb: 'Edit',
        },
      },
      {
        path: ':id',
        component: CourseDetailComponent,
        data: {
          breadcrumb: 'Detail',
        },
      },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class CoursesRoutingModule {
}
