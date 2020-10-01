import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesHomeComponent } from './courses/courses-home/courses-home.component';

const routes: Routes = [
  {path: 'courses', component: CoursesHomeComponent},
  {path: '', component: CoursesHomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
