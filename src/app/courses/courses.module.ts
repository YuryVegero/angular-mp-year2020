import { ErrorHandler, NgModule } from '@angular/core';
import { SharedModule } from 'app/shared';
import {
  CoursesHomeComponent,
  CourseListComponent,
  CourseItemComponent,
  SearchCourseComponent,
} from './courses-home';
import { CourseEditComponent } from './course-edit';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseService } from './course.service';
import { CourseDetailComponent } from './course-detail';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from 'app/core/interceptors/api-prefix.interceptor';
import { TokenInterceptor } from 'app/auth/token.interceptor';
import { HttpErrorHandlerInterceptor } from 'app/core/interceptors/http-error-handler.interceptor';
import { GlobalErrorHandlerService } from 'app/core/services/global-error-handler.service';

@NgModule({
  declarations: [
    CourseEditComponent,
    CourseDetailComponent,
    CoursesHomeComponent,
    CourseListComponent,
    CourseItemComponent,
    SearchCourseComponent,
  ],
  imports: [
    CoursesRoutingModule,
    SharedModule,
  ],
  providers: [
    CourseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },
  ],
})
export class CoursesModule {
}
