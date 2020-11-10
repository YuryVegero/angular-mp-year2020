import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseEditComponent, CoursesHomeComponent } from './courses';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesHomeComponent },
  { path: 'courses/new', component: CourseEditComponent },
  { path: 'courses/:id/edit', component: CourseEditComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
