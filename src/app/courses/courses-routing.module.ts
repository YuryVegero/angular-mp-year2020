import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesHomeComponent } from './courses-home/courses-home.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}