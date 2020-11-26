import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, routes as authRoutes } from './auth';
import { NotFoundComponent } from './shared/components';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: '', children: authRoutes },
  {
    path: 'courses',
    canLoad: [ AuthGuard ],
    canActivate: [ AuthGuard ],
    canActivateChild: [AuthGuard],
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}
