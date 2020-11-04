import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursesHomeComponent } from './courses';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: 'courses', component: CoursesHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
