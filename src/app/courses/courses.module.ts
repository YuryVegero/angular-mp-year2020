import { ErrorHandler, NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'app/shared';
import { CourseItemComponent, CourseListComponent, CoursesHomeComponent, SearchCourseComponent, } from './courses-home';
import { CourseEditComponent } from './course-edit';
import { CoursesRoutingModule } from './courses-routing.module';
import { CourseService } from './course.service';
import { CourseDetailComponent } from './course-detail';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiPrefixInterceptor } from 'app/core/interceptors/api-prefix.interceptor';
import { TokenInterceptor } from 'app/auth/token.interceptor';
import { HttpErrorHandlerInterceptor } from 'app/core/interceptors/http-error-handler.interceptor';
import { GlobalErrorHandlerService } from 'app/core/services/global-error-handler.service';
import { LoadingInterceptor } from 'app/core/interceptors/loading.interceptor';
import { CoursesEffects } from './courses-home/store/courses.effects';
import { CourseEffects } from './course-edit/store/course.effects';
import { coursesFeatureKey, coursesReducer } from './courses-home/store/courses.reducer';
import { courseFeatureKey, courseReducer } from './course-edit/store/course.reducer';
import { AuthorsControlComponent } from './course-edit/authors-control';
import { AuthorService } from 'app/courses/author.service';
import { MissingTranslationHandler, TranslateCompiler, TranslateLoader, TranslateModule, TranslateParser } from '@ngx-translate/core';


@NgModule({
  declarations: [
    CourseEditComponent,
    CourseDetailComponent,
    CoursesHomeComponent,
    CourseListComponent,
    CourseItemComponent,
    SearchCourseComponent,
    AuthorsControlComponent,
  ],
  imports: [
    CoursesRoutingModule,
    SharedModule,
    StoreModule.forFeature(coursesFeatureKey, coursesReducer),
    StoreModule.forFeature(courseFeatureKey, courseReducer),
    EffectsModule.forFeature([ CoursesEffects, CourseEffects ]),
    TranslateModule.forChild(),
  ],
  providers: [
    CourseService,
    AuthorService,
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
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
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
