import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesHomeComponent } from './courses-home';
import { CourseEditComponent } from './course-edit';
import { CourseDetailComponent } from './course-detail';

const routes: Routes = [
  {
    path: '',
    data: {
      breadcrumb: 'shared.breadcrumb.courses',
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
          breadcrumb: 'shared.breadcrumb.new',
        },
      },
      {
        path: ':id/edit',
        component: CourseEditComponent,
        data: {
          breadcrumb: 'shared.breadcrumb.edit',
        },
      },
      {
        path: ':id',
        component: CourseDetailComponent,
        data: {
          breadcrumb: 'shared.breadcrumb.detail',
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
